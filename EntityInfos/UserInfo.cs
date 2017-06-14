using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityInfos
{
    public class UserInfo:Basic
    {
        public string WXOpenId { get; set; }
        public string WXNickName { get; set; }
        public string WXHeadImgUrl { get; set; }
        public string WXSex { get; set; }
        public string WXCity { get; set; }
        public string WXCountry { get; set; }
        public string WXProvince { get; set; }

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
