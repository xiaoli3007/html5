<template>
	<div class="list">
	<div style="  width: 80%; margin: 300px auto;"  v-if="jindu_show">
	<van-progress :percentage="jindu" stroke-width="8" />
	</div>
		<div id="container" style=""></div>


	</div>



</template>

<script>
	
	import {
		media_frequency,media_detail
	} from '@/api/base'
	
	import * as Three from 'three'
	import {
		MeshPhysicalMaterial,
		MeshLambertMaterial
	} from "three/build/three.module.js";
	import {
		GLTFLoader
	} from "three/examples/jsm/loaders/GLTFLoader"
	// 导入轨道模型控制器
	import {
		OrbitControls
	} from "three/examples/jsm/controls/OrbitControls"


	import {
		Toast
	} from 'vant';

	export default {

		data() {
			return {
				playurl:"static/3d/SimpleSkinning.gltf",
				catid:0,
				news_id:0,
				media_id:0,
				jindu:0,
				jindu_show:true,
				loadurl:false,
				mesh: null,
				camera: null,
				scene: null,
				renderer: null,
				controls: null
				// camera: null,
				// scene: null,
				// renderer: null,
				// mesh: null,
			}
		},
		created() {
			this.$loading.show()
			this.catid = this.$route.query.catid
			this.news_id = this.$route.query.news_id
			this.media_id = this.$route.query.media_id
			
		},
		mounted() {
			
			this.onPlayerLoadeddata()
			// this.init()
			// this.render()
			  
				// this.initScene()
				// this.initModelContainer()
				// this.loadModel()
				// this.initCamera()
				// this.createLight()
				// this.initRenderer()
				// this.initControls()
				// this.render2()
			 
			// this.$nextTick(() => {
			//   document.getElementById('id').addEventListener('your event', () => {

			//   })
			// })

			 window.addEventListener('resize', this.onWindowResize)

		},
		methods: {
			onPlayer_media_frequency() {
				console.log(' onPlayer_media_frequency!')

					let params = {
						catid: this.catid,
						news_id: this.news_id,
						media_id: this.media_id,
						userid: this.$store.state.user.userid,
					}
				console.log(params)
				media_frequency(params).then(response => {
					console.log(response)
				})
				
			},
			onPlayerLoadeddata() {
				console.log('onPlayerLoadeddata!')
			 
					let params = {
						catid: this.catid,
						news_id: this.news_id,
						media_id: this.media_id,
						userid: this.$store.state.user.userid,
					}
				
				media_detail(params).then(response => {
					console.log(response.meidia_info['playurl'])
					this.playurl = response.meidia_info['playurl']
					// this.loadurl = true
					 this.$loading.hide() 
					 this.initload()
					 this.onPlayer_media_frequency()
				})
				
			},
			initload(){
				this.initScene()
				this.initModelContainer()
				this.loadModel()
				this.initCamera()
				this.createLight()
				this.initRenderer()
				this.initControls()
				this.render2()
			},
			onWindowResize() {

				this.camera.aspect = window.innerWidth / window.innerHeight;
				this.camera.updateProjectionMatrix();

				this.renderer.setSize(window.innerWidth, window.innerHeight);



			},
			loadModel() {

				let that = this

				// gltf模型加载器

				let loader = new GLTFLoader()

				return new Promise(function(resolve, reject) {

					loader.load(

						// 模型在 /public/static/building/文件夹下

						that.playurl,
						//"static/3d/SimpleSkinning.gltf",

						gltf => {

							console.log(gltf)

							 gltf.scene.traverse(object => {

							// 	// 修改模型材质

							 	  // let material = new Three.MeshDepthMaterial( { color: 0x2194CE } );

							 	  // object.material = material

							 })

						 
							
							let group = new Three.Group()

							group.add(gltf.scene)

							let box = new Three.Box3()

							box.setFromObject(group)

							let wrapper = new Three.Object3D()

							wrapper.add(group)

							// 根据自己模型的大小设置位置

							 wrapper.position.set(0, 0, 0)

							// 将模型加入到场景中 ! important

							that.scene.add(wrapper)
							
						},

						xhr => {

							// 模型加载期间的回调函数

							console.log((xhr.loaded / xhr.total * 100) + '% loaded');
							that.jindu = Math.ceil(xhr.loaded / xhr.total * 100)
							if(that.jindu==100){
								that.jindu_show = false
								
							}

						},

						error => {

							// 模型加载出错的回调函数

							console.log("error while loading", error);

							reject("load model error", error);

						}

					)

				})

			},
			initModelContainer() {

				this.model_container = document.getElementById("container");

				this.model_container.style.height = window.innerHeight + "px";

				this.model_container.style.width = window.innerWidth + "px";

				this.height = this.model_container.clientHeight;

				this.width = this.model_container.clientWidth;

			},

			initScene() {

				this.scene = new Three.Scene();

			},



			initCamera() {

				// 照相机

				// this.camera = new Three.PerspectiveCamera(70, this.width / this.height, 0.25, 10000);
				// // console.log(this.width)
				// // console.log(this.height)
				//   this.camera.position.set(500, 0, 100);

				// PerspectiveCamera( fov, aspect, near, far )
				this.camera = new Three.PerspectiveCamera(50, this.width / this.height, 0.25, 10000)
				this.camera.position.set(500, 150, 150) // 设置相机位置

				//this.camera.lookAt(new Three.Vector3(10, 40, 0)) // 设置相机方向
				// this.scene.add(this.camera)

			},

			initRenderer() {

				this.renderer = new Three.WebGLRenderer({
					antialias: true,
					alpha: true
				});

				this.renderer.setSize(this.width, this.height);

				// 兼容高清屏幕

				this.renderer.setPixelRatio(window.devicePixelRatio);

				// 消除canvas的外边框

				this.renderer.domElement.style.outline = "none";

				this.renderer.shadowMap.enabled = true // 显示阴影
				this.renderer.shadowMap.type = Three.PCFSoftShadowMap
				// this.renderer.setClearColor(0x3f3f3f, 1) // 设置背景颜色

				this.model_container.appendChild(this.renderer.domElement);

			},

			render2() {
				// if (this.mesh) {
				//   this.mesh.rotation.z += 0.006
				// }
				 // console.log(1111)
				this.renderer.render(this.scene, this.camera)
				requestAnimationFrame(this.render2)
			},
			initControls() {

				this.orbitControls = new OrbitControls(

					this.camera,

					this.renderer.domElement

				);

				// 惯性

				this.orbitControls.enableDamping = true;

				// 动态阻尼系数

				this.orbitControls.dampingFactor = 0.25;

				// 缩放

				this.orbitControls.enableZoom = true;

				// 右键拖拽

				this.orbitControls.enablePan = true;

				// 水平旋转范围

				// this.orbitControls.maxAzimuthAngle = Math.PI / 6;

				// this.orbitControls.minAzimuthAngle = -Math.PI / 6;

				// // 垂直旋转范围

				// this.orbitControls.maxPolarAngle = Math.PI / 6;

				// this.orbitControls.minPolarAngle = -Math.PI / 6;

			},

			// 创建光源
			createLight() {
				// 环境光
				const ambientLight = new Three.AmbientLight(0xffffff, 0.1) // 创建环境光
				this.scene.add(ambientLight) // 将环境光添加到场景

				const spotLight = new Three.SpotLight(0xffffff) // 创建聚光灯
				spotLight.position.set(150, 150, 150)
				spotLight.castShadow = true
				this.scene.add(spotLight)
			},

			goto3d() {
				this.$router.replace({
					name: 'demo3d',
					query: {

					}
				})
			},


		},
	}
</script>

<style scoped lang="less">
	.list {
		height: 100%;
		width: 100%;

	}
</style>
