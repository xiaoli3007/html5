<template>
<div id="" style="">
	<div class="container">
	  <form id="form1" enctype="multipart/form-data" method="post" action="Upload.aspx">
	    <input type="hidden" name="filecount" value="1" />
	    <input type="hidden" name="uploadway" value="ajax" />
	    <div class="row">
	      <label for="fileToUpload">Select a File to Upload</label><br />
	      <input type="file" name="fileToUpload" id="fileToUpload" v-on:change="fileSelected();"/>
	    </div>
	    <div id="fileName"></div>
	    <div id="fileSize"></div>
	    <div id="fileType"></div>
	    <div class="row">
	      <input type="button" v-on:click="uploadFile()" value="Upload" />
	    </div>
	    
	    <div id="progresswrap">
	      <div id="uploadProgress" class="progressbar">
	        <div class="progress bar">
	        </div>
	        <span class="text">
	          0%
	        </span>
	      </div>
	      <div id="uploadStatusBar" class="statustext">
	        <span>总长度：</span><span class="total"></span>
	        <span>已经传输：</span><span class="finish" style="width:80px"></span>
	        <span>传输率：</span><span class="bitrate" style="width:80px"></span>
	      </div>
	    </div>
	    
	    <div id="progressNumber">
	      
	    </div>
	  </form>
	</div>
	 
	  
  </div>
</template>

