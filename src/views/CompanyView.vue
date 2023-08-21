<template>
    <div class="company">
        <div class="top">
            <van-search
            v-model="value"
                shape="round"
                placeholder="搜索..."
                left-icon=""
                show-action
                @cancel="onCancel"
            >
            <template #left>
                <span class="left">公司</span>
            </template>
            <template #action>
                <span  @click="onSearch">搜索</span> 
            </template>
            </van-search>
        </div>
        <div class="company-list">
            <van-skeleton v-for="el in companyList" :key="el._id" title avatar avatar-size="80px" :row="3" :loading="loading">
                <div class="content" @click="goToCompanyDetail(el._id)">
                    <div class="skeleton__avatar van-skeleton__avatar--round" :style="{backgroundImage:'url(' + el.logoUrl + ')' }"></div>
                    <div class="skeleton__content">
                        <h3 class="skeleton__title">{{ el.title }}</h3>
                        <div class="skeleton__row work-info">{{ el.workInfo[0].workAddress }} | {{ el.companyType }} | {{el.companyNumber }}</div>
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
    </div>
</template>

<script>
import { getCompanyTotal,getCompanyList } from '../apis'

export default{
    data(){
        return{
            value: '',
            loading: true,
            companyList:null,
            size:0
        }
    },
    mounted(){
        this.loading = false;
        this.axios.get(getCompanyTotal()).then(res=>{
            this.size = res.data.data.total
        }).then(()=>{
            this.axios.get(getCompanyList(1,this.size)).then(res=>{
                this.companyList = res.data.data.list
            })   
        }) 
    },
    methods:{
        goToCompanyDetail(id){
            this.$router.push(`/companyDetail/${id}`)
        },
        onSearch(){
            if(this.value.trim()){
                this.$router.push(`/search/comp?kw=${this.value}`)
            }else{
                return
            }

        },
        onCancel(){
            this.value = ''
        }
    }
}
</script>

<style lang="scss">
.company{
    background-color: var(--bg);
    margin-bottom: 98px;
    margin-top: 150px;
    .top{
        position: fixed;
        z-index: 100;
        top: 0;
        width: 100%;
        .van-search{
            height: 150px;
            padding: 0;
            background-color: var(--nav-active);
            color: #fff;
            font-size: 48px;
            .left{
                margin-left: 30px;
                font-size: 36px;
            }
            .van-search__content{
                width: 550px;
                height: 60px;
                align-items: center;
                padding: 10px 30px;
                font-size: 26px;
                margin: 0 29px;
            }
            .van-field__right-icon .van-icon{
                font-size: 38px !important;
            }
            .van-search__action{
            color: #fff;
            font-size: 26px;
            padding-right: 30px;
            &:active{
                background-color: transparent;
            }
        }
        }
    }
    
    .company-list{
        display: flex;
        flex-direction: column;
        align-items: center;
        .content{
            margin-top: 30px;
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
                .work-info{
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