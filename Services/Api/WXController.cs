using DataBase;
using Microsoft.Owin;
using Services.WX;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Xml;

namespace Services.Api
{
    public class WXController: ApiController
    {
        public class PushModel
        {
            public string signature { get; set; }
            public string timestamp { get; set; }
            public string nonce { get; set; }
            public string echostr { get; set; }
        }
        [AcceptVerbs("Get", "Post")]
        public HttpResponseMessage Push([FromUri]PushModel model)
        {
            try
            {
                StartClass.log.WriteInfo(model.signature);
                StartClass.log.WriteInfo(model.timestamp);
                StartClass.log.WriteInfo(model.nonce);
                StartClass.log.WriteInfo(model.echostr);
                StartClass.log.WriteInfo(Request.Method.Method.ToLower());
                if (Request.Method.Method.ToLower() == "post")
                {
                    if (CheckSignature(model.signature, model.timestamp, model.nonce, model.echostr))
                    {
                        StartClass.log.WriteInfo("准备解析xml");
                        //返回xml消息
                        var result=ReceiveXML(ActionContext);
                        if (result != null)
                        {
                            return result;
                        }
                        else
                        {
                            return new HttpResponseMessage()
                            {
                                Content = new StringContent("success", Encoding.GetEncoding("UTF-8"), "application/x-www-form-urlencoded")
                            };
                        }
                    }
                }
                else
                {
                    if (CheckSignature(model.signature, model.timestamp, model.nonce, model.echostr))
                    {
                        return new HttpResponseMessage()
                        {
                            Content = new StringContent(model.echostr, Encoding.GetEncoding("UTF-8"), "application/x-www-form-urlencoded")
                        };
                    }
                }
            }
            catch(Exception ex)
            {
                StartClass.log.WriteError(ex.Message);
            }
            return new HttpResponseMessage()
            {
                Content = new StringContent("success", Encoding.GetEncoding("UTF-8"), "application/x-www-form-urlencoded")
            };
        }
        public HttpResponseMessage ReceiveXML(HttpActionContext actionContext)
        {
            var requestStr = actionContext.Request.Content.ReadAsStringAsync().Result;
            StartClass.log.WriteInfo(requestStr);
            if (!string.IsNullOrEmpty(requestStr))
            {
                //封装请求类
                XmlDocument requestDocXml = new XmlDocument();
                requestDocXml.LoadXml(requestStr);
                XmlElement rootElement = requestDocXml.DocumentElement;
                WxXmlModel wxXmlModel = new WxXmlModel();
                wxXmlModel.ToUserName = rootElement.SelectSingleNode("ToUserName").InnerText;
                wxXmlModel.FromUserName = rootElement.SelectSingleNode("FromUserName").InnerText;
                wxXmlModel.CreateTime = rootElement.SelectSingleNode("CreateTime").InnerText;
                wxXmlModel.MsgType = rootElement.SelectSingleNode("MsgType").InnerText;
                switch (wxXmlModel.MsgType)
                {
                    case "text"://文本
                        wxXmlModel.Content = rootElement.SelectSingleNode("Content").InnerText;
                        break;
                    case "image"://图片
                        wxXmlModel.PicUrl = rootElement.SelectSingleNode("PicUrl").InnerText;
                        break;
                    case "event"://事件
                        wxXmlModel.Event = rootElement.SelectSingleNode("Event").InnerText;
                        if (wxXmlModel.Event == "subscribe")//关注类型
                        {
                            wxXmlModel.EventKey = rootElement.SelectSingleNode("EventKey").InnerText.Replace("qrscene_","");
                        }
                        if (wxXmlModel.Event == "SCAN")//关注类型
                        {
                            wxXmlModel.EventKey = rootElement.SelectSingleNode("EventKey").InnerText;
                        }
                        break;
                    default:
                        break;
                }
                StartClass.log.WriteInfo(wxXmlModel.MsgType+"-"+ wxXmlModel.Event+"-"+ wxXmlModel.EventKey);
                return ResponseXML(wxXmlModel);//回复消息
            }
            return null;
        }
        /// <summary>
        /// 回复文本
        /// </summary>
        /// <param name="FromUserName">发送给谁(openid)</param>
        /// <param name="ToUserName">来自谁(公众账号ID)</param>
        /// <param name="Content">回复类型文本</param>
        /// <returns>拼凑的XML</returns>
        public static string ReText(string FromUserName, string ToUserName, string Content)
        {
            string XML = "<xml><ToUserName><![CDATA[" + FromUserName + "]]></ToUserName><FromUserName><![CDATA[" + ToUserName + "]]></FromUserName>";//发送给谁(openid)，来自谁(公众账号ID)
            XML += "<CreateTime>" + (int)(DateTime.Now - new DateTime(1970, 1, 1)).TotalSeconds + "</CreateTime>";//回复时间戳
            XML += "<MsgType><![CDATA[text]]></MsgType>";//回复类型文本
            XML += "<Content><![CDATA[" + Content + "]]></Content></xml>";//回复内容 FuncFlag设置为1的时候，自动星标刚才接收到的消息，适合活动统计使用
            return XML;
        }
        /// <summary>
        /// 回复单图文
        /// </summary>
        /// <param name="FromUserName">发送给谁(openid)</param>
        /// <param name="ToUserName">来自谁(公众账号ID)</param>
        /// <param name="Title">标题</param>
        /// <param name="Description">详情</param>
        /// <param name="PicUrl">图片地址</param>
        /// <param name="Url">地址</param>
        /// <returns>拼凑的XML</returns>
        public static string ReArticle(string FromUserName, string ToUserName, string Title, string Description, string PicUrl, string Url)
        {
            string XML = "<xml><ToUserName><![CDATA[" + FromUserName + "]]></ToUserName><FromUserName><![CDATA[" + ToUserName + "]]></FromUserName>";//发送给谁(openid)，来自谁(公众账号ID)
            XML += "<CreateTime>" + (int)(DateTime.Now - new DateTime(1970, 1, 1)).TotalSeconds + "</CreateTime>";//回复时间戳
            XML += "<MsgType><![CDATA[news]]></MsgType><Content><![CDATA[]]></Content><ArticleCount>1</ArticleCount><Articles>";
            XML += "<item><Title><![CDATA[" + Title + "]]></Title><Description><![CDATA[" + Description + "]]></Description><PicUrl><![CDATA[" + PicUrl + "]]></PicUrl><Url><![CDATA[" + Url + "]]></Url></item>";
            XML += "</Articles><FuncFlag>0</FuncFlag></xml>";
            return XML;
        }
        /// <summary>
        /// 多图文回复
        /// </summary>
        /// <param name="FromUserName">发送给谁(openid)</param>
        /// <param name="ToUserName">来自谁(公众账号ID)</param>
        /// <param name="ArticleCount">图文数量</param>
        /// <param name="dtArticle"></param>
        /// <returns></returns>
        public static string ReArticle(string FromUserName, string ToUserName, int ArticleCount, System.Data.DataTable dtArticle)
        {
            string XML = "<xml><ToUserName><![CDATA[" + FromUserName + "]]></ToUserName><FromUserName><![CDATA[" + ToUserName + "]]></FromUserName>";//发送给谁(openid)，来自谁(公众账号ID)
            XML += "<CreateTime>" + (int)(DateTime.Now-new DateTime(1970,1,1)).TotalSeconds + "</CreateTime>";//回复时间戳
            XML += "<MsgType><![CDATA[news]]></MsgType><Content><![CDATA[]]></Content><ArticleCount>" + ArticleCount + "</ArticleCount><Articles>";
            foreach (System.Data.DataRow Item in dtArticle.Rows)
            {
                XML += "<item><Title><![CDATA[" + Item["Title"] + "]]></Title><Description><![CDATA[" + Item["Description"] + "]]></Description><PicUrl><![CDATA[" + Item["PicUrl"] + "]]></PicUrl><Url><![CDATA[" + Item["Url"] + "]]></Url></item>";
            }
            XML += "</Articles><FuncFlag>0</FuncFlag></xml>";
            return XML;
        }
        public static string GetText(string FromUserName, string ToUserName, string Content)
        {
            string XML = "";
            switch (Content)
            {
                case "关键字":
                    XML = ReText(FromUserName, ToUserName, "关键词回复测试");
                    break;
                case "单图文":
                    XML = ReArticle(FromUserName, ToUserName, "测试标题", "测试详情——百度搜索链接", "http://pic.cnblogs.com/avatar/743013/20150521120816.png", "http://www.baidu.com");
                    break;
                default:
                    XML = ReText(FromUserName, ToUserName, "智能回答测试中。");
                    break;
            }
            return XML;
        }
        private HttpResponseMessage ResponseXML(WxXmlModel wxXmlModel)
        {
            string XML = "";
            StartClass.log.WriteInfo(wxXmlModel.MsgType + "-" + wxXmlModel.Event);
            
            switch (wxXmlModel.MsgType)
            {
                case "text"://文本回复
                    XML = GetText(wxXmlModel.FromUserName, wxXmlModel.ToUserName, wxXmlModel.Content);
                    break;
                case "event"://文本回复
                    StartClass.log.WriteInfo("!!!!!!");
                    if (wxXmlModel.Event == "subscribe"|| wxXmlModel.Event == "SCAN")
                    {
                        using (DB db = new DB())
                        {
                            StartClass.log.WriteInfo("!" + wxXmlModel.EventKey);
                            var org = db.OrgInfos.Find(wxXmlModel.EventKey);
                            StartClass.log.WriteInfo(wxXmlModel.EventKey);
                            if (org != null)
                            {
                                StartClass.log.WriteInfo(org.Key);
                                XML = ReArticle(wxXmlModel.FromUserName, wxXmlModel.ToUserName, org.OrgName, org.OrgName, "http://pic.cnblogs.com/avatar/743013/20150521120816.png", WXServiceManager.GetAuthUrl(org.Key));
                            }
                        }
                    }
                    else
                    {
                        return null;
                    }
                    break;
                default://默认回复
                    XML = GetText(wxXmlModel.FromUserName, wxXmlModel.ToUserName, "未知的关键字");
                    break;
            }
            StartClass.log.WriteInfo(XML);
            return new HttpResponseMessage()
            {
                Content = new StringContent(XML, Encoding.UTF8, "application/xml")
            };
        }
        /// <summary>
        /// 验证微信签名
        /// </summary>
        /// <returns></returns>
        /// * 将token、timestamp、nonce三个参数进行字典序排序
        /// * 将三个参数字符串拼接成一个字符串进行sha1加密
        /// * 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信。
        private bool CheckSignature(string signature, string timestamp, string nonce, string echostr)
        {
            string[] ArrTmp = { WXServiceManager._PushToken, timestamp, nonce };
            Array.Sort(ArrTmp);
            string tmpStr = string.Join("", ArrTmp);
            StartClass.log.WriteInfo(tmpStr);
            var result = WXServiceManager.SHA1(tmpStr, Encoding.UTF8).ToLower();
            StartClass.log.WriteInfo(result);
            return signature == result;
        }
    }
}
