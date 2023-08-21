import Vue from 'vue'
import VueRouter from 'vue-router'
import PositionView from '../views/PositionView.vue'
import CompanyView from '../views/CompanyView.vue'
import NewsView from '../views/NewsView.vue'
import MyView from '../views/MyView.vue'
import LoginView from '../views/LoginView.vue'
import PositionDetailView from '../views/PositionDetailView.vue'
import CompanyDetailView from '../views/CompanyDetailView.vue'
import ChatView from '../views/ChatView.vue'
import MyCollectionView from '../views/MyCollectionView.vue'
import SearchResView from '../views/SearchResView.vue'
import PersonalInfoView from '../views/PersonalInfoView.vue'
import EditView from '../views/EditView.vue'
import MyOtherView from '../views/MyOtherView.vue'
import HotNewPosView from '../views/HotNewPosView.vue'
import AboutResumeView from '../views/AboutResumeView.vue'
import HelpView from '../views/HelpView.vue'
import OnlineResumeView from '../views/OnlineResumeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'position',
    component: PositionView,
    meta: {    
      show: true               
    }
  },
  {
    path: '/company',
    name: 'company',
    component: CompanyView,
    meta: {    
      show: true               
    }
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView,
    meta: {    
      show: true               
    }
  },
  {
    path: '/my',
    name: 'my',
    component: MyView,
    meta: {    
      show: true               
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/posDetail/:workid',
    name: 'posDetail',
    component: PositionDetailView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/companyDetail/:companyid',
    name: 'companyDetail',
    component: CompanyDetailView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/chat/:_id',
    name: 'chat',
    component: ChatView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/myCollection',
    name: 'myCollection',
    component: MyCollectionView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/search/:type',
    name: 'search',
    component: SearchResView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/personalinfo',
    name: 'personalinfo',
    component: PersonalInfoView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/edit/:title',
    name: 'edit',
    component: EditView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/myView/:title',
    component: MyOtherView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/hotNew',
    component: HotNewPosView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/aboutResume/:type',
    component: AboutResumeView,
    meta: {    
      show: false               
    }
  },
  {
    path: '/help',
    component: HelpView,
    meta: {    
      show: false               
    }
  },
  {
    path:'/onlineresume',
    component:OnlineResumeView,
    meta: {    
      show: false               
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
