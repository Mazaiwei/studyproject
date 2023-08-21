import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

// 
import './assets/css/color.css'
// 移动端适配
import "amfe-flexible/index.js";
// vant ui库
import { 
        Button,
        Cell, 
        CellGroup,
        Divider ,
        DropdownMenu,
        DropdownItem,
        Icon ,
        Lazyload ,
        List ,
        NavBar ,
        Picker,
        Popup ,
        PullRefresh ,
        RadioGroup,
        Radio,
        Search ,
        Skeleton ,
        Stepper ,
        Swipe, 
        SwipeItem,
        Tabbar,
        TabbarItem,
        Tag,
        Uploader ,
           } from 'vant';

Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Divider);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Icon)
Vue.use(Lazyload);
Vue.use(List)
Vue.use(NavBar )
Vue.use(Picker);
Vue.use(Popup);
Vue.use(PullRefresh)
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Search);
Vue.use(Skeleton);
Vue.use(Stepper);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag );
Vue.use(Uploader);

Vue.config.productionTip = false






new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// router.beforeEach((to, from, next) => {
//   // console.log(from,to);
//   if (to.meta.title) {
//       document.title = to.meta.title
//   }
//   if(to.name=='my'){
//     let token = sessionStorage.getItem('token');
//     if(!token){
//       console.log('未登录');
//       router.push('/login')
//     }
//   }
//   next()

// })

