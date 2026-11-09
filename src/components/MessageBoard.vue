<template>
    <div>
        <form action="#" @submit.prevent="faSong">
            <div class="hang">
                <label>昵称</label>
                <input type="text" ref="nicknameInput" v-model.trim="nicheng" placeholder="怎么称呼你？">
            </div>
            <div class="hang">
                <label>邮箱</label>
                <input type="email" v-model.trim="youxiang" placeholder="用于收到回复（选填）">
            </div>
            <div class="hang">
                <span class="biaoqianwenzi">谁可以看到</span>
                <label class="danxuan">
                    <input type="radio" name="kejian" value="admin" v-model="kejian"> 仅站长可见
                </label>
                <label class="danxuan">
                    <input type="radio" name="kejian" value="all" v-model="kejian"> 所有人可见
                </label>
            </div>
            <div class="hang">
                <label>想留言的话</label>
                <textarea v-model.trim="neirong" rows="5" placeholder="说点什么吧……"></textarea>
            </div>
            <div class="anniu">
                <button type="submit" class="zhuyaobtn">提交留言</button>
                <button type="button" class="cibtn" @click="qingKong">清空</button>
            </div>
            <p class="liuyantishi" v-show="tishi">{{ tishi }}</p>
        </form>

        <h3 class="liuyantitle">全部留言（{{ messages.length }} 条）</h3>
        <ul class="liuyanliebiao">
            <li class="liuyantiao" v-for="msg in messages" :key="msg.messageId">
                <p class="liuyanmingzi">{{ msg.user }}</p>
                <p class="liuyanneirong">{{ msg.content }}</p>
                <p class="liuyanshijian">{{ msg.time }}</p>
                <button type="button" class="shanchu" @click="$emit('delete', msg.messageId)">删除</button>
            </li>
            <li class="kongtishi" v-if="messages.length === 0">还没有留言，来做第一个吧。</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        messages: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    emits: ['submit', 'delete'],
    data() {
        return {
            nicheng: '',
            youxiang: '',
            neirong: '',
            kejian: 'admin',
            tishi: ''
        };
    },
    methods: {
        faSong() {
            const nicheng = this.nicheng.trim();
            const neirong = this.neirong.trim();

            if (nicheng === '' || neirong === '') {
                this.tishi = '昵称和留言内容都要填，不然不知道是谁说的什么。';
                return;
            }

            this.tishi = '';
            this.$emit('submit', { user: nicheng, content: neirong });

            this.nicheng = '';
            this.youxiang = '';
            this.neirong = '';
            this.$refs.nicknameInput.focus();
        },

        qingKong() {
            this.nicheng = '';
            this.youxiang = '';
            this.neirong = '';
            this.tishi = '';
        }
    }
};
</script>
