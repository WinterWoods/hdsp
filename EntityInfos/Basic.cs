using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SZORM;

namespace EntityInfos
{
    public class Basic
    {
        [SZColumn(MaxLength = 32, IsKey = true)]
        public string Key { get; set; }
        [SZColumn(IsAddTime = true)]
        public DateTime? AddTime { get; set; }
        [SZColumn(IsEditTime = true)]
        public DateTime? EditTime { get; set; }
    }
}
