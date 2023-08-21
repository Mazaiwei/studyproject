<template>
    <div class="help">
        <div class="top">
            <van-icon name="arrow-left" @click="goBack" />
            <span>附件简历</span>
        </div>
        <h3>有任何意见及建议请发邮箱：978735584@qq.com</h3>
    </div>
</template>

<script>
export default{
    methods:{
        goBack(){
            this.$router.go(-1)

        }
    }
}
</script>

<style lang="scss" scoped>
.help{
    background-color: var(--bg);
    .top{
        color: #fff;
        width: 100%;
        font-size: 36px;
        background-color: var(--nav-active);
        height: 98px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        .van-icon{
            position: absolute;
            left: 30px;
        }
    }
    h3{
        margin-top: 228px;
        text-align: center;
    }
}
</style>