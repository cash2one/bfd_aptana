define(['store'], function (store) {
 
    return function (name) {
        
        return {

            // 存储记录 @param { String } 存储对象
            saveLocal: function (r) {
				r = (typeof r === 'object') ? r : JSON.parse(r);
                store.set(name, r);
            },
            //读取记录
            loadLocal: function () {
                var ret = store.get(name);
                return (ret instanceof Array) ? ret : [];
            },
            //删除全部
            removeAll: function () {
                store.remove(name)
            }

        }
            
    }
 
})