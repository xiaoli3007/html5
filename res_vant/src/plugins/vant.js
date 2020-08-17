// 按需全局引入 vant组件
import Vue from 'vue'
 
import { Button } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Search } from 'vant';
import { NavBar } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Grid, GridItem } from 'vant';
import { List } from 'vant';
import { PullRefresh } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Col, Row } from 'vant';
import { Image as VanImage } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Sticky } from 'vant';
import { Icon } from 'vant';
import { ShareSheet } from 'vant';
import { Divider } from 'vant';

Vue.use(Divider);
Vue.use(ShareSheet);
Vue.use(Icon);
Vue.use(Sticky);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Field);
Vue.use(Form);
Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Grid);
Vue.use(GridItem);	
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
