<template>
    <div class="hot-new">
        <div class="top">
            <van-icon name="arrow-left" @click="goBack" />
            <span>热招新岗位</span>
        </div>
        <div class="content">
            <CompanyInfoCard :companyList="displayList"/>
        </div>
    </div>
</template>

<script>
import {getCompanyTotal,getCompanyList} from '../apis';
import CompanyInfoCard from '@/components/CompanyInfoCard.vue'

export default{
    data(){
        return{
            size:0,
            displayList:null
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)

        }
    },
    mounted(){
        this.axios.get(getCompanyTotal()).then(res=>{
            this.size = res.data.data.total
        }).then(()=>{
            this.axios.get(getCompanyList(1,this.size)).then(res=>{
            this.displayList = res.data.data.list
        })   
        })     
    },
    components:{
        CompanyInfoCard
    }
}
</script>

<style lang="scss" scoped>
.hot-new{
    background-color: var(--bg);
    .top{
        color: #fff;
        width: 100%;
        height: 98px;
        font-size: 36px;
        background-color: var(--nav-active);
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        .van-icon{
            position: absolute;
            left: 30px;
        }
    }
    .content{
        padding: 100px 30px 30px;
    }
}
</style>