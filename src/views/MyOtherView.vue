<template>
    <div class="my-other">
        <div class="top">
            <van-icon name="arrow-left" @click="goBack" />
            <span class="title" v-if="currentPage=='follow'">关注公司</span>
            <span class="title" v-if="currentPage=='faq'">常见问答</span>
        </div>
        <div class="content">
            <div class="follow" v-if="currentPage=='follow'">
                <h3 class="tip" v-if="compList.length==0">暂无关注公司</h3>
                <CompanyInfoCard :companyList="compList"/>
            </div>
            <div class="faq" v-if="currentPage=='faq'">
                <FaqCard v-for="el in faqList" :key="el._id" :faq="el"></FaqCard>
            </div>
        </div>

    </div>
</template>


<script>
import CompanyInfoCard from '@/components/CompanyInfoCard.vue'
import FaqCard from '@/components/FaqCard.vue'
import { getFAQ } from '@/apis'

export default{
    props:['collectionCompanyList'],
    data(){
        return{
            compList:[],
            faqList:null
        }
    },
    methods:{
        goBack(){
            history.back();
        }
    },
    components:{
        CompanyInfoCard,
        FaqCard
    },
    mounted(){
        if(sessionStorage.getItem('collectionCompanyList')){
            JSON.parse(sessionStorage.getItem('collectionCompanyList')).forEach(element => {
                this.compList.push(element.info)
            });
        }
        if(this.$route.params.title=='faq'){
            this.axios.get(getFAQ()).then(res=>{
                this.faqList = res.data.data.list
            })
        }
    },
    computed:{
        currentPage(){
            return this.$route.params.title
        }

    }
}
</script>

<style lang="scss" scoped>
.my-other{
    background-color: var(--bg);
    position: relative;
    margin-top: 100px;
    .top{
        position: fixed;
        top: 0;
        width: 100%;
        height: 98px;
        background-color: var(--nav-active);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 36px;
        .van-icon{
            position: absolute;
            left: 30px;
        }
    }
    .content{
        padding: 30px 30px 0;
        .tip{
            text-align: center;
        }
    }
}
</style>