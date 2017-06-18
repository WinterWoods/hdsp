export default class stores {
    static subscriptionsFun = null;
    static states = {
            testStr: "初始值"
        } //建议列出所有的状态
    static dispatch() {
        stores.subscriptionsFun ? stores.subscriptionsFun(stores.states) : null;
    }
    static subscriptions(fun) {
        stores.subscriptionsFun = fun;

    }
}