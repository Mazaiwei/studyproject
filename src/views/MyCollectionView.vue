<template>
    <div class="collection">
        <div class="top">
            <div class="title">
                <van-icon name="arrow-left" @click="goBack" />
                <span>我的收藏</span>
            </div>
            <div class="tab">
                <div class="pos" @click="current='position'" :class="current=='position'?'active':''">岗位收藏</div>
                <div class="comp" @click="current='company'" :class="current=='company'?'active':''">公司收藏</div>
            </div>
            
        </div>
        <div class="pos-list" v-show="current=='position'">
            <PositionCard :positionList="posList"></PositionCard>
        </div>
        <div class="comp-list" v-show="current=='company'">
            <CompanyInfoCard :companyList="compList"/>
        </div>
    </div>
</template>

<script>
import PositionCard from '@/components/PositionCard.vue'
import CompanyInfoCard from '@/components/CompanyInfoCard.vue'

export default{
    props:['collectionList','collectionCompanyList'],
    data(){
        return{
            current:'position',
            posList:[],
            compList:[]
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
    },
    mounted(){
        if(sessionStorage.getItem('collectionList')){
            JSON.parse(sessionStorage.getItem('collectionList')).forEach(element => {
                this.posList.push(element.info)
            });
        }
        if(sessionStorage.getItem('collectionCompanyList')){
            JSON.parse(sessionStorage.getItem('collectionCompanyList')).forEach(element => {
                this.compList.push(element.info)
            });
        }
    },
    components:{
        PositionCard,
        CompanyInfoCard
    }
}
</script>

<style lang="scss">
.collection{
    background-color: var(--bg);
    .top{
        background-color: var(--nav-active);
        width: 100%;
        height: 178px;
        padding: 45px 30px 0;
        color: #fff;
        .title{
            font-size: 36px;
            display: flex;
            justify-content: center;
            position: relative;
            .van-icon{
                position: absolute;
                left: 0;
            }
        }
        .tab{
            display: flex;
            margin-top: 40px;
            div{
                flex: 1;
                font-size: 30px;
                color: #fff;
                display: flex;
                justify-content: center;
                position: relative;
                &.active{
                    color: #fff;
                    &::after{
                        content: '';
                        display: block;
                        background-color: #fff;
                        width: 30px;
                        height: 4px;
                        position: absolute;
                        bottom: -16px;
                        left: 160px;
                    }
                }
            }
        }
    }
    .pos-list{
        margin-top: 30px;
        .van-cell{
            justify-content: space-between;
        }
    }
    .comp-list{
        margin-top: 30px;
        padding: 0 30px;
    }
}
</style>