window.onload = function(){
    xiuxiu.setLaunchVars("nav", "puzzleModel");
    
    xiuxiu.onClose = function(){
        alert(1234);
    }
    xiuxiu.embedSWF("altContent", 2, "100%", "100%");
    xiuxiu.setUploadURL("http://imgkaka.meitu.com/picsave.php");
    xiuxiu.onInit = function(){
        alert('init')
        xiuxiu.loadPhoto(["http://ww1.sinaimg.cn/bmiddle/593e2991jw1eazlsi2b1cj20c80i7q47.jpg", "http://ww1.sinaimg.cn/bmiddle/593e2991jw1eazhrel2xwj20c80ibta3.jpg"], false)
        
    }
    xiuxiu.onUploadResponse = function(data){
        //alert('')
    }
}
