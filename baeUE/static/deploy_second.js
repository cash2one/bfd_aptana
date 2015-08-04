/* *****************************************************************
 * *****************************************************************
 *                  初始化编辑站点页面
 * *****************************************************************
 * *****************************************************************
 */
$(document).ready(function(){
	getCode("index");
});
function getCode(name)
{
	var params = {
			name:name
    	    
    };
	$.ajax({
        url: "../../down/downloadOneCode.action",
        
        data: params,
        type: "POST",
        dataType: "JSON",
        success: function (data) {
        	$("#deploy_code1").val(data.code1);
        	$("#deploy_code2").val(data.code2);
        	$("#deploy_code3").val(data.code3);
        	$("#deploy_code4").val(data.code4);
        	$("#deploy_code5").val(data.code5);
        	$("#deploy_code6").val(data.code6);
			ZeroClipboard.setMoviePath('../../resources/ZeroClipboard/ZeroClipboard.swf')
			$('.ts').each(function(i){
				var clip = new ZeroClipboard.Client();
				clip.glue($(this).find('a')[0]);
				clip.setText(data['code'+(i+1)])
				console.info('code'+(i+1))
				console.info(data['code'+(i+1)])
				clip.addEventListener('complete', function(client, text) {
										                alert("已复制");
			            });
			})
        },
        error: function (data) {alert("获取部署代码异常!"); },
        beforeSend: function () { }
    });
}




