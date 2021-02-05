<template>
<div id="" style="">
	
	  <div class="container">
	  	<div  id="fileview" class="fileview">
	  		<span class="tiptext">点击选择文件或者将文件拖放到此处。</span>
	  		<input id="file-upload" type="file" name="file">
	  	</div>
	  
	  	<div class="progressbar">
	  		<progress value="0" max="100" id="progressbar" class="control"></progress>
	  		<span id="percent-label" class="text">0%</span>
	  	</div>
	  	<div class="controlbar">
	  		<button v-on:click="doupload();" id="uploadbtn" class="btn-upload">上传</button>
	  		<button v-on:click="upload_clear();" id="upload_clear" class="btn-upload">清空</button>
	  		
	  		<div class="upload-status">
	  			<div class="item"><span class="title">已经上传：</span><span class="value" id="finish">0</span></div>
	  			<div class="item"><span class="title">上传位率：</span><span class="value" id="bitrate">0</span></div>
	  		</div>
	  		<div class="toast" id="toast" style="display:none;">
	  			
	  		</div>
	  	</div>
	  	<div class="upload-result" id="upload-result">
	  		
	  	</div>
	  </div>
	  
	  
  </div>
</template>

<script>
	// import E from "wangeditor";
	export default {
	  name: "myupload",
	  data() {
	    return {
	      editor: null,
	      editorContent: '',
		   resume_info_url : 'http://8.131.245.14:8021/resume/',
		   upload_file_url : 'http://8.131.245.14:8021/upload/video',
	    };
	  },
	 props: {
	 	v_model_field: {
	 		type: String,
	 		default: ''
	 	},
		v_model_name: {
			type: String,
			default: ''
		},
		v_model_val: {
			type: String,
			default: ''
		},
	   },
	  mounted() {
		// console.log(this.v_model_val)
		// this.editorContent = this.v_model_val;
	   
		//   this.$emit("passtoparent", v)
		  
		  //禁止浏览器打开文件的默认行为
		  // document.addEventListener("drop",function(e){  //拖离 
		  // 	e.preventDefault();
		  // });
		  // document.addEventListener("dragleave",function(e){  //拖后放 
		  // 	e.preventDefault();
		  // });
		  // document.addEventListener("dragenter",function(e){  //拖进
		  // 	e.preventDefault();
		  // });
		  // document.addEventListener("dragover",function(e){  //拖来拖去  
		  // 	e.preventDefault();
		  // });
	   
	},
	methods:{
	   //简单的Cookie帮助函数
	//     setCookie(cname,cvalue,exdays)
	//    {
	//      var d = new Date();
	//      d.setTime(d.getTime()+(exdays*24*60*60*1000));
	//      var expires = "expires="+d.toGMTString();
	//      document.cookie = cname + "=" + cvalue + "; " + expires;
	//    },
	   
	//     getCookie(cname)
	//    {
	//      var name = cname + "=";
	//      var ca = document.cookie.split(';');
	//      for(var i=0; i<ca.length; i++) 
	//      {
	//        var c = ca[i].trim();
	//        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	//      }
	//      return "";
	//    },
	//    //
	//    //简单的文件HASH值计算，如果您不是十分考究，应该可以用于产品。
	//    //由于计算文件HASH值用到了多种数据，因此在HYFileUploader系统范围内发生HASH冲突的可能性应该非常小，应该可以放心使用。
	//    //获取文件的ID可以用任何算法来实现，只要保证做到同一文件的ID是相同的即可，获取的ID长度不要超过32字节
	//    //
	//     getFileId (file) 
	//    {
	//        //给浏览器授予一个唯一的ID用于区分不同的浏览器实例（不同机器或者相同机器不同厂家的浏览器）
	//    	var clientid = getCookie("HUAYIUPLOAD");
	//    	if (clientid == "") {
	//    		//用一个随机值来做浏览器的ID，将作为文件HASH值的一部分
	//    		var rand = parseInt(Math.random() * 1000);
	//    		var t = (new Date()).getTime();
	//    		clientid =rand+'T'+t;
	   		
	//    		setCookie("HUAYIUPLOAD",clientid,365);
	//    	}
	   	
	//    	var info = clientid;
	//    	if (file.lastModified)
	//    		info += file.lastModified;
	//    	if (file.name)
	//    		info += file.name;
	//    	if (file.size)
	//    		info += file.size;
	//    	//https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js
	//    	var fileid = md5(info);
	//    	return fileid;
	//    },
	   
	//    toast(msg)
	//    {
	//    	var toastDiv = document.getElementById('toast');
	//    	if (msg) {
	//    		toastDiv.style.display = 'block';
	//    		toastDiv.innerHTML = msg;
	//    	}
	//    	else {
	//    		toastDiv.style.display = 'none';
	//    		toastDiv.innerHTML = '';
	//    	}
	//    },
	//    upload_clear()
	//    {
	//    	fileViewer.innerHTML = oldFileviewHtml;
	//    	currentfile = null;
	//    	if (fileupload.files.length>0) {
	//    		fileupload.value = '';
	//    	}
	//    	window.fileupload = document.getElementById('file-upload');
	//    	fileupload_attach_event();
	//    },
   
	//  fileupload_attach_event() {
	//    	fileupload.addEventListener("change",function (e) {
	//    		if (window.File && window.FileList) {
	//    			if (this.files.length) {
	//    				var file = this.files[0];
	//    				handle_html5_file(file);
	//    			}
	//    		}
	//    		else {
	//    			window.alert('抱歉，你的浏览器不支持FileAPI，请升级浏览器！');
	//    		}
	//    	},false);
	//    }, 
	//    /*
	//    文件上传处理代码
	//    fileObj : html5 File 对象
	//    start_offset: 上传的数据相对于文件头的起始位置
	//    fileid: 文件的ID，这个是上面的getFileId 函数获取的，
	//    */
	//    upload_file(fileObj,start_offset,fileid)
	//    {
	//    	var xhr = new XMLHttpRequest();
	//    	var formData = new FormData();
	   	
	//    	var blobfile;
	   	
	//    	if(start_offset >= fileObj.size){
	//    		return false;
	//    	}
	   	
	//    	var bitrateDiv = document.getElementById("bitrate");
	//    	var finishDiv = document.getElementById("finish");
	//    	var progressBar = document.getElementById('progressbar');
	//    	var progressDiv = document.getElementById('percent-label');
	   
	//    	var oldTimestamp = 0;
	//    	var oldLoadsize = 0;
	//    	var totalFilesize = fileObj.size;
	//    	if (totalFilesize == 0) return;
	   	
	//    	var uploadProgress = function (evt) {
	//    		if (evt.lengthComputable) {
	//    			var uploadedSize = evt.loaded + start_offset; 
	//    			var percentComplete = Math.round(uploadedSize * 100 / totalFilesize);
	   
	//    			var timestamp = (new Date()).valueOf();
	//    			var isFinish = evt.loaded == evt.total;
	   
	//    			if (timestamp > oldTimestamp || isFinish) {
	//    				var duration = timestamp - oldTimestamp;
	//    				if (duration > 500 || isFinish) {
	//    					var size = evt.loaded - oldLoadsize;
	   
	//    					var bitrate = (size * 8 / duration /1024) * 1000; //kbps
	//    					if (bitrate > 1000)
	//    						bitrate = Math.round(bitrate / 1000) + 'Mbps';
	//    					else
	//    						bitrate = Math.round(bitrate) + 'Kbps';
	   
	//    					var finish = evt.loaded + start_offset;
	   
	//    					if (finish > 1048576)
	//    						finish = (Math.round(finish / (1048576/100)) / 100).toString() + 'MB';
	//    					else
	//    						finish = (Math.round(finish / (1024/100) ) / 100).toString() + 'KB';
	   
	//    					progressBar.value = percentComplete;
	//    					progressDiv.innerHTML = percentComplete.toString() + '%';
	//    					bitrateDiv.innerHTML = bitrate;
	//    					finishDiv.innerHTML = finish;
	   
	//    					oldTimestamp = timestamp;
	//    					oldLoadsize = evt.loaded;
	//    				}
	//    			}
	//    		}
	//    		else {
	//    			progressDiv.innerHTML = 'N/A';
	//    		}
	//    	}
	   	
	//    	xhr.onreadystatechange = function(){
	//    　　　　if ( xhr.readyState == 4 && xhr.status == 200 ) {
	//    　　　　　　console.log( xhr.responseText );
	   			   
	//    　　　　}
	//    		else if (xhr.status == 400) {
	   			
	//    		}
	//    　　};
	   
	//    	var uploadComplete = function (evt) {
	//    		progressDiv.innerHTML = '100%';
	//    		currentfile = null;
	//    		upload_start = false;
	   
	//    		var result = JSON.parse(evt.target.responseText);
	//    		if (result.result == 'success') {
	//    			showUploadedFile(result.files[0]);
	//    		}
	//    		else {
	//    			alert(result.msg);
	//    		}
	//    	}
	   
	//    	var uploadFailed = function (evt) {
	//    		if (!currentfile) return;
	//    		if (window.reconnectId) return;
	//    		upload_start = false;
	   		
	//    		toast("检测到网络故障！两秒后尝试重连...");
	   				
	//    		window.reconnectId = window.setTimeout(function() {
	//    			doupload(true);
	//    		},2000);
	//    	}
	   
	//    	var uploadCanceled = function (evt) {
	//    		alert("上传被取消或者浏览器断开了连接！");
	//    	}
	   	
	   	
	//    	//设置超时时间,由于是上传大文件，因此千万不要设置超时
	//    	//xhr.timeout = 20000;
	//    	//xhr.ontimeout = function(event){
	//    　　//　　alert('文件上传时间太长，服务器在规定的时间内没有响应！');
	//    　　//}         
	   
	//    	xhr.overrideMimeType("application/octet-stream"); 
	   
	//    	var filesize = fileObj.size;
	//    	var blob = fileObj.slice(start_offset,filesize);
	//    	var fileOfBlob = new File([blob], fileObj.name);
	//    	//附加的文件数据应该放在请求的前面
	//    	formData.append('filename', fileObj.name);
	//    	formData.append('namefixed', "fixed");
	//    	//必须将fileid信息传送给服务器，服务器只有在获得了fileid信息后才对文件做断点续传处理
	//    	formData.append('fileid', fileid);
	//    	//请将文件数据放在最后的域
	//    	//formData.append("file",blob, fileObj.name);
	//    	formData.append('file', fileOfBlob);
	   	
	//    	xhr.upload.addEventListener("progress", uploadProgress, false);
	   	
	//    	xhr.addEventListener("load", uploadComplete, false);
	//    	xhr.addEventListener("error", uploadFailed, false);
	//    	xhr.addEventListener("abort", uploadCanceled, false);
	//    	xhr.open('POST', upload_file_url);
	//    	//
	//    	xhr.send(formData);
	//    	currentRequest = xhr;
	//    	upload_start = true;
	//    	toast('');
	//    },
	   
	// doupload(bReconnect) {
	//    	if (!currentfile) {
	//    		alert("请选择文件后再试！")
	//    		return false;
	//    	}
	   	
	//    	if (upload_start) {
	//    		alert("文件上传正在进行中，请稍候再点击重复长传！")
	//    		return false;
	//    	}
	   	
	//    	var fileObj = currentfile;
	//    	var fileid = getFileId(fileObj);
	//    	var t = (new Date()).getTime();
	//    	//通过以下URL获取文件的断点续传信息，必须的参数为fileid，后面追加t参数是避免浏览器缓存
	//    	var url = resume_info_url + '?fileid='+fileid + '&t='+t;
	   	
	//    	var ajax = new XMLHttpRequest();
	   	
	//    	ajax.onerror = function (e) {
	//    		if (window.reconnectId) 
	//    			return;
	//    		window.reconnectId = window.setTimeout(function() {
	//    			doupload(true);
	//    		},2000);
	//    	};
	   	
	//    	ajax.onreadystatechange = function () {
	   		
	//    		if(this.readyState == 4){
	//    			if (bReconnect) {
	//    				//目前是重连状态，清除重连标志
	//    				window.reconnectId = 0;
	//    			}
	   		
	//    			if (this.status == 200){
	//    				var response = this.responseText;
	   				
	//    				var result = JSON.parse(response);
	//    				if (!result) {
	//    					alert('服务器返回的数据不正确，可能是不兼容的服务器');
	//    					return;
	//    				}
	//    				//断点续传信息返回的文件对象包含已经上传的尺寸
	//    				var uploadedBytes = result.file && result.file.size;
	//    				if (!result.file.finished && uploadedBytes < fileObj.size) {
	//    					upload_file(fileObj,uploadedBytes,fileid);
	//    				}
	//    				else {
	//    					//文件已经上传完成了，就不要再上传了，直接返回结果就可以了
	//    					showUploadedFile(result.file);
	//    					//模拟进度完成
	//    					//var progressBar = document.getElementById('progressbar');
	//    					//progressBar.value = 100;
	//    				}
	   				
	//    			}else {
	//    				toast('获取文件断点续传信息失败，正在尝试重连...');
	//    			}  
	//    		}
	//    	}
	   
	//    	ajax.open('get',url,true);
	//    	ajax.send(null);
	//    	currentRequest = ajax;
	//    }  
	}
}
</script>
<style lang="scss" scoped>
.container {
	width: 640px;

	margin: 0 auto 0;
	box-sizing: border-box;
	border: 1px solid #ccc;
	padding: 10px 10px;
	border-radius: 2px;
	box-shadow: 1px 1px 50px rgba(0,0,0,.3);
}

