<template>
    <div class="card">
            <van-cell :title="positionInfo?.title" :value="positionInfo?.salary" size="large" label="描述信息">
                <template #label>
                    <p class="requirement">{{ positionInfo?.workAddress }}|{{ positionInfo?.workRange }}|{{ positionInfo?.education }}</p>
                    <div class="welfare">
                        <van-tag v-for="(el,index) in positionInfo?.welfare" :key="index">{{ el }}</van-tag>
                    </div>
                </template>
            </van-cell>
            <div class="company-info">
                <img :src="positionInfo?.companyInfo[0].logoUrl" alt="">
                <div class="text">
                    <div class="title">{{ positionInfo?.companyInfo[0].title }}</div>
                    <div class="type">{{ positionInfo?.companyInfo[0].companyType }}  {{ positionInfo?.companyInfo[0].companyNumber }}</div>
                </div>
            </div>
        </div>
</template>

<script>
export default{
    props:['positionInfo']
}
</script>


<style lang="scss" scoped>
.card{
        width: 690px;
        box-shadow: 0px 6px 21px 0px rgba(1,64,153,0.22);
        border-radius: 20px;
        margin: 30px auto; 
        color: var(--title);
        .van-cell{
            padding: 30px;
            overflow: visible;
            .van-cell__title{
            width: 70%;
                font-size: 36px;
                flex: none;
                overflow: visible;
            }
            .van-cell__value{
                color: var(--nav-active);
                overflow: visible;
                font-size: 36px;
            }
            .requirement{
                margin: 20px 0;
                font-size: 20px;
            }
            .welfare{
                display: flex;
                flex-wrap: wrap;
                .van-tag{
                    padding: 10px;
                    font-size: 20px;
                    border-radius: 8px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            }
            
        }
        .company-info{
            padding: 30px;
            display: flex;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-right: 14px;
            }
            .text{
                .title{
                    font-size: 24px;
                    font-weight: 600;
                }
                .type{
                    font-size: 18px;
                    margin-top: 10px;
                }
            }
        }
    }
</style>