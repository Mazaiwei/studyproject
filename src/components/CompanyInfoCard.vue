<template>
    <div class="company-info-card">
        <van-skeleton v-for="el in companyList" :key="el._id" title avatar avatar-size="80px" :row="3" :loading="loading">
                <div class="content" @click="goToCompanyDetail(el._id)">
                    <div class="skeleton__avatar van-skeleton__avatar--round" :style="{backgroundImage:'url(' + el.logoUrl + ')' }"></div>
                    <div class="skeleton__content">
                        <h3 class="skeleton__title">{{ el.title }}</h3>
                        <div class="skeleton__row workInfo"> {{ el.companyType }} | {{el.companyNumber }}</div>
                        <div class="skeleton__row welfare">
                            <span v-for="(item,index) in el.welfare" :key="index">{{ item.title }}</span>
                        </div>
                        <van-divider />
                    </div>
                </div>
            </van-skeleton>
    </div>
</template>

<script>
export default{
    props:['companyList'],
    data(){
        return{
            loading: false,
        }
    },
    methods:{
        goToCompanyDetail(id){
            // console.log(id);
            this.$router.push(`/companyDetail/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.company-info-card{
    display: flex;
    flex-direction: column;
    align-items: center;
    .content{
        display: flex;
        margin-top: 30px;
            box-shadow: 0px 6px 21px 0px rgba(20,150,57,0.22);
            border-radius: 20px;
            width: 90%;
            padding: 38px 32px 32px 30px;
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
</style>