.fileview {
	border:3px dashed silver;
	width:100%; 
	height:360px;
	box-sizing: border-box;
	text-align: center;
	position: relative;
	overflow: hidden;
	
}

.fileview .tiptext {
    display: block;
    margin-top: 160px;
}

.fileview input[type=file] {
	position: absolute;
	top: 0;
	right: 0;
	margin: 0;
	opacity: 0;
	-ms-filter: 'alpha(opacity=0)';
	font-size: 300px !important;
	direction: ltr;
	cursor: pointer;
	display: block;
}
.progressbar {
	margin: 5px 0;
	overflow: hidden;
	position: relative;
	padding-right: 40px;
}

.progressbar .control {
	display:block;
	float:left;
	height: 20px;
	width: 100%;
}

.progressbar .text {
	display: block;
	font-size: 14px;
	line-height: 20px;
	width: 40px;
	text-align: center;
	position: absolute;
	right: 0;
	top: 0;
}

.btn-upload {
	padding: 3px 20px;
	border: 1px solid #aaa;
	height: 28px;
	line-height: 20px;
	border-radius: 2px;
	background-color: #f8f8f8;
}

.controlbar {
	overflow: hidden;
	position:relative;
}

.controlbar button {
	float:left;
	margin-right: 10px;
}

.controlbar .upload-status {
	float:right;
	width:400px;
}

.controlbar .upload-status .item{
	width:200px;
	float: left;
}

.file-object {
	border:1px solid #f0f0f0;
	border-radus:2px;
	padding:5px 6px;
	margin-top:5px;
	margin-bottom:5px;
}

.file-object .info-row {
	overflow: hidden;
	position: relative;
	padding-left: 100px;
	padding: 4px 0 4px 100px;
	border-bottom: 1px dotted #ccc;
}

.file-object .info-row span {
	font-size:14px;
	display:inline-block;
}

.file-object .info-row span.rlabel {
	width:100px;
	display: block;
    position: absolute;
    left: 0;
}

.file-object .info-row .rvalue {
    display: block;
    color: #004302;
    overflow: hidden;
    white-space: normal;
    word-break: break-all;
}

.toast {
	position: absolute;
	width: 380px;
	height: 26px;
	line-height:26px;
	padding-left:10px;
	border: 1px solid #932d0d;
	left: 160px;
	top: 0px;
	z-index: 1000;
	background-color: #e39113;
	color: #fff;
}

</style>
