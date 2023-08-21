<template>
    <div class="pos-detail">
        <div class="top">
            <van-icon name="arrow-left" @click="goBack" />
            <span class="page-title">职位详情</span>
            <van-icon v-if="!collected" name="star-o" @click="toggleCollection"/>
            <van-icon class="collected" v-else name="star" @click="toggleCollection"/>
        </div>
        <CompanyCard :positionInfo="positionInfo"/>
        <div class="detail">
            <h3>职位详情</h3>
            <div class="duty">
                <p>岗位职责：</p>
                <p v-for="(el,index) in positionInfo?.description" :key="index">{{ el.title }}</p>
            </div>
            <van-divider />
        </div>
        <div class="qualifications">
            <h3>任职资格</h3>
            <div>
                <p v-for="(el,index) in positionInfo?.works" :key="index">{{ el.title }}</p>
            </div>
        </div>
        <div class="footer">
            <van-button type="primary"
            @click="delivery(positionInfo?._id)" round block>立即投递</van-button>
        </div>
    </div>
</template>

<script>
import {getPositionDetail} from '../apis';
import CompanyCard from '@/components/CompanyCard.vue'

export default{
    props:['collectionList'],
    data(){
        return{
            positionInfo:null,
            collected:false
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        delivery(id){
            if(sessionStorage.getItem('token')){
                this.$emit('changeRecentChats',this.positionInfo)
            this.$router.push(`/chat/${id}`)
            }else{
                this.$router.push(`/login`)

            }
            
        },
        toggleCollection(){
            if(sessionStorage.getItem('token')){
                this.collected = !this.collected
                this.$emit('editCollectionList',{
                    id:this.positionInfo?._id,
                    collected:this.collected,
                    info:this.positionInfo
                })
            }else{
                this.$router.push(`/login`)

            }
            
        }
    },
    mounted(){
        let url = getPositionDetail(this.$route.params.workid)
        this.axios.get(url).then(res=>{
            this.positionInfo = res.data.data
            if(this.collectionList){
                this.collectionList.forEach(element => {
                    if(element.id == this.positionInfo._id){
                        this.collected = element.collected
                    }
                });
            }
        })
        
        
        
    },
    components:{
        CompanyCard
    }
}
</script>

<style lang="scss" scoped>
.pos-detail{
    background-color: var(--bg);
    margin-bottom: 98px;
    margin-top: 138px;
    .top{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10;
        height: 118px;
        background-color: var(--nav-active);
        display: flex;
        padding: 30px;
        justify-content: space-between;
        color: #fff;
        align-items: center;
        font-size: 36px;
        .collected{
            color: rgba(255, 187, 0, 0.795);
        }
    }
    
    .detail{
        padding: 30px;
        h3{
            font-size: 30px;
            font-weight: bold;
        }
        .duty{
            margin-top: 40px;
            p{
                font-size: 24px;
                line-height: 54px;
            }
        }
        
        
    }
    .qualifications{
        padding: 0 30px;
        h3{
            font-size: 30px;
            font-weight: bold;
        }
        div{
            margin-top: 40px;
            p{
                font-size: 24px;
                line-height: 54px;
            }
        }
    }
    .footer{
        width: 100%;
        background-color: var(--bg);
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 98px;
        border-top: 1px solid #E6E6E6;
        .van-button{
            width: 690px;
            height: 70px;
            background-color: var(--nav-active);
        }
    }
}
</style>