using Helpers;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace hosting
{
    class Program
    {
        static void Main(string[] args)
        {
            //TimerTaskService timer = TimerTaskService.CreateTimerTaskService(new TimerInfo { TimerType = TimerType.LoopStop, Hour=1, Second = 10 },()=> {
            //    Task.Delay(1000).Wait();
            //    Console.WriteLine(DateTime.Now.ToString());
            //});
            //timer.Start();

            StartClass.Start();
            while (true)
                Console.ReadLine();
        }
    }
}
