
/**
 * @author Administrator
 */
if (typeof jQuery == 'undefined') {
//    var script = document.createElement("script");
//    script.type = "text/javascript";
//    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
//    document.body.appendChild(script);
 $LAB.script('http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js').wait(_jqLoad)
}else{
	_jqLoad()
}
function _jqLoad(){
	   
}

var dataScript = {
    chart: {
		require:[''],
		scr: 'aaa.js',
		method:''
	},
    grid: 'bbb.js',
    map: 'ccc.js'
}

$.ajax({//请求配置
    url: '',
    data: {
        pageID: ''
    },
    dataType: 'json',
    success: function(data){
        $.each(data, function(i, item){
            $LAB
			.script(dataScript[item['type']]['require'])
			.wait()
			.script(dataScript[item['type']]['src'])
			.wait(function(){
               var c= dataScript[item['type']]['method'](item)
				$.ajax({
					data:{cid:item['chart']},
					success:function(data2){
						c.setData(data2)
					}
				})
            })
        })
    }
})
