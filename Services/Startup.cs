using Microsoft.AspNet.SignalR;
using Newtonsoft.Json.Converters;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Services
{
    public class Startup
    {
        public static string startUpPath = System.IO.Path.GetDirectoryName(Assembly.GetEntryAssembly().Location) + "\\www\\";
        public static Dictionary<string, byte[]> pageCache = new Dictionary<string, byte[]>();
        private object LockObject = new object();
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            config.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;
            //config.Filters.Add(new ExceptionActionFilter());
            //跨域配置
            //config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}"
            );
            config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new IsoDateTimeConverter()
            {
                DateTimeFormat = "yyyy-MM-dd HH:mm:ss"
            });
            //config.Filters.Add(new ApiAuthorizeAttribute(new string[] { "FileManager/DownLastVersionExe", "FileManager/UpUsers" }));
            app.UseWebApi(config);
            app.Map("/signalr", map =>
            {
                // Setup the cors middleware to run before SignalR.
                // By default this will allow all origins. You can 
                // configure the set of origins and/or http verbs by
                // providing a cors options with a different policy.
                //map.UseCors(CorsOptions.AllowAll);

                var hubConfiguration = new HubConfiguration
                {
                    EnableJavaScriptProxies = true,
                    EnableDetailedErrors = true
                    // You can enable JSONP by uncommenting line below.
                    // JSONP requests are insecure but some older browsers (and some
                    // versions of IE) require JSONP to work cross domain
                    // EnableJSONP = true
                };

                // Run the SignalR pipeline. We're not using MapSignalR
                // since this branch is already runs under the "/signalr"
                // path.
                map.RunSignalR(hubConfiguration);
            });

            bool IsCache = false;
            try
            {
                IsCache = ConfigurationManager.AppSettings.GetValues("IsCache")[0] == "true" ? true : false;
            }
            catch { }

            app.Run(context =>
            {
                string path = "index.html";
                context.Response.StatusCode = 200;
                if (context.Request.Path.Value != "/")
                    path = context.Request.Path.Value;
                // New code: Throw an exception for this URI path.
                if (context.Request.Path.Value == "/jquery")
                {
                    path = "/Scripts/jquery-2.2.4.min.js";
                }
                else if (context.Request.Path.Value == "/jquery.signalR")
                {
                    path = "/Scripts/jquery.signalR-2.2.1.min.js";
                }
                
                if (!File.Exists(startUpPath + path))
                {
                    path = "404.html";
                }

                FileInfo fileInfo = new FileInfo(startUpPath + path);
                byte[] msg = null;
                if (IsCache)
                {
                    if (!pageCache.ContainsKey(path))
                    {
                        lock (LockObject)
                        {
                            msg = File.ReadAllBytes(startUpPath + path);
                            pageCache.Add(path, msg);
                        }
                    }

                    msg = pageCache[path];
                }
                else
                {
                    msg = File.ReadAllBytes(startUpPath + path);
                }
                context.Response.ContentType=MimeMapping.GetMimeMapping(fileInfo.Name);
                //if (fileInfo.Extension == ".html")
                //    context.Response.ContentType = "text/html;charset=UTF-8";
                //else if (fileInfo.Extension == ".js")
                //    context.Response.ContentType = "text/javascript;charset=UTF-8";
                //else if (fileInfo.Extension == ".css")
                //    context.Response.ContentType = "text/css";
                //else
                //{
                //    context.Response.ContentType = "application/octet-stream";
                //}
                context.Response.StatusCode = 200;
                context.Response.ContentLength = msg.Length;
                return context.Response.WriteAsync(msg);
            });
        }
    }
}
