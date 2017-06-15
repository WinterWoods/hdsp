using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Owin;
using Services.Filters;
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
            
            var serializer = new JsonSerializer()
            {
                DateFormatString = "yyyy-MM-dd HH:mm:ss",
                DateTimeZoneHandling = DateTimeZoneHandling.Local
            };
            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => serializer);
            GlobalHost.HubPipeline.AddModule(new ErrorHandling());

            app.Map("/signalr", map =>
            {
                var hubConfiguration = new HubConfiguration
                {
                    //EnableJavaScriptProxies = true,
                    EnableDetailedErrors = false,
                    EnableJSONP = true
                };
                
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
                    if (File.Exists(startUpPath + path))
                        msg = File.ReadAllBytes(startUpPath + path);
                    else
                        msg = new byte[0];
                }
                context.Response.ContentType=MimeMapping.GetMimeMapping(fileInfo.Name);
                context.Response.StatusCode = 200;
                context.Response.ContentLength = msg.Length;
                return context.Response.WriteAsync(msg);
            });
        }
    }
}
