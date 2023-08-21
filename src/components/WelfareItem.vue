<template>
    <div class="welfare-item">
        <img :src="welfareInfo.img" alt="">
        <div class="text">
            <div class="title">{{ welfareInfo.title }}</div>
            <p class="des">{{ welfareInfo.descp }}</p>
        </div>
    </div>
</template>

<script>
export default{
    props:['welfareInfo']
}
</script>

<style lang="scss" scoped>
.welfare-item{
    display: flex;
    color: var(--title);
    margin-top: 40px;
    img{
        width: 56px;
        height: 56px;
        margin-right: 54px;
    }
    .text{
        .title{
            font-size: 28px;
            margin-bottom: 28px;
            font-weight: 400;
        }
        .des{
            font-size: 20px;
            font-weight: 300;
            line-height: 36px;
        }
    }
}
</style>