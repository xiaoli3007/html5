import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import flexView from "@/components/flexView.vue";

const HeaderFooter = {
	install:function(Vue){
		Vue.component('Header',Header)
		Vue.component('Footer',Footer)
		Vue.component('flexView',flexView)
	}
}
export default HeaderFooter