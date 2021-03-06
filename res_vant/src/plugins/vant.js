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
import { Slider } from 'vant';
import { Pagination } from 'vant';
import { ImagePreview } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Progress } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { Uploader } from 'vant';
import { Picker } from 'vant';
import { DatetimePicker } from 'vant';
import { Area } from 'vant';
import { Calendar } from 'vant';

Vue.use(Calendar);
Vue.use(Area);
Vue.use(DatetimePicker);
Vue.use(Picker);
Vue.use(Uploader);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Progress);
Vue.use(Collapse);
Vue.use(CollapseItem);
// 全局注册
Vue.use(ImagePreview);
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.use(Pagination);
Vue.use(Slider);
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
