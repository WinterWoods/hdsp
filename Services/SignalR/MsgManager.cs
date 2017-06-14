using DataBase;
using EntityInfos;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Services.SignalR
{
    public class MsgManager : Hub
    {
        IHubContext context = GlobalHost.ConnectionManager.GetHubContext<ClientManager>();
        

        public Task<List<MessageInfo>> MessageList()
        {
            return Task.Factory.StartNew(() =>
            {
               using(DB db=new DB())
                {
                    return db.MessageInfos.AsQuery().ToList();
                }
            });
        }
        public Task<MessageInfo> SendMessage()
        {
            return Task.Factory.StartNew(() =>
            {
                return new MessageInfo();
            });
        }
    }
}
