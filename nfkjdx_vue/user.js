import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const HeaderFooter = {
	install:function(Vue){
		Vue.component('Header',Header)
		Vue.component('Footer',Footer)
	}
}
export default HeaderFooter