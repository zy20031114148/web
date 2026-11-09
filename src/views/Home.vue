<template>
    <div>
        <section class="wenliebiao">
            <h2 class="kuaibiao">最近的文章</h2>

            <div class="sousuo">
                <input type="text" v-model.trim="keyword" placeholder="输入标题关键词">
                <select v-model="fenlei">
                    <option value="">全部分类</option>
                    <option v-for="lei in fenleiArr" :key="lei" :value="lei">{{ lei }}</option>
                </select>
                <button type="button" class="cibtn" @click="resetSearch">重置</button>
            </div>

            <p class="wenzhangshu">共 {{ filteredArticles.length }} 篇文章</p>
            <p class="sousuotishi">{{ searchFeedback }}</p>

            <article class="wenzhang" v-for="article in filteredArticles" :key="article.id">
                <p class="wenzhangxinxi">
                    <span class="biaoqian">{{ article.category }}</span>
                    <time>{{ article.date }}</time>
                </p>
                <h3>
                    <a v-if="article.link" :href="article.link">{{ article.title }}</a>
                    <span v-else>{{ article.title }}</span>
                </h3>
                <p>{{ article.summary }}</p>
            </article>

            <p class="kongtishi" v-if="filteredArticles.length === 0">
                没有找到符合条件的文章，换个关键词或者点一下重置。
            </p>
        </section>

        <section class="liuyanban" id="liuyanban">
            <h2 class="kuaibiao">留言板</h2>
            <p class="liuyanshuoming">有问题或者建议都可以留言，看到会回复。</p>

            <form action="#" @submit.prevent="addMessage">
                <div class="hang">
                    <label for="xm">昵称</label>
                    <input type="text" id="xm" ref="nicknameInput" v-model.trim="nicheng" placeholder="怎么称呼你？">
                </div>
                <div class="hang">
                    <label for="yx">邮箱</label>
                    <input type="email" id="yx" v-model.trim="youxiang" placeholder="用于收到回复（选填）">
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
                    <label for="nr">想留言的话</label>
                    <textarea id="nr" v-model.trim="neirong" rows="5" placeholder="说点什么吧……"></textarea>
                </div>
                <div class="anniu">
                    <button type="submit" class="zhuyaobtn">提交留言</button>
                    <button type="button" class="cibtn" @click="clearForm">清空</button>
                </div>

                <p class="liuyantishi" v-show="tishi">{{ tishi }}</p>
            </form>

            <h3 class="liuyantitle">全部留言（{{ messages.length }} 条）</h3>
            <ul class="liuyanliebiao">
                <li class="liuyantiao" v-for="msg in messages" :key="msg.messageId">
                    <p class="liuyanmingzi">{{ msg.user }}</p>
                    <p class="liuyanneirong">{{ msg.content }}</p>
                    <p class="liuyanshijian">{{ msg.time }}</p>
                    <button type="button" class="shanchu" @click="deleteMessage(msg.messageId)">删除</button>
                </li>
                <li class="kongtishi" v-if="messages.length === 0">还没有留言，来做第一个吧。</li>
            </ul>
        </section>
    </div>
</template>

<script>
import { articles, categories } from '../data/articles.js';
import { getFromLocal, saveToLocal, liuyanKey } from '../utils/storage.js';

export default {
    data() {
        return {
            articles: articles,
            fenleiArr: categories,

            keyword: '',
            fenlei: '',
            searchFeedback: '尚未输入搜索关键词。',

            messages: getFromLocal(liuyanKey),
            nicheng: '',
            youxiang: '',
            neirong: '',
            kejian: 'admin',
            tishi: ''
        };
    },

    computed: {
        filteredArticles() {
            const guanjian = this.keyword.trim();

            return this.articles.filter(article => {
                const biaotiDui = article.title.includes(guanjian);
                const fenleiDui = this.fenlei === '' || article.category === this.fenlei;
                return biaotiDui && fenleiDui;
            });
        }
    },

    watch: {
        keyword(newValue, oldValue) {
            if (newValue.trim() === '') {
                this.searchFeedback = '尚未输入搜索关键词。';
            } else {
                this.searchFeedback = '关键词从“' + oldValue + '”变成“' + newValue +
                    '”，找到 ' + this.filteredArticles.length + ' 篇。';
            }
        },

        fenlei(newValue) {
            if (newValue === '') {
                this.searchFeedback = '已显示全部分类。';
            } else {
                this.searchFeedback = '正在查看“' + newValue + '”分类，共 ' +
                    this.filteredArticles.length + ' 篇。';
            }
        }
    },

    methods: {
        resetSearch() {
            this.keyword = '';
            this.fenlei = '';
            this.searchFeedback = '尚未输入搜索关键词。';
        },

        addMessage() {
            const nicheng = this.nicheng.trim();
            const neirong = this.neirong.trim();

            if (nicheng === '' || neirong === '') {
                this.tishi = '昵称和留言内容都要填，不然不知道是谁说的什么。';
                return;
            }

            this.tishi = '';

            this.messages.push({
                messageId: Date.now(),
                user: nicheng,
                content: neirong,
                time: new Date().toLocaleString('zh-CN')
            });

            saveToLocal(liuyanKey, this.messages);

            this.nicheng = '';
            this.youxiang = '';
            this.neirong = '';
            this.$refs.nicknameInput.focus();
        },

        deleteMessage(id) {
            this.messages = this.messages.filter(item => item.messageId !== id);
            saveToLocal(liuyanKey, this.messages);
        },

        clearForm() {
            this.nicheng = '';
            this.youxiang = '';
            this.neirong = '';
            this.tishi = '';
        }
    }
};
</script>
