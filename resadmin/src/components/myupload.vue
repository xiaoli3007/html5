<template>
	<div id="" style=" margin:0 auto;   text-align: center; ">

		<el-upload ref="upload"  class="upload-demo" name="fileToUpload" drag :action="upload_url"  :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="autoupload"
		 :on-change="handleChange" :on-progress="handleprogress" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
		 :data="updateuserdata" list-type="picture"  multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>选取文件</em></div>
			
			<div class="el-upload__tip" slot="tip">
				添加文件后点击右侧按钮进行上传
				<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
				</div>

		</el-upload>
		
		
		
		


	</div>
</template>

<script>
	import {
		getsiteid
		 
	} from '@/utils/auth'
	import { baseApi } from '@/config'
	import {
		md5
	} from '@/utils/md5'
	import {
		vamp_insert 
	} from '@/api/vamp'
	export default {
		name: "myupload",
		data() {
			return {
				siteid: getsiteid() ? getsiteid() : "1",
				username: this.$store.state.user.name,
				miyao: '38408956',
				updateuserdata: {},
				//文件上传服务器地址，如果在别的Web服务器里，请用绝对地址，例如：
				upload_url: "http://8.131.245.14:8023/upload/video",

				uploadsrv_url: "http://8.131.245.14:8021/upload/document",
				resume_info_url: 'http://8.131.245.14:8021/resume/',
				upload_file_url: 'http://8.131.245.14:8021/upload/video',
				autoupload:false,
				globalimage: baseApi+'/image/file.png',
				 myfileList: [],
				// fileList: [{
				// 	name: 'food.jpeg',
				// 	url: baseApi+'/image/file.png'
				// }, {
				// 	name: 'food2.jpeg',
				// 	url: baseApi+'/image/file.png'
				// } ],

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

			// console.log(md5('11111'))

			let temptime = Date.parse(new Date()) / 1000

			let magic = md5(this.siteid + '_' + this.username + '_' + temptime + '_' + this.miyao).toLowerCase();

			this.updateuserdata = {
				"siteid": this.siteid,
				"username": this.username,
				"addtime": temptime,
				"magic": magic
			}

			// fileid
		},
		methods: {
			
			my_http_request(file){
				console.log('my_http_request----')
				console.log(file)
				console.log('my_http_request----')
			},
			handleChange(file, fileList) {
				console.log('handleChange----')
				console.log(file)
				let fid = this.getFileId(file.raw);

				this.updateuserdata.fileid = fid
				console.log(fid)
				console.log('handleChange----')
			},

			handleprogress(event, file, fileList) {
				console.log('handleprogress----')
				console.log(event)
				console.log(file)
				console.log('handleprogress---')
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleAvatarSuccess(res, file,fileList) {
					console.log('handleAvatarSuccess----')
				
				 console.log(res)
				 
				//  let imageitem = {"name":res.files[0].name,"url":this.globalimage}
				// console.log(imageitem)
				//  this.myfileList.push(imageitem)
				if(res.result == "success"){
					
					
					let uploaditem = JSON.stringify(res.files[0])
					const params = {
						resparams: uploaditem,
						userid: this.$store.state.user.userid,
						siteid: this.siteid
					}
					
					vamp_insert(params).then(
						response => {
							console.log(response)
							
							// _g.toastMsg('success', '编辑成功！', this)
						})
						
				}else{
					console.log(res)
				}
				
				
				let v={'value':'update'}
				this.$emit("passtoparent", v)
				console.log('handleAvatarSuccess----')
				
			},
			beforeAvatarUpload(file) {
				// const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 20000;

				// if (!isJPG) {
				//   this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				if (!isLt2M) {
					this.$message.error('上传大小不能超过 20g!');
				}
				return isLt2M;
			},
			//简单的Cookie帮助函数
			setCookie(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				var expires = "expires=" + d.toGMTString();
				document.cookie = cname + "=" + cvalue + "; " + expires;
			},

			getCookie(cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i].trim();
					if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
				}
				return "";
			},
			getFileId(file) {
				//给浏览器授予一个唯一的ID用于区分不同的浏览器实例（不同机器或者相同机器不同厂家的浏览器）
				var clientid = this.getCookie("HUAYIUPLOAD");
				// var clientid = {};
				if (clientid == "") {
					//用一个随机值来做浏览器的ID，将作为文件HASH值的一部分
					var rand = parseInt(Math.random() * 1000);
					var t = (new Date()).getTime();
					clientid = rand + 'T' + t;

					this.setCookie("HUAYIUPLOAD", clientid, 365);
				}

				var info = clientid;
				if (file.lastModified)
					info += file.lastModified;
				if (file.name)
					info += file.name;
				if (file.size)
					info += file.size;
				//https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js
				var fileid = md5(info).toLowerCase();
				return fileid;
			},
		}
	}
</script>
<style lang="scss" scoped>
	.row {
		margin-bottom: 10px;
	}
	// .el-upload-list{
	// 	overflow: auto;
	// }
</style>
