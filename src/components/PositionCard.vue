<template>
    <van-cell-group>
            <van-cell v-for="item in positionList" :key="item._id" 
            @click="goToDetail(item?._id)"
            :title="item.title" >
                <template #label>
                    <div class="requirement">
                        {{ item.workAddress }}|{{ item.workRange }}|{{ item.education }}
                    </div>
                    <van-tag v-for="(el,index) in item.welfare" :key="index">{{ el }}</van-tag>
                    <div class="company" v-if="item.companyInfo">
                        <img :src="item?.companyInfo[0].logoUrl" v-lazy="item?.companyInfo[0].logoUrl" alt="">
                        <div class="text">
                            <div class="title">{{ item?.companyInfo[0].title }}</div>
                            <div class="type">
                                <span>{{ item?.companyInfo[0].companyType }}</span>
                                <span>{{ item?.companyInfo[0].companyNumber }}</span>
                            </div>
                        </div>
                    </div>
                </template>
                <template>
                    <p>{{ item.salary }}</p>
                    <van-button plain round>立即投递</van-button>
                </template>
            </van-cell>
    </van-cell-group>
</template>

<script>
export default{
    props:['positionList'],
    methods:{
        goToDetail(id){
            // console.log(id);
            this.$router.push(`/posDetail/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.van-cell-group{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-cell{
        width: 90%;
        padding-bottom: 30px;
        box-shadow: 0px 6px 21px 0px rgba(20,150,57,0.22);
        border-radius: 20px;
        margin-bottom: 30px;
        justify-content: space-between;
        .van-cell__title,.van-cell__value{
            flex: none;
            margin-top: 20px;
        }
        .van-cell__title{
            width: 70%;
        }
        .van-cell__value{
            width: 30%;
            color: var(--nav-active);
            font-size: 36px;
            font-weight: 500;
            overflow: visible;
            margin-right: 10px;
            display: flex;
            flex-direction: column;
        }
        .requirement{
            margin: 20px 0;
            color: var(--title);
        }
        .van-tag{
            font-size: 20px !important;
            color: var(--title);
            background-color: var(--tag-bg);
            padding: 10px 20px;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .company{
            position: relative;
            margin-top: 30px;
            display: flex;
            margin-right: 20px;
            margin-bottom: 0;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-right: 20px;
            }
            .title{
                font-size: 24px;
                color: var(--title);
            }
            .type {
                margin-top: 20px;
                span{
                    font-size: 18px;
                    margin-right: 20px;
                    color: var(--nav-gray);
                }
            }
            
        }
        .van-button{
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 24px;
        }
        .van-button--default{
                color: var(--nav-active);
                border: 3px solid var(--nav-active);
            }
    }
}
    
    
</style>