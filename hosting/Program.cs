using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hosting
{
    class Program
    {
        static void Main(string[] args)
        {
            StartClass.Start();
            while (true)
                Console.ReadLine();
        }
    }
}
