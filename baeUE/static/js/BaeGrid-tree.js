/**
 * @discription BaeGrid 树状分级插件
 */
function treeDeep(opt){
    if (opt.param.treeDeep) {
        opt.dom.toggle(function(){
            if (!opt.dom.data('children')) {
                opt.loader.ajaxLoad({
                    url: '/grid/tree_deep_item/',
                    seq: false,
                    treeDeep: false
                }, function(c){
                    opt.dom.after(c.dom)
                    opt.dom.data('children', c.dom)
                })
            }
            else {
                opt.dom.data('children').show()
            }
        }, function(){
            opt.dom.data('children').hide()
        })
    }
}
