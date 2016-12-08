<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
    import header from 'components/header/header';
    import {urlParse} from 'common/js/util';
    const ERR_OK = 0;
    export default {
        data() {
            return {
                seller: {
                    id: (() => {
                        let queryParam = urlParse();
                        return queryParam.id;
                    })()
                }
            }
        },
        created() {
            this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    // 相当于 extend方法 扩展  es6语法   vue推荐的给对象扩展属性方法
                    this.seller = Object.assign({}, this.seller, response.data);
                }
            })
        },
        components: {
            'v-header': header
        }
    };

</script>

<style rel="stylesheet/scss" lang="scss" scope>

    @import "common/scss/mixins";

    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        @include border-1px(rgba(7, 17, 27, 0.1));

        .tab-item {
            flex: 1;
            text-align: center;

            & > a {
                display: block;
                font-size: 14px;
                color: rgb(77, 85, 93);

                &.active {
                    color: rgb(240, 20, 20)
                }
            }
        }
    }
</style>
