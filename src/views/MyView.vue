<template>
    <div class="my">
        <div class="header">
            <!-- <van-icon name="setting" class="setting" /> -->
            <img :src="info?.picUrl" alt="">
            <div class="text">
                <div class="nick-name" v-if="!edit">{{ info?.identity }}
                    <van-icon name="edit" @click="()=>edit='true'"/>

                    <!-- <van-icon name="edit" @click="$router.push('/personalinfo')"/> -->
                </div>
                <input v-if="edit" type="text" ref="inp" :value="info?.identity" @blur="save">

                <p class="introduce">{{ info?.advantages.length==0?'有什么个人优势呢？用一两句话表述吧~':info?.advantages }}</p>
            </div>
        </div>
        <div class="tab">
            <div @click="goToEnclosure">
                <img src="../assets/imgs/fujian.png" alt="">
                <span>附件简历</span>
            </div>
            <div @click="goToDelivered">
                <img src="../assets/imgs/yitou.png" alt="">
                <span>已投简历</span>
            </div>
            <div @click="goToCollection">
                <img src="../assets/imgs/shoucang.png" alt="">
                <span>我的收藏</span>
            </div>
        </div>
        <div class="content">
            <van-popup v-model="show" position="bottom">
                <ul class="state-list" @click="changeState">
                    <li>离校-随时到岗</li>
                    <li>在校-月内到岗</li>
                    <li>在校-考虑机会</li>
                    <li>在校-暂不考虑</li>
                    <li>在职-暂不考虑</li>
                    <li>在职-考虑机会</li>
                    <li>在职-月内到岗</li>
                    <li>离职-随时到岗</li>
                </ul>
            </van-popup>
            <van-cell title="管理求职意向" @click="showPopup"  icon="add-o" v-model="state" class="intention" is-link narrow-direction="right"/>
            <van-divider />
            <van-cell title="在线简历" to="/onlineresume" icon="wap-home-o" is-link narrow-direction="right"/>
            <van-cell title="关注公司" to="/myView/follow" icon="like-o" is-link narrow-direction="right"/>
            <van-cell title="常见问答" to="/myView/faq" icon="chat-o" is-link narrow-direction="right"/>
            <van-divider />
            <van-cell @click="$router.push('/help')" title="帮助与反馈" icon="warning-o" is-link narrow-direction="right"/>
        </div>
    <router-view/>
    </div>
</template>

<script>

export default{
    data(){
        return{
            show: false,
            edit:false
        }
    },
    props:['userInfo','collectionList'],
    mounted(){
        if(this.info){
            return
        }
        this.axios({
                method: 'post',
                url:'https://yw.52kfw.cn/api/user/phone-login',
                headers: { 
                    'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
                },
                data : {
                    'phone': 18620628729,
                    'code': 1234 
                }
            }).then(res=>{
                let {data} = res
                this.$emit('getUserInfo',data.data.userInfo)
            })
    },
    computed:{
        info(){
            return this.userInfo
        },
        state(){
            return this.userInfo?.state
        },
    },
    methods:{
        goToCollection(){
            this.$router.push(`/myCollection`)

        },
        showPopup() {
            this.show = true;
        },
        changeState(e){
            if(e.target.localName=='li'){
                this.$emit('changeState',e.target.innerText)
                this.show = false
            }
        },
        goToEnclosure(){
            // console.log('附件简历');
            this.$router.push('/aboutResume/enclosure')
        },
        goToDelivered(){
            // console.log('已投递');
            this.$router.push('/aboutResume/delivered')

        },
        save(){
            this.$emit('changeNickName',this.$refs.inp.value)
            
            this.edit = false
        }
    }
}
</script>


<style lang="scss" scoped>
.my{
    background-color: var(--bg);
    position: relative;
    .header{
        position: relative;
        display: flex;
        align-items: center;
        height: 354px;
        background-image: url(../assets/imgs/bg.png);
        background-size: cover;
        img{
            margin-left: 30px;
            width: 140px;
            height: 140px;
            border-radius: 50%;
        }
        .text{
            margin-left: 35px;
            .nick-name{
                color: #fff;
                font-weight: bold;
                font-size: 48px;
                .van-icon{
                    width: 28px;
                    height: 28px;
                }
                
            }
            input{
                color: var(--title);
                width: 50%;
                outline: none;
                border: none;
            }
            .introduce{
                font-size: 24px;
                color: #fff;
                margin-top: 18px;
            }
        }
        .setting{
            position: absolute;
            top: 40px;
            right: 30px;
            color: #fff;
            font-size: 38px;
        }
    }
    .tab{
        background-color: var(--bg);
        position: absolute;
        top: calc( 354px - 160px / 2 );
        left: calc( (100% - 690px) / 2);
        width: 690px;
        height: 160px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0px 6px 21px 0px rgba(20,150,57,0.22);
        border-radius: 20px;
        div{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                width: 50px;
                height: 50px;
                margin-bottom: 20px;
            }
            span{
                color: var(--title);
                font-size: 26px;
            }
        }
        
    }
    .content{
        width: 690px;
        margin: 85px auto;
        color: var(--title);
        font-size: 30px;
        .intention{
            padding: 42px 0;
        }
        .van-cell__title{
            margin-left: 30px;
        }
        .van-cell{
            padding: 25px 0;
        }
        .van-cell::after{
            border-bottom:none
        }
        .van-cell__value{
            overflow: visible;
        }
        .state-list{
            li{
                padding: 20px 30px;
            }
        }
    }
}
</style>