using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityInfos
{
    public class MessageInfo:Basic
    {
        public string Message { get; set; }
        public string SendTime { get; set; }
        public string WXName { get; set; }
        public string WXHead { get; set; }
    }
}
