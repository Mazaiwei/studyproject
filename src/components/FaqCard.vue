<template>
    <div class="faq-card">
        <p class="question">
            Q:{{ faq.title }}
        </p>
        <p class="answer">
            A:{{ faq.shortCut }}
        </p>
    </div>
</template>

<script>
export default{
    props:['faq']
}
</script>

<style lang="scss" scoped>
.faq-card{
    margin-bottom: 30px;
    box-shadow: 0px 6px 21px 0px rgba(1,64,153,0.22);
    padding: 15px;
    border-radius: 20px;
    .question{
        font-size: 36px;
    }
    .answer{
        margin-top: 15px;
        font-size: 28px;
        max-height: 200px;
        overflow: auto;
        scrollbar-width: none; /* Firefox隐藏滚动条 */
        -ms-overflow-style: none; /* Internet Explorer 10+隐藏滚动条 */
        &::-webkit-scrollbar {
            width: 0;      /* Safari,Chrome 隐藏滚动条 */
            height: 0;     /* Safari,Chrome 隐藏滚动条 */
            display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
    }
}
</style>