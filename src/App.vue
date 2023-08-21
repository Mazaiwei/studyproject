<template>
  <div id="app">
    <nav v-show="this.$route.meta.show">
      <router-link to="/">
        <img v-if="page!='/'" src="./assets/imgs/position.svg" alt="">
        <img v-else src="./assets/imgs/position-active.svg" alt="">
        <p>岗位</p>
      </router-link>
      <router-link to="/company">
        <img v-if="page!='/company'" src="./assets/imgs/company.svg" alt="">
        <img v-else src="./assets/imgs/company-active.svg" alt="">
        <p>公司</p>
      </router-link>
      <router-link to="/news">
        <img v-if="page!='/news'" src="./assets/imgs/news.svg" alt="">
        <img v-else src="./assets/imgs/news-active.svg" alt="">
        <p>消息</p>
      </router-link>
      <router-link to="/my">
        <img v-if="page!='/my'" src="./assets/imgs/my.svg" alt="">
        <img v-else src="./assets/imgs/my-active.svg" alt="">
        <p>我的</p>
      </router-link>
    </nav>
    <router-view :collectionList="collectionList"
    :collectionCompanyList ="collectionCompanyList"
    @editCollectionList="editCollectionList"
    @editCollectionCompanyList="editCollectionCompanyList" 
    @getUserInfo="getUserInfo" 
    @changeRecentChats="changeRecentChats" 
    @changeState="changeState"
    @changeUserInfo="changeUserInfo"
    @changeChatList="changeChatList"
    @changeNickName="changeNickName"
    @changePic="changePic"
    :userInfo="userInfo"
    :chatInfo="chatList[0]?.postionInfo"
    :chatList="chatList"></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return{
      page:this.$route.path,
      userInfo:null,
      chatList:[],
      collectionList:[],
      collectionCompanyList:[]
    }
  },
  watch:{
    $route(to){
      this.page = to.path
    },
  },
  mounted(){
    if(!sessionStorage.getItem('collectionList')){
      sessionStorage.setItem('collectionList',[])
    }else{
      this.collectionList = JSON.parse(sessionStorage.getItem('collectionList'))
    }
    if(!sessionStorage.getItem('collectionCompanyList')){
      sessionStorage.setItem('collectionCompanyList',[])
    }else{
      this.collectionCompanyList = JSON.parse(sessionStorage.getItem('collectionCompanyList'))
    }
  },
  methods:{
    getUserInfo(info){
      this.userInfo = {
        age:23,
        handsOnBackground:'1年',
        education:'本科',
        sex:'女',
        advantages:'',
        expectation:{
          addr:'广州',
          industry:'互联网/IT/电子/通信',
          occupation:'前端开发',
          wages:'15~20k/月'
        },
        picUrl:'	https://yw.52kfw.cn/uploads/user_default.jpeg',
        experience:'',
        state:'离校-随时到岗',
        ...info
      }
    },
    changeRecentChats(info){
      let hour = new Date().getHours();
      let min = new Date().getMinutes();
      let h = hour < 10? '0'+ hour:hour
      let m = min < 10? '0'+ min:min
      let time = h + ':' + m
      
      this.chatList.forEach((el,i)=>{
        if(el.postionInfo.companyId == info.companyId){
           this.chatList.splice(i,1)
        }
      })

      this.chatList = [{
        time,
        postionInfo:info,
        chatContent:[
          {
            id:info._id,
            role:"company",
            text:'请问还在考虑新的工作机会吗?'
          }
        ]
      },...this.chatList]
    },
    editCollectionList(p){
      if(p.collected){
        this.collectionList = [p,...this.collectionList]
        sessionStorage.setItem('collectionList',JSON.stringify(this.collectionList))
      }else{
        this.collectionList.forEach((el,index)=>{
          if(el.id==p.id){
            this.collectionList.splice(index,1)
          }
        })
        sessionStorage.setItem('collectionList',JSON.stringify(this.collectionList))
      }
    },
    editCollectionCompanyList(c){
      if(c.collected){
        this.collectionCompanyList = [c,...this.collectionCompanyList]
        sessionStorage.setItem('collectionCompanyList',JSON.stringify(this.collectionCompanyList))
      }else{
        this.collectionCompanyList.forEach((el,index)=>{
          if(el.id==c.id){
            this.collectionCompanyList.splice(index,1)
          }
        })
        sessionStorage.setItem('collectionCompanyList',JSON.stringify(this.collectionCompanyList))
      }
    },
    changeUserInfo(i){
      this.userInfo.identity = i.identity
      this.userInfo.age = i.age
      this.userInfo.education = i.education
      this.userInfo.handsOnBackground = i.handsOnBackground
      this.userInfo.sex = i.sex
      this.userInfo.advantages = i.advantages
      this.userInfo.expectation.addr = i.addr
      this.userInfo.expectation.industry = i.industry
      this.userInfo.expectation.occupation = i.occupation
      this.userInfo.expectation.wages = i.wages
      this.userInfo.experience = i.experience
    },
    changeState(state){
      this.userInfo.state = state
    },
    changePic(url){
      this.userInfo.picUrl = url
    },
    changeNickName(name){
      this.userInfo.identity = name
    },
    changeChatList(content){
      // console.log(content);
      this.chatList.forEach((el,index) => {
        if(el.postionInfo._id==content.id){
          // console.log(el.time);
          this.chatList[index].chatContent = [...this.chatList[index].chatContent,content]
        }
      })
    }
  }

};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  border-top: 0.5px solid rgba($color: #000000, $alpha: 0.1);
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 98px;
  align-items: center;
  z-index: 100;
  a {
    height: 100%;
    color: var(--nav-gray);
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 38px;
      height: 38px;
    }
    p{
      font-size: 23px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      margin-top: 12px;
      // color: #149639;
    }
    &.router-link-exact-active {
      color: var(--nav-active);
    }
  }
}
</style>
