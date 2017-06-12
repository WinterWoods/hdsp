using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Services.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Filters
{
    public class ErrorHandling : HubPipelineModule
    {
        IHubContext context = GlobalHost.ConnectionManager.GetHubContext<ClientManager>();
        protected override void OnIncomingError(ExceptionContext exceptionContext, IHubIncomingInvokerContext invokerContext)
        {
            string _sConnectID = invokerContext.Hub.Context.ConnectionId;
            context.Clients.Client(_sConnectID).ExceptionHandler(exceptionContext.Error.Message);
            
            StartClass.log.WriteError(exceptionContext.Error.Message);
            base.OnIncomingError(exceptionContext, invokerContext);
        }
    }
}
