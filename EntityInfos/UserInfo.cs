using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityInfos
{
    public class UserInfo:Basic
    {
        [SZORM.SZColumn(MaxLength =50)]
        public string WXOpenId { get; set; }
        [SZORM.SZColumn(MaxLength = 200)]
        public string WXNickName { get; set; }
        [SZORM.SZColumn(MaxLength = 500)]
        public string WXHeadImgUrl { get; set; }
        [SZORM.SZColumn(MaxLength = 1)]
        public string WXSex { get; set; }
        [SZORM.SZColumn(MaxLength = 50)]
        public string WXCity { get; set; }
        [SZORM.SZColumn(MaxLength = 50)]
        public string WXCountry { get; set; }
        [SZORM.SZColumn(MaxLength = 50)]
        public string WXProvince { get; set; }

        [SZORM.SZColumn(MaxLength = 1)]
        public UserState State
        {
            get
            {
                return state;
            }

            set
            {
                state = value;
            }
        }

        private UserState state = UserState.Normal;
    }
    public enum UserState
    {
        Normal,
        Black
    }
}
