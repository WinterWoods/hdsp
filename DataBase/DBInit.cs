using EntityInfos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBase
{
    public partial class DB
    {
        protected override void Initialization()
        {
            this.OrgInfos.Add(new OrgInfo { OrgName = "测试单位" });
        }
    }
}
