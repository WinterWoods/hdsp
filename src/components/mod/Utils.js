export default class Utils {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    static timeFormat(strdate, fmt) {
        var daytime;
        if (strdate instanceof Date) {
            daytime = strdate;
        }
        else {
            if (strdate == null) return "";
            if (!fmt) fmt = "hh:mm:ss";
            var _time = Date.parse(strdate.replace(/-/g, "/").replace("T", " "));
            daytime = new Date(_time);
        }

        var o = {
            "M+": daytime.getMonth() + 1,                 //月份
            "d+": daytime.getDate(),                    //日
            "h+": daytime.getHours(),                   //小时
            "m+": daytime.getMinutes(),                 //分
            "s+": daytime.getSeconds(),                 //秒
            "q+": Math.floor((daytime.getMonth() + 3) / 3), //季度
            "S": daytime.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (daytime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}