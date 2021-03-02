/**
 * Created by jiachenpan on 16/11/18.
 */

exports.install = function(Vue, options) {
	// Vue.prototype.packageFunc = function(param) { //全局函数1

	// alert('执行成功1' + param);

	// };

	Vue.prototype.en_text = function(obj) { //全局函数2

		 if(this.$store.state.app.yuzhong=='zn'){
		 	
		 	 return obj
		 }
		let gl_text = this.$store.state.app.global_fanyi_object
		let en_obj = {}
		gl_text.forEach((item,index,array)=>{
		    //执行代码
			// 
			
			for(let key  in obj){
			       console.log(key + '---' + obj[key])
				   if(obj[key] == item.zn){
					   en_obj[key] = item.en
				   }
			  }
		})
		
		console.log(en_obj)
		// let c = {
		// 	'text_look': 'look',
		// 	'text_test': 'test'
		// }
		return en_obj
	};

}