<script>
	// import E from "wangeditor";
	import {
		 md5
	} from '@/utils/md5'
	export default {
	  name: "myuploadeasy",
	  data() {
		return {
			
			 progressBar : null,
			 oldTimestamp : 0,
			 oldLoadsize : 0,
			 //文件上传服务器地址，如果在别的Web服务器里，请用绝对地址，例如：
			 upload_url :  "http://8.131.245.14:8023/upload/video",
			 HUAYI : {},
	      editor: null,
	      editorContent: '',
		   uploadsrv_url :  "http://8.131.245.14:8021/upload/document",
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
		 
		 this.HUAYI.ProgressBar = function (id,statusID) {
		   var getById = function(id) {
		     return typeof id === "string" ? document.getElementById(id) : id;
		   },
		   getByClass = function(sClass, oParent) {
		     var aClass = [];
		     var reClass = new RegExp("(^| )" + sClass + "( |$)");
		     var aElem = getByTagName("*", oParent);
		     for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		     if (aClass.length == 0) aClass[0] = null;
		     return aClass;
		   },
		   getByTagName = function(elem, obj) {
		     if (obj) return obj.getElementsByTagName(elem);
		     else return document.getElementsByTagName(elem);
		   };
		   
		   var progressBar = getById(id);
		   var progress = getByClass("progress",progressBar)[0];
		   var progressText = getByClass("text",progressBar)[0];
		   
		   var total,finish,bitrate;
		   if (statusID ) {
		     var statusBar = getById(statusID);
		     total = getByClass("total",statusBar)[0];
		     finish = getByClass("finish",statusBar)[0];
		     bitrate = getByClass("bitrate",statusBar)[0];
		   }
		   
		   return {
		     _progress:progress,
		     _text:progressText,
		     _total:total,
		     _finish:finish,
		     _bitrate:bitrate,
		   
		     setProgress: function(value) {
		   	if (this._progress) {
		   	  this._progress.style.width = value + '%';
		   	}
		   	if (this._text) {
		   	  this._text.innerHTML = value + '%';
		   	}
		     },
		     setTotal: function(value) {
		   	this._total.innerHTML = value;
		     },
		     setStatus:function(finish,bitrate) {
		   	if (this._bitrate) {
		   	  this._bitrate.innerHTML = bitrate;
		   	}
		   	if (this._finish) {
		   	  this._finish.innerHTML = finish;
		   	}
		     }
		   }
		 };
	   
	},
	methods:{
	   
	  fileSelected() {
	   	var file = document.getElementById('fileToUpload').files[0]
	   	if (file) {
	   	  var fileSize = 0;
	   	  if (file.size > 1024 * 1024)
	   		fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	   	  else
	   		fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
	   
	   	  document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
	   	  document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
	   	  document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
	   	}
	  },
	  uploadFile() {
	   	var file = document.getElementById('fileToUpload').files[0]
	   	if (!file) {
	   	  return;
	   	}
	   	
	   	var fileSize = 0;
	   	if (file.size > 1024 * 1024)
	   	  fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	   	else
	   	  fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
	   	
	   	
	   	if (!this.progressBar) {
	   	  this.progressBar = this.HUAYI.ProgressBar('uploadProgress','uploadStatusBar');
	   	  
	   	}
	   	
	   	if (this.progressBar) {
	   	  this.progressBar.setProgress(0);
	   	  
	   	  this.progressBar.setTotal(fileSize);
	   	}
	   	
	    var myForm = document.getElementById("form1");  
	   	var fd = new FormData(myForm);
	   	//fd.append("filecount", "1");
	   	fd.append("callback", "");
	   	fd.append("uploadway", "ajax");
		
	   	fd.append("siteid", "1");
	   	fd.append("username", "master");
		
		
	   	fd.append("addtime", Date.parse(new Date())/1000);
		
	   	let magic ="38408956";
	   	fd.append("magic", magic);
		
	      // fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]); //
	   	var xhr = new XMLHttpRequest();
	   	xhr.upload.addEventListener("progress", this.uploadProgress, false);
	   	xhr.overrideMimeType("application/octet-stream"); 
	   	xhr.addEventListener("load", this.uploadComplete, false);
	   	xhr.addEventListener("error", this.uploadFailed, false);
	   	xhr.addEventListener("abort", this.uploadCanceled, false);
	   	xhr.open("POST", this.upload_url ,true);
	   	xhr.send(fd);
	   	this.oldTimestamp = (new Date()).valueOf();
	   	//setTimeout(function () {
	   	//  
	   	//},500);
	     },
	   
	  uploadProgress(evt) {
	   	if (evt.lengthComputable) {
	   	  var percentComplete = Math.round(evt.loaded * 100 / evt.total);
	   	  document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
	   	  this.progressBar.setProgress(percentComplete);
	   	  
	   	  var timestamp = (new Date()).valueOf();
	   	  if (timestamp > this.oldTimestamp) {
	   		var duration = timestamp - this.oldTimestamp;
	   		if (duration > 500) {
	   		  var size = evt.loaded - this.oldLoadsize;
	   		  
	   		  //if (size > 1048576)
	   		  //  fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	   		  //else
	   		  //  fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
	   		  
	   		  var bitrate = size * 8 * 1000/ duration /1024; //kbps
	   		  if (bitrate > 1000)
	   			bitrate = Math.round(bitrate / 1000) + 'Mbps';
	   		  else
	   			bitrate = Math.round(bitrate) + 'Kbps';
	   		  
	   		  var finish = evt.loaded;
	   		  
	   		  if (finish > 1048576)
	   			finish = (Math.round(finish * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	   		  else
	   			finish = (Math.round(finish * 100 / 1024) / 100).toString() + 'KB';
	   		  
	   		  this.progressBar.setStatus(finish,bitrate);
	   		  
	   		  this.oldTimestamp = timestamp;
	   		  this.oldLoadsize = evt.loaded;
	   		}
	   	  }
	   	}
	   	else {
	   	  document.getElementById('progressNumber').innerHTML = 'unable to compute';
	   	}
	  },
	   
	 uploadComplete(evt) {
	   	this.progressBar.setProgress(100);
	   	/* This event is raised when the server send back a response */
	   	console.log(evt.target.responseText);
		
		let result = JSON.parse(evt.target.responseText);
		
			console.log(result);
	   },
	   
	 uploadFailed(evt) {
	   	console.log("There was an error attempting to upload the file.");
	  }
		 
		 ,
	   
	   uploadCanceled(evt) {
	   	console.log("The upload has been canceled by the user or the browser dropped the connection.");
	     }
	     
	    
		 
	     
	}
}
</script>
<style lang="scss" scoped>

  .container {
  	width:602px;
  	margin-left:auto;
  	margin-right:auto;
  }
  
  #progresswrap {
    width:600px;
    height:44px;
    border:1px solid #ddd;
    padding:5px 5px;
  }
  .progressbar {
     position:relative;
     margin-left:0;
     margin-right:0;
     height:20px;
     border:1px solid #ccc;
     padding:0;      
  }
  
  .statustext {
    margin-top:0;
    
    margin-left:0;
    margin-right:0;
    height:20px;
    padding:2px 10px;
    line-height:20px;
  }
  
  .progress {
  	position:relative;
  	float:left;
  	height:100%;
  	width:80%;
  	background-color:#ccf;
  }
  
  
  .progress.bar {
    float: left;
    width: 0;
    height: 100%;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
    background-color: #0e90d2;
    background-image: -moz-linear-gradient(top, #149bdf, #0480be);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#149bdf), to(#0480be));
    background-image: -webkit-linear-gradient(top, #149bdf, #0480be);
    background-image: -o-linear-gradient(top, #149bdf, #0480be);
    background-image: linear-gradient(to bottom, #149bdf, #0480be);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff149bdf', endColorstr='#ff0480be', GradientType=0);
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    -moz-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: width 0.6s ease;
    -moz-transition: width 0.6s ease;
    -o-transition: width 0.6s ease;
    transition: width 0.6s ease;
  }
    
  .progress:after {
    clear:both;
  }
  
  .progress-text {
    z-index:100;
    position:relative;
    height:100%;
    line-height:100%;
    color:#f00;
    margin-left:auto;
    margin-right:auto;
    max-width:5em;
  }
  
  .progressbar span.text { 
  	width: 100%;
  	height: 20px;
  	line-height: 20px;
  	text-align: center;
  	display: inline-block;
  	z-index: 100;
  	position: absolute;
  	left: 0;
  	top: 0;
  }
  
  .statustext span {
    margin-left:10px;
    display:block;
    float:left;
    height:20px;
    line-height:20px;
    min-width:30px;
    font-size: 13px;
  }
  
  .row {
  	margin-bottom:10px;
  }

</style>
