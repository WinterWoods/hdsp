using Helpers;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public static class SessionManager
    {
        private static List<SessionModel> list;
        private static object lockObj = new object();
        public static int SessionOutTimer = 50;
        private static TimerTaskService timer;
        static SessionManager()
        {
            list = new List<SessionModel>();
            timer = TimerTaskService.CreateTimerTaskService(new TimerInfo { TimerType = TimerType.LoopStop, Hour = 1}, () =>
            {
                lock (lockObj)
                {
                    list.RemoveAll(r => (DateTime.Now - r.LastOprTime) > new TimeSpan(0, SessionOutTimer, 0));
                }
            });
            timer.Start();
        }
        public static string NewUser(this HubCallerContext context)
        {
            lock (lockObj)
            {
                SessionModel model = new SessionModel();
                model.TimeOut = false;
                model.Obj = null;
                model.Ticket = context.ConnectionId;
                model.LastOprTime = DateTime.Now;
                model.sessionData = new Hashtable();
                lock (lockObj)
                {
                    list.Add(model);
                }
                return model.Ticket;
            }
        }
        public static void Login<T>(this HubCallerContext context, T user)
        {
            var tmp = list.Find(a => a.Ticket == context.ConnectionId);
            if (tmp != null)
            {
                lock (lockObj)
                {
                    tmp.LastOprTime = DateTime.Now;
                    tmp.TimeOut = false;
                    tmp.Obj = user;
                }

            }
            else
            {
                SessionModel model = new SessionModel();
                model.TimeOut = false;
                model.Obj = user;
                model.Ticket = context.ConnectionId;
                model.LastOprTime = DateTime.Now;
                lock (lockObj)
                {
                    list.Add(model);
                }
            }
        }
        public static void Logout(this HubCallerContext context)
        {
            var tmp = list.Find(a => a.Ticket == context.ConnectionId);
            if (tmp != null)
            {
                lock (lockObj)
                {
                    list.Remove(tmp);
                }
            }
        }
        public static bool IsLogin(this HubCallerContext context)
        {
            var tmp = list.Find(a => a.Ticket == context.ConnectionId);
            if (tmp != null)
            {
                if (!tmp.TimeOut)
                {
                    lock (lockObj)
                    {
                        tmp.LastOprTime = DateTime.Now;
                    }
                    return true;
                }
            }
            return false;
        }
        public static T GetUser<T>(this HubCallerContext context)
        {
            var tmp = list.Find(a => a.Ticket == context.ConnectionId);
            if (tmp != null)
            {
                return (T)tmp.Obj;
            }
            else
            {
                return default(T);
            }
        }
        public static void Set(this HubCallerContext context, string key, object value)
        {
            var tmp = list.Find(a => a.Ticket == context.ConnectionId);
            if (tmp != null)
            {
                tmp.sessionData.Add(key, value);
            }
        }
        public static object Get(this HubCallerContext context, string key)
        {
            var tmp = list.Find(a => a.Ticket == context.ConnectionId);
            if (tmp != null)
            {
                return tmp.sessionData[key];
            }
            return null;
        }
    }
    public class SessionModel
    {
        public string Ticket { get; set; }
        public DateTime LastOprTime { get; set; }
        public object Obj { get; set; }
        public bool TimeOut { get; set; }
        public Hashtable sessionData { get; set; }
    }
}
