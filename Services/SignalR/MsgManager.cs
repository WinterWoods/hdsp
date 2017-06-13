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
        public Task<MessageInfo> MessageList(string model)
        {
            return Task.Factory.StartNew(() =>
            {
                //Thread.Sleep(new Random(System.Guid.NewGuid().GetHashCode()).Next(1,9)*1000);
                return new MessageInfo() { Message=model };
            });
        }
    }
}
