<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import Bus from '../../common/js/eventBus';
    export default{
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {}
        },
        methods: {
            addCart(event) {
                // 防止多次被点击
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    // 添加food不存在的字段时 需要调用vue.set方法添加，这样才可以通过vue观测到这个字段的变化
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                Bus.$emit('cart.add', event.target);
            },
            decreaseCart(event) {
                // 防止多次被点击
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .cartcontrol {
        font-size: 0;
        .cart-decrease {
            display: inline-block;
            padding: 6px;
            .inner {
                display: inline-block;
                line-height: 24px;
                font-size: 24px;
                color: rgb(0, 160, 220);
            }
            &.move-enter-active, &.move-leave-active {
                transition: all .5s;
                transform: translate3d(0, 0, 0);
                .inner{
                    transition: all .5s;
                    transform: rotate(0deg);
                }
            }
            &.move-enter, &.move-leave-active {
                opacity: 0;
                transform: translate3d(24px, 0, 0);
                .inner{
                    transform: rotate(180deg);
                }
            }
        }
        .cart-count {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159);
        }
        .cart-add {
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            padding: 6px;
            color: rgb(0, 160, 220);
        }
    }
</style>