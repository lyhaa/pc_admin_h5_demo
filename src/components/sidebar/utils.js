export function getPropertyVal(obj, keys, defVal){
    if(keys.indexOf('.') != -1){
        var result = obj || {},
        i = 0;
        var paths = keys.split('.');
        while (i < paths.length) {
            result = result[paths[i]];
            if (result === undefined) {
                return '';
            }
            i++
        }
        return result;
    }else{
        return obj[keys] || defVal
    }
}