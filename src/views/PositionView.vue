<template>
    <div class="position">
        <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
        <!-- <van-popup v-model="showCityList" position="left">
        <ul class="province-list-wrap">
            <li class="letters" v-for="(el,index) in initial" :key="index">{{ el[0] }}
                <ol>
                    <li v-for="(ele,i) in el[1]" class="province" :key="i" :code="ele.province.code" :class="ele.province.code==province.code?'active':''" @click="changeProvince(index,i)">{{ ele.province.name }}</li>
                </ol>
            </li>
        </ul>

        <ul class="citys-list">
            <li class="city" v-for="(el,index) in initial[lettersCode][1][provinceIndex].citys" :key="index" :class="el.code==addressCode?'active':''" @click="changeCity(el.name,el.code)">{{ el.name }}</li>
        </ul>

    </van-popup> -->
        <div class="top">
            <van-search
                v-model="value"
                shape="round"
                placeholder="搜索..."
                
                left-icon=""
                show-action
                @cancel="onCancel"
            >
            <template #left>
                <span class="address">{{ address }}</span>
                <!-- <span class="address" @click="showPopup">{{ address }}</span> -->
            </template>
            <template #action>
                <span  @click="onSearch">搜索</span> 
            </template>
            </van-search>
        </div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="el in bannerImgs" :key="el._id">
                <img  :src="el.imageUrl"/>
            </van-swipe-item>
        </van-swipe>
        <div class="tab">
            <span :class="isRecommend==1?'active':''"
            @click="showPosition">推荐</span>
            <span :class="isNew==1?'active':''"
            @click="showPosition"
            >最新</span>
        </div>
        <PositionCard :positionList="positionList"></PositionCard>
        <div class="no-pos" v-if="positionList?.length==0">该城市暂无招聘信息</div>
    </div>
</template>

<script>
import { getCityList,getPositionList,getBanners } from '../apis'
import PositionCard from '@/components/PositionCard.vue'

export default {
  data() {
    return {
      value: '',
      address: '广州',
      addressCode:"440100",
      option1: [],
      isNew:1,
      isRecommend:0,
      positionList:null,
      bannerImgs:null,
      showCityList: false,
      province:{
        code:"440000",
        name:'广东省'
      },
      lettersCode:4,
      provinceIndex:1,

      initial:[],
    };
  },
  components:{
    PositionCard
  },
  methods:{
    changeCity(address,addressCode){
        console.log(address,addressCode);
        this.address = address=='广州市'?'广州':address
        this.addressCode = addressCode
        this.showCityList = false

    },
    changeProvince(lettersIndex,provinceIndex){
        console.log(lettersIndex,provinceIndex);
        this.lettersCode = lettersIndex
        this.provinceIndex = provinceIndex
        this.province = this.initial[lettersIndex][1][provinceIndex].province
    },
    showPopup() {
      this.showCityList = true;
    },
    showPosition(){
        this.isNew = this.isNew == 0?1:0
        this.isRecommend = this.isRecommend == 0?1:0
        let url = getPositionList(this.address,this.isNew,this.isRecommend,'')
        this.axios.get(url).then(res=>{
            this.positionList = res.data.data.list
        })
    },
    onSearch(){
        if(this.value.trim()){
            this.$router.push(`/search/pos?kw=${this.value}`)
        }else{
            return
        }

    },
    onCancel(){
        this.value = ''
    }
    
  },
  mounted(){
    // let url = getCityList()
    console.log(getCityList());
    this.axios.get(getCityList()).then(res=>{
        console.log(res);
        this.initial = res.data.initial
    })
    this.showPosition()
    
    let banners = getBanners()
    this.axios.get(banners).then(res=>{
        this.bannerImgs = res.data.data.info.banners;
        console.log(res);
    })
  },
  
  watch:{
    address(){
        let url = getPositionList(this.address,this.isNew,this.isRecommend,'')
        this.axios.get(url).then(res=>{
            this.positionList = res.data.data.list
        })
    }
  },
};
</script>

<style lang="scss">
.position{
    background-color: var(--bg);
    margin-bottom: 98px;
    margin-top: 150px;
    .top{
        position: fixed;
        z-index: 100;
        top: 0;
        width: 100%;
        .van-search{
        height: 150px;
        padding: 0;
        background-color: var(--nav-active);
        .van-search__content{
            width: 550px;
            height: 60px;
            align-items: center;
            padding: 10px 30px;
            font-size: 26px;
            margin-left: 29px;
        }
        .van-search__action{
            color: #fff;
            font-size: 26px;
            padding-right: 30px;
            &:active{
                background-color: transparent;
            }
        }
        .van-field__right-icon .van-icon{
            font-size: 38px !important;
        }
        .address{
            color: #fff;
            font-size: 36px;
            margin-left: 30px;
        }
        
    }
    }
    
    .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: normal;
    text-align: center;
    // background-color: #39a9ed;
    img{
        width: 100%;
    }
    }
    .van-swipe__indicator--active {
        background-color: #fff;
    }
    .tab{
        margin-top: 30px;
        span{
            display: inline-block;
            font-size: 30px;
            margin-left: 30px;
            &.active{
                color: var(--nav-active);
                position: relative;
                &::after{
                    content: '';
                    width: 30px;
                    height: 4px;
                    background-color: var(--nav-active);
                    position: absolute;
                    bottom: -20px;
                    left: 14px;
                }
            }
        }
    }
    .van-cell-group{
        margin-top: 30px;
        .van-cell__title{
            width: 78%;
            span{
                font-size: 36px;
                color: var(--title);
            }
        }
    }
    .no-pos{
        margin: 40px 30px;
    }
    .van-overlay{
        background-color: transparent;
        
    }
    .van-popup{
        width: 60%;
        height: 100%;
        display: flex;
        ul{
            width: 100%;
            font-size: 30px;
            .letters{
                padding: 10px;
                .province{
                    margin-top: 20px;
                    &.active{
                        color: var(--nav-active);
                    }
                }
            }
        }
        .citys-list{
            padding: 30px;
            .city{
            padding: 10px;
            font-size: 30px;
            &.active{
                color: var(--nav-active);
            }
        }
        }
        
    }
    
}
</style>