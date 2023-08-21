<template>
    <div class="edit">
        <div class="top">
            <van-icon name="arrow-left" @click="goBack" />
            <span v-show="title=='editBase'">基础信息</span>
            <span v-show="title=='advantages'">个人优势</span>
            <span v-show="title=='expectation'">求职期望</span>
            <span v-show="title=='experience'">工作经历</span>
            <van-button @click="save">保存</van-button>
        </div>
        <div class="content">
            <div class="base" v-show="title=='editBase'" >
                <div>
                    <div class="label">姓名：</div>
                    <input type="text" v-model="nickName" id="nickName">
                </div>
                <div>
                    <div class="label">工作经验时长：</div>
                    <input type="text" v-model="workExperience" id="workExperience">
                </div>
                <div>
                    <div class="label">年龄：</div>
                    <van-stepper v-model="age" />
                </div>
                <div>
                    <div class="label">性别：</div>
                    <van-radio-group v-model="radio">
                        <van-radio name="男">男</van-radio>
                        <van-radio name="女">女</van-radio>
                    </van-radio-group>
                </div>
                <div class="education">
                    <div class="label" @click="showPicker = !showPicker">学历：{{ education }}</div>
                    <van-picker
                        v-show="showPicker"
                        title="学历"
                        show-toolbar
                        :columns="educationList"
                        @confirm="onConfirm"
                        @cancel="onCancel"
                        :default-index="educationList.indexOf(education)"
                        />
                </div>
            </div>
            <div class="advantages" v-show="title=='advantages'">
                <textarea v-model="advantages"></textarea>
            </div>
            <div class="expectation" v-show="title=='expectation'">
                <div class="occupation">
                    <div class="label">期望职位：</div>
                    <input type="text" v-model="occupation">
                </div>
                <div class="addr">
                    <div class="label">工作城市:</div>
                    <input type="text" v-model="addr">
                </div>
                <div class="wages">
                    <div class="label">资薪要求：</div>
                    <input type="text" v-model="wages">
                </div>
                <div class="wages">
                    <div class="label">期望行业：</div>
                    <van-dropdown-menu>
                        <van-dropdown-item v-model="industry" :options="option" />
                    </van-dropdown-menu>
                </div>
            </div>
            <div class="experience" v-show="title=='experience'">
                <textarea v-model="experience"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['userInfo'],
    data(){
        return{
            title:this.$route.params.title,
            radio: this.userInfo.sex,
            age: this.userInfo.age,
            educationList: ['小学', '初中', '高中', '专科', '本科','中专','研究生'],
            education: this.userInfo.education,
            showPicker:false,
            nickName:this.userInfo.identity,
            workExperience:this.userInfo.handsOnBackground,
            advantages:this.userInfo.advantages.length==0?'有什么个人优势呢？用一两句话表述吧~':this.userInfo.advantages,
            occupation:this.userInfo.expectation.occupation,
            addr:this.userInfo.expectation.addr,
            wages:this.userInfo.expectation.wages,
            industry:this.userInfo.expectation.industry,
            experience:this.userInfo.experience.length==0?'工作内容记得要写哦，增加就业几率。':this.userInfo.experience,
            option:[
                {
                    text:'互联网/IT/电子/通信',
                    value:'互联网/IT/电子/通信'
                },{
                    text:'广告/传媒/文化/体育',
                    value:'广告/传媒/文化/体育'
                },{
                    text:'金融',
                    value:'金融'
                },{
                    text:'教育培训',
                    value:'教育培训'
                },{
                    text:'制药/医疗',
                    value:'制药/医疗'
                },{
                    text:'交通/物流/贸易/零售',
                    value:'交通/物流/贸易/零售'
                },{
                    text:'专业服务',
                    value:'专业服务'
                },{
                    text:'房地产/建筑',
                    value:'房地产/建筑'
                },{
                    text:'汽车',
                    value:'汽车'
                },{
                    text:'机械/制造',
                    value:'机械/制造'
                },{
                    text:'消费品',
                    value:'消费品'
                },{
                    text:'服务业',
                    value:'服务业'
                },{
                    text:'能源/化工/环保',
                    value:'能源/化工/环保'
                },{
                    text:'政府/非盈利机构/其他',
                    value:'政府/非盈利机构/其他'
                },

            ]
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)

        },
        onConfirm(value) {
            this.education = value
            this.showPicker = false
        },
        onCancel() {
            this.showPicker = false
        },
        save(){
            this.$emit('changeUserInfo',{
                identity:this.nickName,
                handsOnBackground:this.workExperience,
                age:this.age,
                sex:this.radio,
                education:this.education,
                advantages:this.advantages,
                occupation:this.occupation,
                addr:this.addr,
                wages:this.wages,
                industry:this.industry,
                experience:this.experience
            })
            this.$router.go(-1)
        },
    }
}
</script>

<style lang="scss" >
.edit{
    background-color: var(--bg);
    .top{
        width: 100%;
        padding: 0 30px;
        background-color: var(--nav-active);
        color: #fff;
        height: 98px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: 36px;
        .van-icon{
            position: absolute;
            left: 30px;
        }
        .van-button{
            background-color: transparent;
            color: #fff;
            border-radius: 999px;
            position: absolute;
            right: 30px;
        }
    }
    .content{
        padding: 0 30px;
        .base{
            width: 100%;
            div{
                margin-top: 40px;
                font-size: 36px;
                .label{
                    font-size: 24px;
                }
                input{
                    margin-top: 20px;
                }
                #nickName{
                    border: none;
                    outline: none;
                    width: 100%;
                    border-bottom: 1px solid var(--border-bottom);
                }
                #workExperience{
                    border: none;
                    outline: none;
                    width: 100%;
                    border-bottom: 1px solid var(--border-bottom);
                }
                .van-radio-group{
                    .van-radio{
                        font-size: 24px;
                        overflow: visible;
                    }
                }
                &.education{
                    .van-ellipsis{
                        overflow: visible;
                    }
                }
            }
        }
        .advantages , .experience{
            margin-top: 30px;
            font-size: 36px;
            textarea{
                width: 90%;
                height: 80vh;
                resize: none;
                border: none;
            }
        }
        .expectation{
            display: flex;
            flex-direction: column;
                .label{
                    font-size: 24px;
                    margin-top: 30px;
                }
                input{
                    margin-top: 30px;
                    font-size: 36px;
                    border: none;
                    outline: none;
                    width: 100%;
                    border-bottom: 1px solid var(--border-bottom);
                }
                .van-dropdown-menu{
                    margin-top: 30px;
                    .van-dropdown-menu__title--active{
                        color: var(--nav-active);
                        
                    }
                    .van-ellipsis{
                            overflow: visible;
                    }
                    .van-dropdown-item__option--active{
                        color: var(--nav-active);
                    }
                    .van-dropdown-item__option--active .van-dropdown-item__icon{
                        color: var(--nav-active);
                    }
                }
        }
    }
}
</style>