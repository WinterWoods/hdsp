using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityInfos
{
    public class OrgInfo:Basic
    {
        [SZORM.SZColumn(MaxLength =100)]
        public string OrgName { get; set; }
        [SZORM.SZColumn(MaxLength = 100)]
        public string Tel { get; set; }
        [SZORM.SZColumn(MaxLength = 100)]
        public string Password { get; set; }

    }
}
