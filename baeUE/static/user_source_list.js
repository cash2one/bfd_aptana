/* *****************************************************************
 * *****************************************************************
 *                  初始化编辑站点页面
 * *****************************************************************
 * *****************************************************************
 */
$(document).ready(function() {
	getList();
	$("#btnSave").click(function(){
		$('#form1').submit();
	});
	/* 设置默认属性 */
	$.validator.setDefaults({
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				url : "../../compaign/save.action",
				type:'POST',
				dataType:'json',
				success: function(data){
					// 成功
					if (data.code == "1") {
						alert("操作成功！");
					} else {
						alert(data.msg);
					}
				},
				error: function(){
					alert("保存失败");//如果提交失败则提示
				}
			});
			return false;
		}
	});
	 // 中文字两个字节       
    $.validator.addMethod("byteRangeLength", function(value, element, param){
            var length = value.length;
            for (var i = 0; i < value.length; i++) {
                if (value.charCodeAt(i) > 127) {
                    length++;
                }
            }
            return this.optional(element) || (length >= param[0] && length <= param[1]);
    }, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");
    
	$('#form1').validate({
		debug : true,
		rules : {
			name : {
				required : true,
				byteRangeLength : [ 1, 30 ]
			},
			url: {
                required: true,
                url: true
            },
			source_name : {
				required : true,
				byteRangeLength : [ 1, 30 ]
			}
			

		},
		messages : {
			name : {
				required : "请输入活动名称",
				byteRangeLength : "活动名称必须在1-30个字符之间"
			},
			source_name : {
				required : "请输入来源名称",
				byteRangeLength : "站外投放的通路/来源名称，如谷歌、微博等，不超过20个字符"
			},
			url : {
			required : "请填写域名",
			url:"请输入正确的域名格式"
		}
		},
		focusInvalid : true,
		keyup : false,
		errorPlacement : function(error, element) {
			error.appendTo(element.parent().next().find('div:first'));
		}
	});
});
function getList() {
	
	$
			.ajax({
				url : "../../compaign/list.action",
				type : "POST",
				dataType : "JSON",
				success : function(data) {
					var list = data;
					var sbuild = new $.StringBuilder();
					$.each(
									list,
									function(i, item) {
										sbuild.append('<tr>');
										sbuild
												.append('<td class="hdname"><div class="tb_con">'
														+ item.name
														+ '</div></td>');
										sbuild
												.append('<td class="ty"><div class="tb_con">'
														+ item.type
														+ '</div></td>');
										sbuild
												.append('<td class="ty"><div class="tb_con">'
														+ item.source_name
														+ '</div></td>');
										sbuild
												.append('<td class="link"><div class="tb_con">'
														+ item.url
														+ '</div></td>');
													
										sbuild.append('<td class="operate02"><div class="tb_con"><a href="#">复制</a>|<a href="#" onclick="updateSource(\''+ item.id+ '\')">设置</a>|<a href="#" onclick="deleteSource(\''+ item.id+ '\')">删除</a></div></td>');
										sbuild.append('</tr>');
									});
					$("#table_list").html(sbuild.toString());
                     $("#table_list > tr").each(function(){
					 	var oprates=$(this).find('td:last')	
						var clip = new ZeroClipboard.Client();
										clip.glue(oprates.find('div > a:first')[0]);
										clip.setText(oprates.prev().find('div').html());
										clip.addEventListener('complete', function(client, text) {
							                alert("已复制");
							            });
					 })
				},
				error : function(data) {
					pAlert("error", "获取列表异常!");
				},
				beforeSend : function() {
				}
			});
}

function deleteSource(id) {
	var params = {
		id : id

	};
	$.ajax({
		url : "../../compaign/delete.action",
		data : params,
		type : "POST",
		dataType : "JSON",
		success : function(data) {
			// 成功
			if (data.code == "1") {
				alert("删除活动成功！");
				getList();
				
			} else {
				alert(data.msg);
			}
		},
		error : function(data) {
			alert("删除站点异常!");
		},
		beforeSend : function() {
		}
	});

}

function updateSource(id) {
	document.location.href = "./user_source_add.html?id="+id;

}
