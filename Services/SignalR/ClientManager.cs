using EntityInfos;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.SignalR
{
    public class ClientManager: Hub
    {
        public override Task OnConnected()
        {
            Context.NewUser();
            StartClass.log.WriteInfo("一个新用户连接了进来." + Context.ConnectionId);
            return base.OnConnected();
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            var org = (OrgInfo)Context.Get("OrgInfo");
            if (org != null)
                Groups.Remove(Context.ConnectionId, org.Key);
            Context.Logout();
            StartClass.log.WriteInfo("一个用户断开了." + Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }
    }
}
