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
                if (string.IsNullOrEmpty(accessToken.openid)) throw new Exception("错误");
                using (DB db = new DB())
                {
                    //如果已经有了.
                    var user = db.UserInfos.AsQuery().Where(w => w.WXOpenId == accessToken.openid).FirstOrDefault();
                    if (user != null)
                    {
                        Context.Set("UserInfo", user);
                        return user;
                    }
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
                    Context.Set("UserInfo", user);
                    return user;
                }

            });
        }
        public Task<OrgInfo> GetOrgInfo(string bsKey)
        {
            return Task.Factory.StartNew(() =>
            {
                using (DB db = new DB())
                {
                    var orgInfo = db.OrgInfos.Find(bsKey);
                    if (orgInfo == null)
                    {
                        throw new Exception("错误的大屏号码");
                    }

                    Context.Set("OrgInfo", orgInfo);
                    Groups.Add(Context.ConnectionId, orgInfo.Key);
                    return orgInfo;
                }
            });
        }
        public class MsgResult:MessageInfo
        {
            public MsgResult(MessageInfo info)
            {
                Message = info.Message;
                SendTime = info.SendTime;
                User_Key = info.User_Key;
                Org_Key = info.Org_Key;
                Type = info.Type;
            }
            public string WXName { get; set; }
            public string WXHeadImgUrl { get; set; }
        }
        public Task<string> SendMessage(string msg, string type, string fileUrl)
        {
            return Task.Factory.StartNew(() =>
            {
                using (DB db = new DB())
                {
                    var org = (OrgInfo)Context.Get("OrgInfo");
                    var user = (UserInfo)Context.Get("UserInfo");
                    MessageInfo info = new MessageInfo();
                    info.Message = msg;
                    info.Org_Key = org.Key;
                    info.User_Key = user.Key;
                    info = db.MessageInfos.Add(info);
                    db.Save();
                    MsgResult result = new MsgResult(info);
                    result.WXName = user.WXNickName;
                    result.WXHeadImgUrl = user.WXHeadImgUrl;
                    context.Clients.Group(org.Key).sendMsg(info);
                }
                return "ok";
            });
        }
        public Task<string> GetAuthUrl()
        {
            return Task.Factory.StartNew(() =>
            {
                return WXServiceManager.GetAuthUrl(((OrgInfo)Context.Get("OrgInfo")).Key.ToString());
            });
        }
        public Task<List<MessageInfo>> MessageList()
        {
            return Task.Factory.StartNew(() =>
            {
                using (DB db = new DB())
                {
                    var org = (OrgInfo)Context.Get("OrgInfo");
                    return db.MessageInfos.AsQuery().Where(w=>w.Org_Key==org.Key).OrderByDesc(o=>o.SendTime).Take(20).ToList();
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
