/**
 * @author Administrator
 */
$(function(){
	var imageurl
	var option={
	        swf           : '../../resources/uploadify/uploadify.swf',
			'fileObjName' : 'file',
	        uploader      : '../../ContentManager/content/!uploadSettingImage',//上传图片url
	        
	        'buttonText': '',
	        'hideButton': true,
	        multi:false,
			'fileTypeExts' : '*.gif; *.jpg; *.png',
			'fileSizeLimit' :  '2MB',
			formData:sessionData,
			'onSelect' : function(file){
				$('#textfield').val(file.name)
			},
			errorHandle:function(msg){
				$.ifmWidget("alertFail",{
		    		title:'上传错误',
		    		content:msg
		    	})
			},
			onUploadError:function(){
				$('#textfield').val('')
			},
			onUploadSuccess:function(file, data, response){
//				 $('.upload-pic').append('<img src="'+data+'" style="width:140px;height:140px;"/>')
				 $('.upload-pic img').attr('src',data)
				 $('#sub').addClass('save-btn')
				 imageurl=data
			}
	   }
	$('#file-box').uploadify($.extend(true,{},option,{height:32,width:315}));	
	$('#file-box2').uploadify($.extend(true,{},option,{height:143,width:142}));	
	$('#sub').click(function(){
		if($(this).hasClass('save-btn')){
			$.ifmWidget("loading",{
	    		title:'正在操作',
	    		content:'正在操作...'
			})
			$.post('../../ContentManager/content/!saveSettingImage',{imageurl:imageurl}).done(function(){
				$.ifmWidget("alertSuccess",{
		    		title:'操作成功',
		    		content:'操作成功',
		    		callBack:function(){
		    			$('#sub').removeClass('save-btn')
		    			$('#textfield').val('')
		    		}
		    	})
			})
		}
	})
})
