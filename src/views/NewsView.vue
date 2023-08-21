<template>
    <div class="news">
        <div class="top">
            <div class="label">消息</div>
            <div class="right-icon">
                <van-icon name="bell" />
            </div>
        </div>
        <div class="content">
            <div class="recommend" @click="$router.push('/hotNew')">
                <img src="../assets/imgs/newPositions.png" alt="">
                <div class="text">
                    <h3 class="title">热招新岗位</h3>
                    <p>{{ totalNewPositions }}个公司发布了新岗位</p>
                </div>
            </div>
            <ChatItem v-for="(el,index) in chatList" :key="index" :chatItem="el"></ChatItem>

        </div>
    </div>
</template>

<script>
import {getCompanyTotal} from '../apis';
import ChatItem from '@/components/ChatItem.vue'

export default{
    props:['chatList'],
    data(){
        return{
            totalNewPositions:0,
            loading: false,
            finished: false,

        }
    },
    components:{
        ChatItem
    },
    mounted(){
        let url = getCompanyTotal()
        this.axios.get(url).then(res=>{
            this.totalNewPositions = res.data.data.total
        })
    },
}
</script>

<style lang="scss" >
.news{
    background-color: var(--bg);
    margin-bottom: 98px;
    margin-top: 150px;
    .top{
        position: fixed;
        top: 0;
        width: 100%;
        height: 150px;
        background-color: var(--nav-active);
        display: flex;
        justify-content: space-between;
        color: #fff;
        align-items: center;
        padding: 30px;
        .label{
            font-size: 48px;
        }
        .van-icon{
            font-size: 44px;
        }
    }
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        .recommend{
            margin-top: 30px;
            border-radius: 20px;
            width: 90%;
            padding: 20px 30px;
            box-shadow: 0px 0px 21px 0px rgba(1,64,153,0.22);
            display: flex;
            img{
                width: 80px;
                height: 80px;
            }
            .text{
                margin-left: 30px;
                .title{
                    font-size: 34px;
                    color:var(--title);
                    margin-bottom: 18px;
                }
                p{
                    font-size: 24px;
                    color:var(--title);
                }
            }
            

        }
        .van-list{
            width: 100%;
            padding: 30px;
        }
    }
}
</style>