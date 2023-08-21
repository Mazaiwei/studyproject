<template>
    <div class="login">
        <div class="text">
            <h3>您好！</h3>
            <p>欢迎来到职业帮！</p>
        </div>
        <div class="input">
            <div class="telNum">
                +86<input type="text" placeholder="请输入手机号码" v-model="telNum">
            </div>
            <div class="num">
                <input type="text" v-model="num" placeholder="请输入验证码">
                <van-button plain type="primary" round>获取验证码</van-button>
            </div>
        </div>
        <van-button class="submit" round block @click="verification">登录</van-button>
    </div>
</template>

<script>
import { SignIn } from '../apis'

export default{
    data(){
        return{
            telNum:'',
            num:'',
        }
    },
    methods:{
        verification(){
            let url = SignIn(this.telNum,this.num)
            this.axios({
                method: 'post',
                url,
                headers: { 
                    'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
                },
                data : {
                    'phone': this.telNum,
                    'code': this.num 
                }
            }).then(res=>{
                let {data} = res
                if(data.statusCode==200){
                    console.log('成功');
                    sessionStorage.setItem('token',data.data.token);
                    this.$emit('getUserInfo',data.data.userInfo);
                    
                    history.back();
                }else{
                    alert('手机号或验证码错误！')
                }
            })
        }
    },
    
}
</script>

<style lang="scss" scoped>
.login{
    display: flex;
    flex-direction: column;
    align-items: center;
    .text{
        width: 80%;
        margin-top: 200px;
        h3{
            font-size: 48px;
            font-weight: bold;
            color: var(--hello);
        }
        p{
            color:var(--title);
            font-size: 36px;
            margin-top: 28px;
            margin-bottom: 180px;
        }
    }
    .input{
        width: 80%;
        font-size: 28px;
        input{
            border: none;
            padding: 32px 0;
            outline: none;
        }
        .telNum{
            border-bottom: 1px solid var(--border-bottom);
            input{
                margin-left: 45px;
            }
        }
        .num{
            display: flex;
            border-bottom: 1px solid var(--border-bottom);
            justify-content: space-between;
            align-items: center;
            margin-bottom: 234px;
        }
    }
    .submit{
        width: 70%;
        height: 88px;
        font-size: 30px;
        color: #fff;
        background-color: var(--nav-active);
        border: 0.01333rem solid var(--nav-active);
    }
}
</style>