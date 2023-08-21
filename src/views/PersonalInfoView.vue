<template>
    <div class="online-resume">
        <div class="top">
            <van-icon name="arrow-left" @click="goBack" />
            <span>个人在线简历</span>
        </div>
        <div class="content">
            <div class="base">
                <div class="left">
                    <div class="nick-name">{{ userInfo?.identity }}
                        <van-icon name="edit" @click="$router.push('/edit/editBase')"/>
                    </div>
                    <p class="basic-info">{{ userInfo?.handsOnBackground }}工作经验·{{ userInfo?.age }}岁·{{ userInfo?.education }}</p>
                </div>
                <img :src="userInfo?.picUrl" alt="">
            </div>
            <div class="advantages">
                <h3 class="title">个人优势
                    <van-icon name="edit" @click="$router.push('/edit/advantages')"/>
                </h3>
                <p>{{ userInfo?.advantages.length==0?'有什么个人优势呢？用一两句话表述吧~':userInfo?.advantages }}</p>
            </div>
            <div class="expectation">
                <h3 class="title">求职期望
                    <van-icon name="edit" @click="$router.push('/edit/expectation')"/>
                </h3>
                <div class="contain">
                    <div class="up">
                        <span>{{ userInfo?.expectation.occupation }}</span>
                        <span>{{ userInfo?.expectation.wages }}</span>
                    </div>
                    <div class="down">
                        <span>{{ userInfo?.expectation.addr }}</span>
                        <span>{{ userInfo?.expectation.industry }}</span>
                    </div>
                </div>
            </div>
            <div class="experience">
                <h3 class="title">工作经历
                    <van-icon name="edit" @click="$router.push('/edit/experience')"/>
                </h3>
                <p>{{  userInfo?.experience.length==0?'工作内容记得要写哦，增加就业几率。':userInfo?.experience }}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    props:['userInfo'],
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.online-resume{
    background-color: var(--bg);
    .top{
        background-color: var(--nav-active);
        width: 100%;
        height: 98px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 0 30px;
        font-size: 36px;
        .van-icon{
            position: absolute;
            left: 30px;
        }
    }
    .content{
        padding: 0 30px;
        color: var(--title);
        .base{
            height: 224px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--border-bottom);
            .left{
                .nick-name{
                    font-size: 40px;
                    font-weight: bold;
                }
                .basic-info{
                    font-size: 24px;
                    margin-top: 28px;
                }
            }
            img{
                width: 140px;
                height: 140px;
                border-radius: 50%;
            }
        }
        .advantages{
            border-bottom: 1px solid var(--border-bottom);
            height: 170px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .title{
                font-size: 30px;
                font-weight: 600;
                display: flex;
                justify-content: space-between;
            }
            p{
                font-size: 24px;
                max-height: 70%;
                overflow: hidden;
                // -webkit-background-origin: border-box;
                text-overflow: ellipsis;
            }
        }
        .expectation{
            border-bottom: 1px solid var(--border-bottom);
            height: 224px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .title{
                font-size: 30px;
                font-weight: 600;
                display: flex;
                justify-content: space-between;
            }
            .contain{
                .up{
                    font-size: 26px;
                    font-weight: 400;
                }
                .down{
                    font-size: 24px;
                    font-weight: 300;
                    margin-top: 20px;
                }
                span{
                    margin-right: 20px;
                }
            }

        }
        .experience{
            height: 224px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .title{
                font-size: 30px;
                font-weight: 600;
                display: flex;
                justify-content: space-between;
            }
            p{
                font-size: 24px;
                max-height: 70%;
                overflow: hidden;
                // -webkit-background-origin: border-box;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>