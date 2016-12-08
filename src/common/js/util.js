/**
 * Created by Kunkka on 2016/12/6.
 */
/**
 * 解析url参数
 * @example "?id=12345&a=b"
 * @return Object {id: 12345, a: b}
 */
export function urlParse() {
    // 从url获取到参数字符串
    let url = window.location.search;
    let obj = {};
    // 正则规则
    let reg = /[?&][^?&]+=[^?&]+/g;
    // match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
    let arr = url.match(reg);  // 结果返回 ["?id=12345", "&a=b"]
    if(arr){
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            // decodeURIComponent() 函数可对 dencodeURIComponent() 函数编码的 URI 进行解码。
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}