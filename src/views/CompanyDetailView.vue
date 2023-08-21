<template>
    <div class="company-detail">
        <div class="top">
            <div class="buttons">
                <van-icon name="arrow-left" @click="goBack" />
                <van-button @click="toggleCollected" v-if="!collected" round icon="plus">关注</van-button>
                <van-button @click="toggleCollected" v-else round icon="success">已关注</van-button>
            </div>
            <div class="card">
                <div class="about-company">
                    <img :src="companyInfo?.logoUrl" alt="">
                    <div class="text">
                        <h3>{{ companyInfo?.title }}</h3>
                        <p class="type">{{ companyInfo?.companyRange }}|{{ companyInfo?.companyNumber }}|{{ companyInfo?.companyType }}</p>
                        <p class="description">{{ companyInfo?.description }}</p>
                    </div>
                </div>
                <div class="work-time">
                    <h3>工作时间</h3>
                    <p>
                        <span v-for="(el,index) in companyInfo?.workTime" :key="index">{{ el }}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="welfare">
            <h3>员工福利</h3>
            <WelfareItem v-for="(el,index) in companyInfo?.welfare" :key="index" :welfareInfo="el"></WelfareItem>
        </div>
        <div class="official">
            <h3>公司官网</h3>
            <div class="site"><p>
                {{ companyInfo?.siteUrl }}
            </p></div>
        </div>
        <div class="positions">
            <h3>招聘岗位</h3>
            <!-- {{ workInfo }} -->
            <PositionCard :positionList="workInfo"></PositionCard>
        </div>
    </div>
</template>

<script>
import { getCompanyDetail,getCompanyList } from '../apis'
import WelfareItem from '@/components/WelfareItem.vue'
import PositionCard from '@/components/PositionCard.vue'

export default{
    props:['collectionCompanyList'],
    data(){
        return{
            companyInfo:null,
            workInfo:null,
            collected:false
        }
    },
    mounted(){
        let url = getCompanyDetail(this.$route.params.companyid)
        this.axios.get(url).then(res=>{
            this.companyInfo = res.data.data
        })
        this.axios.get(getCompanyList()).then(res=>{
            res.data.data.list.forEach(element => {
                if(this.$route.params.companyid==element._id){
                    this.workInfo = element.workInfo
                }
            });
            if(this.collectionCompanyList){
                this.collectionCompanyList.forEach(element => {
                    if(element.id == this.companyInfo._id){
                        this.collected = element.collected
                    }
                });
            }
        })

    },
    methods:{
        goBack(){
            // history.back();
            this.$router.go(-1)

        },
        toggleCollected(){
            this.collected = !this.collected
            this.$emit('editCollectionCompanyList',{
                id:this.companyInfo._id,
                collected : this.collected,
                info:this.companyInfo
            })
        }
    },
    components:{
        WelfareItem,
        PositionCard
    }
}
</script>

<style lang="scss" >
.company-detail{
    background-color: var(--bg);
    .top{
        padding: 30px;
        height: 218px;
        background-image: url(../assets/imgs/bg.png);
        background-size: cover;
        position: relative;
        .buttons{
            color: #fff;
            display: flex;
            justify-content: space-between;
            .van-button{
                background-color: transparent;
                color: #fff;
                &::before{
                    border: 1px solid #fff !important;

                }
            }
        }
        .card{
            width: 90%;
            position: absolute;
            color: var(--title);
            top: 133px;
            padding-bottom: 40px;
            border-bottom: 1px solid #eee;

            .about-company{
                display: flex;
                img{
                    background-color: #fff;
                    width: 140px;
                    height: 140px;
                    border-radius: 20px;
                    box-shadow: 0px 6px 21px 0px rgba(1,64,153,0.22);
                }
                .text{
                    margin-left: 30px;
                    margin-top: 18px;
                    h3{
                        color: #fff;
                        font-size: 40px;
                        font-weight: 500;
                    }
                    .type{
                        font-size: 20px;
                        margin-top: 58px;
                        margin-bottom: 18px;
                    }
                    .description{
                        font-size: 18px;
                        line-height: 36px;
                        display: -webkit-box;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;
                    }
                }
            }
            .work-time{
                margin-top: 12px;
                h3{
                    font-size: 30px;
                    margin-bottom: 40px;
                    font-weight: 600;
                }
                span{
                    font-size: 24px;
                    margin-right: 20px;
                }
            }
        }
    }
    .welfare{
        margin: 416px auto 0;
        width: 90%;
        padding-bottom: 40px;
        border-bottom: 1px solid #eee;
        h3{
            font-weight: 600;
            font-size: 30px;
        }
    }
    .official{
        width: 90%;
        margin: 38px auto;
        color: var(--title);
        border-bottom: 1px solid #eee;

        h3{
            font-size: 30px;
            font-weight: 600;
        }
        .site{
            font-size: 24px;
            margin-top: 40px;
            word-break: break-all;
            line-height: 48px;
        }
    }
    .positions{
        padding: 0 30px;
        h3{
            font-size: 30px;
            font-weight: 600;
            margin-bottom: 30px;
        }
        .van-cell{
            justify-content: space-between;
            .van-cell__title{
                span{
                    font-size: 30px;
                    font-weight: 600;
                }
                .van-cell__label{
                    span{
                        font-weight: normal;
                    }
                }
            }
        }
    }
}
</style>