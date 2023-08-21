<template>
    <div class="chat">
        <div class="top">
            <van-icon name="arrow-left" @click="goBack" />
            <div class="title">{{ chatInfo?.companyInfo[0].title }}</div>
        </div>
        <div class="card">
            <van-cell :title="chatInfo?.title" :value="chatInfo?.salary" size="large" label="描述信息">
                <template #label>
                    <p class="requirement">{{ chatInfo?.workAddress }}|{{ chatInfo?.workRange }}|{{ chatInfo?.education }}</p>
                    <div class="welfare">
                        <van-tag v-for="(el,index) in chatInfo?.welfare" :key="index">{{ el }}</van-tag>
                    </div>
                </template>
            </van-cell>
            <div class="company-info">
                <img :src="chatInfo?.companyInfo[0].logoUrl" alt="">
                <div class="text">
                    <div class="title">{{ chatInfo?.companyInfo[0].title }}</div>
                    <div class="type">{{ chatInfo?.companyInfo[0].companyType }}  {{ chatInfo?.companyInfo[0].companyNumber }}</div>
                </div>
            </div>
        </div>
        <div class="chat-box">
            <div class="chatContent" v-for="(el,index) in chatContentList" :key="index">
                <div :class="el.role=='company'?'receive-chat':''" v-if="el.role=='company'">
                    <img :src="chatInfo?.companyInfo[0].logoUrl">
                    <div class="content">{{ el.text }}</div>
                </div>
                <div :class="el.role=='user'?'send-chat':''" v-if="el.role=='user'">
                    <div class="content">{{ el.text }}</div>
                    <img src="https://yw.52kfw.cn/uploads/user_default.jpeg" alt="">
                </div>
            </div>
            <!-- <div class="receiveChat">
                <img :src="chatInfo?.companyInfo[0].logoUrl">
                <div class="content">请问还在考虑新的工作机会吗?</div>
            </div>
            <div class="sendChat" v-for="(el,index) in chatContentList" :key="index">
                <div class="content">{{ el }}</div>
                <img src="https://yw.52kfw.cn/uploads/user_default.jpeg" alt="">
            </div> -->
            <!-- {{ chatList }} -->
        </div>
        <footer>
            <input type="text" class="chat-input" v-model="chatContent">
            <button class="send" @click="send">发送</button>
        </footer>
    </div>
</template>

<script>
export default{
    props:['chatList'],
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        send(){
            if(this.chatContent.trim()!=''){
                this.$emit('changeChatList',{
                    id:this.$route.params._id,
                    role:'user',
                    text: this.chatContent
                })
                this.chatContent = ''
                for(let i =0; i < this.chatList.length; i++){
                    if(this.$route.params._id == this.chatList[i].postionInfo._id){
                        this.chatContentList = this.chatList[i].chatContent
                    }
                }
            }
        },

    },
    data(){
        return{
            chatContentList:[],
            chatContent:'',
            chatInfo:null
        }
    },
    mounted(){
        for(let i =0; i < this.chatList.length; i++){
            if(this.$route.params._id == this.chatList[i].postionInfo._id){
                this.chatInfo = this.chatList[i].postionInfo,
                this.chatContentList = this.chatList[i].chatContent
            }
        }
        // console.log(this.chatList);
    },
}
</script>

<style lang="scss" scoped>
.chat{
    background-color: var(--tag-bg);
    width: 100vw;
    height: 100vh;
    padding-top: 130px;
    padding-bottom: 98px;
    .top{
        padding: 30px;
        position: fixed;
        top: 0;
        width: 100%;
        color: #fff;
        background-color: var(--nav-active);
        height: 98px;
        display: flex;
        align-items: center;
        justify-content: center;
        .title{
            font-size: 36px;
        }
        .van-icon{
            position: absolute;
            left: 30px;
        }
    }
    .card{
        background-color: var(--bg);
        width: 90%;
        box-shadow: 0px 6px 21px 0px rgba(20,150,57,0.22);
        border-radius: 20px;
        margin: 0 auto 40px;
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
    .chat-box{
        width: 100%;
        padding: 0 30px;
        .send-chat{
            display: flex;
            align-items: center;
            font-size: 36px;
            justify-content: flex-end;
            margin-top: 10px;
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
            .content{
                background-color: var(--nav-active);
                border-radius: 20px 20px 0 20px;
                padding: 10px 30px;
                margin-right: 15px;
            }
        }
        .receive-chat{
            display: flex;
            align-items: center;
            font-size: 36px;
            justify-content: flex-start;
            margin-top: 10px;
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
            .content{
                font-size: 36px;
                line-height: 40px;
                max-width: 70%;
                background-color: #fff;
                border-radius: 20px 20px 20px 0;
                padding: 10px 30px;
                margin-left: 15px;
            }
        }
        
    }
    footer{
        background-color: #fff;
        height: 98px;
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 30px;
        justify-content: space-between;
        .chat-input{
            width: 590px;
            height: 60px;
            border-radius: 20px;
            border: none;
            outline: none;
            background-color: var(--tag-bg);
            font-size: 20px;
            padding: 0 20px;
            box-sizing: border-box;
        }
        .send{
            outline: none;
            border: none;
            background-color: transparent;
            color: var(--nav-active);
            font-size: 30px;
        }
    }
}
</style>