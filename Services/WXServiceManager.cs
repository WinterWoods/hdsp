using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class WXStateModel
    {
        public int errcode { get; set; }
        public string errmsg { get; set; }
    }
    public static class WXServiceManager
    {
        public static string _APPID { get; set; }

        public static string _APPSECRET { get; set; }

        public static string _BasicAccessToken { get; set; }
        public static string _PushToken { get; set; }
        public static string _EncodingAESKey { get; set; }
        /// <summary>
        /// 错误码
        /// </summary>
        public static readonly Dictionary<int, string> TokenErrCode = new Dictionary<int, string>();

        private static Dictionary<string, WebAccessToken> _WebAccessToken = new Dictionary<string, WebAccessToken>();

        static WXServiceManager()
        {
            _APPID = ConfigurationManager.AppSettings.GetValues("APPID")[0];
            _APPSECRET = ConfigurationManager.AppSettings.GetValues("APPSECRET")[0];
            _PushToken= ConfigurationManager.AppSettings.GetValues("PushToken")[0];
            _EncodingAESKey = ConfigurationManager.AppSettings.GetValues("EncodingAESKey")[0];
            SetErrCodeMap();
            GetWXBasicAccessToken();
        }
        public static string SHA1(string content, Encoding encode)
        {
            try
            {
                SHA1 sha1 = new SHA1CryptoServiceProvider();
                byte[] bytes_in = encode.GetBytes(content);
                byte[] bytes_out = sha1.ComputeHash(bytes_in);
                sha1.Dispose();
                string result = BitConverter.ToString(bytes_out);
                result = result.Replace("-", "");
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("SHA1加密出错：" + ex.Message);
            }
        }
        public static string GetAuthUrl(string bsKey)
        {
            string url= System.Web.HttpUtility.UrlEncode(ConfigurationManager.AppSettings.GetValues("AuthUrl")[0] + "?bs=" + bsKey, Encoding.UTF8);
            return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + _APPID + "&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        }

        public class TokenModel : WXStateModel
        {
            public string access_token { get; set; }
            public int expires_in { get; set; }
        }
        /// <summary>
        /// 需要先获取 微信access_token
        /// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        /// </summary>
        private static void GetWXBasicAccessToken()
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("准备获取AccessToken");
            HttpClient http = new HttpClient();
            var result = http.GetAsync("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + _APPID + "&secret=" + _APPSECRET).Result;
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                TokenModel model = JsonConvert.DeserializeObject<TokenModel>(result.Content.ReadAsStringAsync().Result);
                if (model.errcode == 0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("获取成功");
                    _BasicAccessToken = model.access_token;
                }
                else
                {
                    Error(model);
                }
            }
        }
        public class WebAccessToken : WXStateModel
        {
            public string access_token { get; set; }
            public int expires_in { get; set; }
            public string refresh_token { get; set; }
            public string openid { get; set; }
            public string scope { get; set; }
            private DateTime time = DateTime.Now;
            public DateTime Time
            {
                get
                {
                    return time;
                }

                set
                {
                    time = value;
                }
            }


        }
        /// <summary>
        /// 根据页面code,返回openid
        /// https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
        /// </summary>
        /// <param name="code">页面的code</param>
        /// <returns>返回openid</returns>
        public static WebAccessToken GetWXWebAccessTokenForCode(string code)
        {

            //先查询有没有
            if (_WebAccessToken.ContainsKey(code))
            {
                //如果已经存在了
                //检查是否过期
                var webAccessToken = _WebAccessToken[code];
                if (WebAccessTokenIsTimeOut(webAccessToken.access_token, webAccessToken.openid))
                {
                    return webAccessToken;
                }
                //如果已经过期,查询是否可以刷新授权,如果不能刷新授权则抛出异常
                if (webAccessToken.Time.AddDays(29) < DateTime.Now)
                {
                    throw new Exception("授权过期");
                }
                _WebAccessToken[code] = ReLoadWebAccessToken(webAccessToken.refresh_token);
                return _WebAccessToken[code];
            }

            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("准备获取WXWebAccessTokenForCode");
            HttpClient http = new HttpClient();
            var result = http.GetAsync("https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + _APPID + "&secret=" + _APPSECRET + "&code=" + code + "&grant_type=authorization_code").Result;
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                WebAccessToken model = JsonConvert.DeserializeObject<WebAccessToken>(result.Content.ReadAsStringAsync().Result);
                if (model.errcode == 0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("获取成功");
                    _WebAccessToken.Add(code, model);
                    return model;
                }
                Error(model);
            }
            return null;
        }
        /// <summary>
        /// https://api.weixin.qq.com/sns/auth?access_token=ACCESS_TOKEN&openid=OPENID 
        /// </summary>
        /// <param name="accessToken"></param>
        /// <param name="openid"></param>
        /// <returns></returns>
        public static bool WebAccessTokenIsTimeOut(string accessToken,string openid)
        {
            HttpClient http = new HttpClient();
            var result = http.GetAsync("https://api.weixin.qq.com/sns/auth?access_token="+accessToken+"&openid="+openid).Result;
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                WXStateModel model = JsonConvert.DeserializeObject<WXStateModel>(result.Content.ReadAsStringAsync().Result);
                if (model.errcode ==0)
                {
                    return true;
                }
            }
            return false;
        }
        /// <summary>
        /// https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN
        /// </summary>
        /// <param name="refresh_token"></param>
        /// <returns></returns>
        public static WebAccessToken ReLoadWebAccessToken(string refresh_token)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("准备获取ReLoadWebAccessToken");
            HttpClient http = new HttpClient();
            var result = http.GetAsync("https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + _APPID + "&grant_type=refresh_token&refresh_token="+ refresh_token).Result;
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                WebAccessToken model = JsonConvert.DeserializeObject<WebAccessToken>(result.Content.ReadAsStringAsync().Result);
                if (model.errcode==0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("获取成功");
                    return model;
                }
                Error(model);
            }
            
            return null;
        }
        public class WXUserInfo:WXStateModel
        {
            /// <summary>
            /// 用户的唯一标识
            /// </summary>
            public string openid { get; set; }
            /// <summary>
            /// 用户昵称
            /// </summary>
            public string nickname { get; set; }
            /// <summary>
            /// 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
            /// </summary>
            public string sex { get; set; }
            /// <summary>
            /// 用户个人资料填写的省份
            /// </summary>
            public string province { get; set; }
            /// <summary>
            /// 普通用户个人资料填写的城市
            /// </summary>
            public string city { get; set; }
            /// <summary>
            /// 国家，如中国为CN
            /// </summary>
            public string country { get; set; }
            /// <summary>
            /// 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
            /// </summary>
            public string headimgurl { get; set; }
        }
        /// <summary>
        ///  https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN 
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public static WXUserInfo GetWXUserInfo(string openid,string accessToken)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("准备获取GetWXUserInfo");
            HttpClient http = new HttpClient();
            var result = http.GetAsync("https://api.weixin.qq.com/sns/userinfo?access_token="+ accessToken + "&openid="+ openid + "&lang=zh_CN").Result;
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                WXUserInfo model = JsonConvert.DeserializeObject<WXUserInfo>(result.Content.ReadAsStringAsync().Result);
                if (model.errcode==0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("获取成功");
                    return model;
                }
                Error(model);
            }
            
            return null;
        }
        public class QrcodeRestultModel:WXStateModel
        {
            public string ticket { get; set; }
            public string expire_seconds { get; set; }
            public string url { get; set; }
        }
        public static QrcodeRestultModel CreateQrcodeLIMIT(string scene_str)
        {
            HttpClient http = new HttpClient();
            HttpContent content= new StringContent("{\"action_name\": \"QR_LIMIT_STR_SCENE\", \"action_info\": {\"scene\": {\"scene_str\": \""+ scene_str + "\"}}}");
            var result = http.PostAsync("https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token="+_BasicAccessToken, content).Result;
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                QrcodeRestultModel model = JsonConvert.DeserializeObject<QrcodeRestultModel>(result.Content.ReadAsStringAsync().Result);
                if (model.errcode == 0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("获取成功");
                    return model;
                }
                Error(model);
            }
            return null;

        }
        public class LongUrl2ShortUrl:WXStateModel
        {
            public string short_url { get; set; }
        }
        /// <summary>
        /// https://api.weixin.qq.com/cgi-bin/shorturl?access_token=ACCESS_TOKEN
        /// </summary>
        /// <param name="longUrl"></param>
        /// <returns></returns>
        public static string GetShortUrl(string longUrl)
        {
            HttpClient http = new HttpClient();
            HttpContent content = new StringContent("{\"action\":\"long2short\",\"long_url\":\"" + longUrl + "\"}");
            var result = http.PostAsync("https://api.weixin.qq.com/cgi-bin/shorturl?access_token=" + _BasicAccessToken, content).Result;
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                LongUrl2ShortUrl model = JsonConvert.DeserializeObject<LongUrl2ShortUrl>(result.Content.ReadAsStringAsync().Result);
                if (model.errcode == 0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("获取成功");
                    return model.short_url;
                }
                Error(model);
            }
            return null;
        }
        private static void Error(WXStateModel stateModel)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("失败啦:" + stateModel.errmsg);
            Console.ForegroundColor = ConsoleColor.Green;
            string errMsg;
            if(TokenErrCode.TryGetValue(stateModel.errcode,out errMsg))
            {
                throw new Exception(errMsg);
            }
            else
            {
                throw new Exception("未知异常");
            }
        }
        private static void SetErrCodeMap()
        {
            TokenErrCode.Add(-1, "系统繁忙，此时请开发者稍候再试");
            TokenErrCode.Add(0, "请求成功");
            TokenErrCode.Add(40001, "获取access_token时AppSecret错误，或者access_token无效。请开发者认真比对AppSecret的正确性，或查看是否正在为恰当的公众号调用接口");
            TokenErrCode.Add(40002, "不合法的凭证类型");
            TokenErrCode.Add(40003, "不合法的OpenID，请开发者确认OpenID（该用户）是否已关注公众号，或是否是其他公众号的OpenID");
            TokenErrCode.Add(40004, "不合法的媒体文件类型");
            TokenErrCode.Add(40005, "不合法的文件类型");
            TokenErrCode.Add(40006, "不合法的文件大小");
            TokenErrCode.Add(40007, "不合法的媒体文件id");
            TokenErrCode.Add(40008, "不合法的消息类型");
            TokenErrCode.Add(40009, "不合法的图片文件大小");
            TokenErrCode.Add(40010, "不合法的语音文件大小");
            TokenErrCode.Add(40011, "不合法的视频文件大小");
            TokenErrCode.Add(40012, "不合法的缩略图文件大小");
            TokenErrCode.Add(40013, "不合法的AppID，请开发者检查AppID的正确性，避免异常字符，注意大小写");
            TokenErrCode.Add(40014, "不合法的access_token，请开发者认真比对access_token的有效性（如是否过期），或查看是否正在为恰当的公众号调用接口");
            TokenErrCode.Add(40015, "不合法的菜单类型");
            TokenErrCode.Add(40016, "不合法的按钮个数");
            TokenErrCode.Add(40017, "不合法的按钮个数");
            TokenErrCode.Add(40018, "不合法的按钮名字长度");
            TokenErrCode.Add(40019, "不合法的按钮KEY长度");
            TokenErrCode.Add(40020, "不合法的按钮URL长度");
            TokenErrCode.Add(40021, "不合法的菜单版本号");
            TokenErrCode.Add(40022, "不合法的子菜单级数");
            TokenErrCode.Add(40023, "不合法的子菜单按钮个数");
            TokenErrCode.Add(40024, "不合法的子菜单按钮类型");
            TokenErrCode.Add(40025, "不合法的子菜单按钮名字长度");
            TokenErrCode.Add(40026, "不合法的子菜单按钮KEY长度");
            TokenErrCode.Add(40027, "不合法的子菜单按钮URL长度");
            TokenErrCode.Add(40028, "不合法的自定义菜单使用用户");
            TokenErrCode.Add(40029, "不合法的oauth_code");
            TokenErrCode.Add(40030, "不合法的refresh_token");
            TokenErrCode.Add(40031, "不合法的openid列表");
            TokenErrCode.Add(40032, "不合法的openid列表长度");
            TokenErrCode.Add(40033, "不合法的请求字符，不能包含\\uxxxx格式的字符");
            TokenErrCode.Add(40035, "不合法的参数");
            TokenErrCode.Add(40038, "不合法的请求格式");
            TokenErrCode.Add(40039, "不合法的URL长度");
            TokenErrCode.Add(40050, "不合法的分组id");
            TokenErrCode.Add(40051, "分组名字不合法");
            TokenErrCode.Add(40060, "删除单篇图文时，指定的article_idx不合法");
            TokenErrCode.Add(40117, "分组名字不合法");
            TokenErrCode.Add(40118, "media_id大小不合法");
            TokenErrCode.Add(40119, "button类型错误");
            TokenErrCode.Add(40120, "button类型错误");
            TokenErrCode.Add(40121, "不合法的media_id类型");
            TokenErrCode.Add(40132, "微信号不合法");
            TokenErrCode.Add(40137, "不支持的图片格式");
            TokenErrCode.Add(40163, "Code已经在使用");
            
            TokenErrCode.Add(40155, "请勿添加其他公众号的主页链接");
            TokenErrCode.Add(41001, "缺少access_token参数");
            TokenErrCode.Add(41002, "缺少appid参数");
            TokenErrCode.Add(41003, "缺少refresh_token参数");
            TokenErrCode.Add(41004, "缺少secret参数");
            TokenErrCode.Add(41005, "缺少多媒体文件数据");
            TokenErrCode.Add(41006, "缺少media_id参数");
            TokenErrCode.Add(41007, "缺少子菜单数据");
            TokenErrCode.Add(41008, "缺少oauthcode");
            TokenErrCode.Add(41009, "缺少openid");
            TokenErrCode.Add(42001, "access_token超时，请检查access_token的有效期，请参考基础支持-获取access_token中，对access_token的详细机制说明");
            TokenErrCode.Add(42002, "refresh_token超时");
            TokenErrCode.Add(42003, "oauth_code超时");
            TokenErrCode.Add(42007, "用户修改微信密码，accesstoken和refreshtoken失效，需要重新授权");
            TokenErrCode.Add(43001, "需要GET请求");
            TokenErrCode.Add(43002, "需要POST请求");
            TokenErrCode.Add(43003, "需要HTTPS请求");
            TokenErrCode.Add(43004, "需要接收者关注");
            TokenErrCode.Add(43005, "需要好友关系");
            TokenErrCode.Add(43019, "需要将接收者从黑名单中移除");
            TokenErrCode.Add(44001, "多媒体文件为空");
            TokenErrCode.Add(44002, "POST的数据包为空");
            TokenErrCode.Add(44003, "图文消息内容为空");
            TokenErrCode.Add(44004, "文本消息内容为空");
            TokenErrCode.Add(45001, "多媒体文件大小超过限制");
            TokenErrCode.Add(45002, "消息内容超过限制");
            TokenErrCode.Add(45003, "标题字段超过限制");
            TokenErrCode.Add(45004, "描述字段超过限制");
            TokenErrCode.Add(45005, "链接字段超过限制");
            TokenErrCode.Add(45006, "图片链接字段超过限制");
            TokenErrCode.Add(45007, "语音播放时间超过限制");
            TokenErrCode.Add(45008, "图文消息超过限制");
            TokenErrCode.Add(45009, "接口调用超过限制");
            TokenErrCode.Add(45010, "创建菜单个数超过限制");
            TokenErrCode.Add(45011, "API调用太频繁，请稍候再试");
            TokenErrCode.Add(45015, "回复时间超过限制");
            TokenErrCode.Add(45016, "系统分组，不允许修改");
            TokenErrCode.Add(45017, "分组名字过长");
            TokenErrCode.Add(45018, "分组数量超过上限");
            TokenErrCode.Add(45047, "客服接口下行条数超过上限");
            TokenErrCode.Add(46001, "不存在媒体数据");
            TokenErrCode.Add(46002, "不存在的菜单版本");
            TokenErrCode.Add(46003, "不存在的菜单数据");
            TokenErrCode.Add(46004, "不存在的用户");
            TokenErrCode.Add(47001, "解析JSON/XML内容错误");
            TokenErrCode.Add(48001, "api功能未授权，请确认公众号已获得该接口，可以在公众平台官网-开发者中心页中查看接口权限");
            TokenErrCode.Add(48002, "粉丝拒收消息（粉丝在公众号选项中，关闭了“接收消息”）");
            TokenErrCode.Add(48004, "api接口被封禁，请登录mp.weixin.qq.com查看详情");
            TokenErrCode.Add(48005, "api禁止删除被自动回复和自定义菜单引用的素材");
            TokenErrCode.Add(48006, "api禁止清零调用次数，因为清零次数达到上限");
            TokenErrCode.Add(50001, "用户未授权该api");
            TokenErrCode.Add(50002, "用户受限，可能是违规后接口被封禁");
            TokenErrCode.Add(61451, "参数错误(invalidparameter)");
            TokenErrCode.Add(61452, "无效客服账号(invalidkf_account)");
            TokenErrCode.Add(61453, "客服帐号已存在(kf_accountexsited)");
            TokenErrCode.Add(61454, "客服帐号名长度超过限制(仅允许10个英文字符，不包括@及@后的公众号的微信号)(invalidkf_acountlength)");
            TokenErrCode.Add(61455, "客服帐号名包含非法字符(仅允许英文+数字)(illegalcharacterin  kf_account)");
            TokenErrCode.Add(61456, "客服帐号个数超过限制(10个客服账号)(kf_accountcountexceeded)");
            TokenErrCode.Add(61457, "无效头像文件类型(invalidfiletype)");
            TokenErrCode.Add(61450, "系统错误(systemerror)");
            TokenErrCode.Add(61500, "日期格式错误");
            TokenErrCode.Add(65301, "不存在此menuid对应的个性化菜单");
            TokenErrCode.Add(65302, "没有相应的用户");
            TokenErrCode.Add(65303, "没有默认菜单，不能创建个性化菜单");
            TokenErrCode.Add(65304, "MatchRule信息为空");
            TokenErrCode.Add(65305, "个性化菜单数量受限");
            TokenErrCode.Add(65306, "不支持个性化菜单的帐号");
            TokenErrCode.Add(65307, "个性化菜单信息为空");
            TokenErrCode.Add(65308, "包含没有响应类型的button");
            TokenErrCode.Add(65309, "个性化菜单开关处于关闭状态");
            TokenErrCode.Add(65310, "填写了省份或城市信息，国家信息不能为空");
            TokenErrCode.Add(65311, "填写了城市信息，省份信息不能为空");
            TokenErrCode.Add(65312, "不合法的国家信息");
            TokenErrCode.Add(65313, "不合法的省份信息");
            TokenErrCode.Add(65314, "不合法的城市信息");
            TokenErrCode.Add(65316, "该公众号的菜单设置了过多的域名外跳（最多跳转到3个域名的链接）");
            TokenErrCode.Add(65317, "不合法的URL");
            TokenErrCode.Add(9001001, "POST数据参数不合法");
            TokenErrCode.Add(9001002, "远端服务不可用");
            TokenErrCode.Add(9001003, "Ticket不合法");
            TokenErrCode.Add(9001004, "获取摇周边用户信息失败");
            TokenErrCode.Add(9001005, "获取商户信息失败");
            TokenErrCode.Add(9001006, "获取OpenID失败");
            TokenErrCode.Add(9001007, "上传文件缺失");
            TokenErrCode.Add(9001008, "上传素材的文件类型不合法");
            TokenErrCode.Add(9001009, "上传素材的文件尺寸不合法");
            TokenErrCode.Add(9001010, "上传失败");
            TokenErrCode.Add(9001020, "帐号不合法");
            TokenErrCode.Add(9001021, "已有设备激活率低于50%，不能新增设备");
            TokenErrCode.Add(9001022, "设备申请数不合法，必须为大于0的数字");
            TokenErrCode.Add(9001023, "已存在审核中的设备ID申请");
            TokenErrCode.Add(9001024, "一次查询设备ID数量不能超过50");
            TokenErrCode.Add(9001025, "设备ID不合法");
            TokenErrCode.Add(9001026, "页面ID不合法");
            TokenErrCode.Add(9001027, "页面参数不合法");
            TokenErrCode.Add(9001028, "一次删除页面ID数量不能超过10");
            TokenErrCode.Add(9001029, "页面已应用在设备中，请先解除应用关系再删除");
            TokenErrCode.Add(9001030, "一次查询页面ID数量不能超过50");
            TokenErrCode.Add(9001031, "时间区间不合法");
            TokenErrCode.Add(9001032, "保存设备与页面的绑定关系参数错误");
            TokenErrCode.Add(9001033, "门店ID不合法");
            TokenErrCode.Add(9001034, "设备备注信息过长");
            TokenErrCode.Add(9001035, "设备申请参数不合法");
            TokenErrCode.Add(9001036, "查询起始值begin不合法");
        }
    }
}
