using DataBase;
using EntityInfos;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Services.SignalR
{
    public class MsgManager : Hub
    {
        IHubContext context = GlobalHost.ConnectionManager.GetHubContext<ClientManager>();
        
        public Task<UserInfo> GetUserForCode(string code)
        {
            return Task.Factory.StartNew(() =>
            {
                var accessToken = WXServiceManager.GetWXWebAccessTokenForCode(code);
                using (DB db = new DB())
                {
                    //如果已经有了.
                    var user= db.UserInfos.AsQuery().Where(w => w.WXOpenId == accessToken.openid).FirstOrDefault();
                    if (user != null) return user;
                    //如果没有,需要从新拉去并注册
                    var WXUser = WXServiceManager.GetWXUserInfo(accessToken.openid, accessToken.access_token);
                    //开始注册
                    user = new UserInfo();
                    user.WXOpenId = WXUser.openid;
                    user.WXCity = WXUser.city;
                    user.WXCountry = WXUser.country;
                    user.WXHeadImgUrl = WXUser.headimgurl;
                    user.WXNickName = WXUser.nickname;
                    user.WXProvince = WXUser.province;
                    user.WXSex = WXUser.sex;
                    user = db.UserInfos.Add(user);
                    db.Save();
                    return user;
                }
            });
        }

        public Task<List<MessageInfo>> MessageList()
        {
            return Task.Factory.StartNew(() =>
            {
               using(DB db=new DB())
                {
                    return db.MessageInfos.AsQuery().ToList();
                }
            });
        }
        public Task<MessageInfo> SendMessage()
        {
            return Task.Factory.StartNew(() =>
            {
                return new MessageInfo();
            });
        }
    }
}
