<template>
    <div class="search-res">
        <div class="top">
            <van-icon name="arrow-left" @click="goBack"/>
        </div>
        <div class="posSearch" v-if="type=='pos'">
            <div v-if="resList?.length!=0" class="res-list">
                <PositionCard :positionList="resList"/>
            </div>
            <div v-else class="no-res">
                <h3>暂时没有相关岗位</h3>
            </div>
        </div>
        <div class="comp-search" v-if="type=='comp'">
            <div v-if="resList?.length!=0" class="res-list">
                <van-skeleton v-for="el in resCompList" :key="el._id" title avatar avatar-size="80px" :row="3" :loading="loading">
                    <div class="content" @click="goToCompanyDetail(el._id)">
                        <div class="skeleton__avatar van-skeleton__avatar--round" :style="{backgroundImage:'url(' + el.logoUrl + ')' }"></div>
                        <div class="skeleton__content">
                            <h3 class="skeleton__title">{{ el.title }}</h3>
                            <div class="skeleton__row workInfo">{{ el.workInfo[0].workAddress }} | {{ el.companyType }} | {{el.companyNumber }}</div>
                            <div class="skeleton__row welfare">
                                <span v-for="(item,index) in el.welfare" :key="index">{{ item.title }}</span>
                            </div>
                            <van-divider />
                            <div class="skeleton__row positions">热招：
                                <span class="position">{{ el.workInfo[0].title }}</span>
                                等{{ el.workInfo.length }}个岗位
                            </div>
                        </div>
                    </div>
                </van-skeleton>
            </div>
            <div v-else class="no-res">
                <h3>暂时没有相关公司</h3>
            </div>
        </div>
    </div>
</template>


<script>
import {getPositionList,getCompanyTotal,getCompanyList} from '../apis'
import PositionCard from '@/components/PositionCard.vue'
export default{
    data(){
        return{
            resList:null,
            companyList:null,
            size:0,
            resCompList:[],
            loading:false
        }
    },
    computed:{
        type(){
            return this.$route.params.type
        }
    },
    mounted(){
        let kw = this.$route.query.kw;
        let url = getPositionList('',0,0,kw);
        this.axios.get(url).then(res=>{
            this.resList = res.data.data.list
        })

        this.axios.get(getCompanyTotal()).then(res=>{
            this.size = res.data.data.total
        }).then(()=>{
            this.axios.get(getCompanyList(1,this.size)).then(res=>{
                this.companyList = res.data.data.list
                console.log(this.companyList);
                this.companyList.forEach(element => {
                if (element.title.includes(kw)) {
                    console.log(111);
                    this.resCompList = [element,...this.resCompList]
                }
            });
            })   
        })
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    },
    components:{
        PositionCard
    }
}
</script>

<style lang="scss" scoped>
.search-res{
    background-color: var(--bg);
    .top{
        background-color: var(--nav-active);
        height: 98px;
        display: flex;
        align-items: center;
        padding: 0 30px;
        color: #fff;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
    }
    .res-list{
        margin-top: 128px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .van-cell{
            justify-content: space-between;
        }
    } 
    .no-res{
        margin-top: 118px;
        text-align: center;
    }
    .comp-search{
        padding-bottom: 30px;
        padding-top: 30px;
        .content{
            box-shadow: 0px 6px 21px 0px rgba(20,150,57,0.22);
            border-radius: 20px;
            width: 90%;
            padding: 38px 32px 32px 30px;
            display: flex;
            .skeleton__avatar{
                background-size: cover;
                background-repeat: no-repeat;
                height: 80px;
                width: 80px;
            }
            .skeleton__content{
                flex: 1;
                margin-left: 18px;
                color: var(--title);
                .skeleton__title{
                    font-size: 36px;
                    font-weight: 400;
                    width: 100%;
                    margin-bottom: 20px;
                }
                .skeleton__row{
                    width: 100%;
                }
                .workInfo{
                    font-size: 20px;
                    color: var(--title);
                    margin-bottom: 16px;
                }
                .welfare{
                    font-size: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 30px;
                    span{
                        padding: 8px 10px;
                        color: var(--title);
                        background-color: var(--tag-bg);
                        border-radius: 8px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
                .positions{
                    font-size: 24px;
                    color: var(--title);
                    .position{
                        color: var(--nav-active);
                    }
                }
            }
        }
    }
}
</style>