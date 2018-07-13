
/** 
* 通过给定的class解析类名（给定类名则直接返回） 
* @author cuiweiqing  2011-10-9 
* @param  clzss class对象 
* @return 类名 
*/
export function getClassName(clzss: Object) {
    if (typeof clzss == "string") {
        return clzss;
    }
    var s = clzss.toString();
    s = clzss.constructor.toString();
    if (s.indexOf('function') == -1) {
        return null;
    } else {
        s = s.replace('function', '');
        var idx = s.indexOf('(');
        s = s.substring(0, idx);
        s = s.replace(" ", "");
    }
    return s;
}
