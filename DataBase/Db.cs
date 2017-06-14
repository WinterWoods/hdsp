using EntityInfos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SZORM;
namespace DataBase
{
    public partial class DB : DbContext
    {
        /// <summary>
        /// 机构信息,比如银基水世界
        /// </summary>
        public DbSet<OrgInfo> OrgInfos { get; set; }
        /// <summary>
        /// 用户信息,所有微信登录的人.
        /// </summary>
        public DbSet<UserInfo> UserInfos { get; set; }
        /// <summary>
        /// 消息列表.所有发送的消息
        /// </summary>
        public DbSet<MessageInfo> MessageInfos { get; set; }
    }
}
