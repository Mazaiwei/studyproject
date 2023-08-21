<template>
    <div class="item" @click="enterChat">
        <div class="left">
            <img :src="chatItem?.postionInfo.companyInfo[0].logoUrl" alt="">
            <div class="text">
                <div class="title">{{ chatItem?.postionInfo.companyInfo[0].title }}</div>
                <p>{{ chatItem.chatContent[chatItem.chatContent.length-1].text }}</p>
            </div>
        </div>
        
        <div class="time">{{ chatItem?.time }}</div>
    </div>
</template>

<script>
export default{
    props:['chatItem'],
    methods:{
        enterChat(){
            this.$router.push(`/chat/${this.chatItem.postionInfo._id}`);
            console.log(this.chatItem);
        }
    },
}
</script>

<style lang="scss" scoped>
.item{
    display: flex;
    width: 90%;
    border-bottom: 1px solid #e5e5e5;
    align-items: center;
    padding: 28px 0;
    justify-content: space-between;
    .left{
        display: flex;
            img{
            width: 80px;
            height: 80px;
            margin-right: 28px;
        }
        .text{
            .title{
                color: var(--title);
                font-size: 34px;
                margin-bottom: 18px;
            }
            p{
                color: var(--chat-gray);
                font-size: 24px;
            }
        }
    }
    
    .time{
        color: var(--chat-gray);
        font-size: 18px;
        align-self: flex-start;

    }
}
</style>