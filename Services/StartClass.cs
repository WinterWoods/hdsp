using Helpers;
using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class StartClass
    {
        public static ConsoleHelper log = null;
        public static void Start()
        {
            try
            {
                Directory.SetCurrentDirectory("C:\\");
                //获取当前文件目录
                FileInfo file = new FileInfo(Process.GetCurrentProcess().MainModule.FileName);
                //设置工作目录为文件目录
                Directory.SetCurrentDirectory(file.DirectoryName);
                log = new ConsoleHelper();
                log.WriteInfo("设置工作目录为:" + file.DirectoryName);
                log.WriteInfo("获取Url");
                var setting = ConfigurationManager.AppSettings.GetValues("HttpUrl");
                if (setting==null)
                {
                    throw new Exception("没有配置:HttpUrl");
                }
                var HttpUrl = setting[0];
                log.WriteInfo("端口" + HttpUrl);
                WebApp.Start(HttpUrl);
                Console.WriteLine("启动成功:" + HttpUrl);
            }
            catch (Exception e)
            {
                Console.WriteLine("启动失败:" + e.InnerException.Message);
                //throw e;

            }
        }
        public static void Stop()
        {
            log.WriteInfo("停止系统");
        }
    }
}
