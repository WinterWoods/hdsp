using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityInfos
{
    public class MessageInfo:Basic
    {
        public string Message { get; set; }
        private DateTime sendTime = DateTime.Now;
        public string User_Key { get; set; }
        public string Org_Key { get; set; }
        public MessageType Type
        {
            get
            {
                return type;
            }

            set
            {
                type = value;
            }
        }

        public DateTime SendTime
        {
            get
            {
                return sendTime;
            }

            set
            {
                sendTime = value;
            }
        }

        private MessageType type = MessageType.String;
    }
    public enum MessageType
    {
        String,Pic
    }
}
