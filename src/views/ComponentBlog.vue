<template>
    <div>
        <section class="wenliebiao">
            <h2 class="kuaibiao">最近的文章（组件版）</h2>

            <search-bar
                :keyword="keyword"
                :fenlei="fenlei"
                :fenlei-arr="fenleiArr"
                @change-keyword="keyword = $event"
                @change-fenlei="fenlei = $event"
                @reset="resetSearch">
            </search-bar>

            <p class="wenzhangshu">共 {{ filteredArticles.length }} 篇文章</p>
            <p class="sousuotishi">{{ searchFeedback }}</p>

            <post-card
                v-for="article in filteredArticles"
                :key="article.id"
                :article="article">
            </post-card>

            <p class="kongtishi" v-if="filteredArticles.length === 0">
                没有找到符合条件的文章，换个关键词或者点一下重置。
            </p>
        </section>

        <section class="liuyanban" id="liuyanban">
            <h2 class="kuaibiao">留言板（组件版）</h2>
            <p class="liuyanshuoming">有问题或者建议都可以留言，看到会回复。</p>

            <message-board
                :messages="messages"
                @submit="addMessage"
                @delete="deleteMessage">
            </message-board>
        </section>
    </div>
</template>

<script>
import PostCard from '../components/PostCard.vue';
import SearchBar from '../components/SearchBar.vue';
import MessageBoard from '../components/MessageBoard.vue';
import { articles, categories } from '../data/articles.js';
import { getFromLocal, saveToLocal, liuyanKey } from '../utils/storage.js';

export default {
    components: {
        PostCard: PostCard,
        SearchBar: SearchBar,
        MessageBoard: MessageBoard
    },

    data() {
        return {
            articles: articles,
            fenleiArr: categories,
            keyword: '',
            fenlei: '',
            searchFeedback: '尚未输入搜索关键词。',
            messages: getFromLocal(liuyanKey)
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

        addMessage(payload) {
            this.messages.push({
                messageId: Date.now(),
                user: payload.user,
                content: payload.content,
                time: new Date().toLocaleString('zh-CN')
            });

            saveToLocal(liuyanKey, this.messages);
        },

        deleteMessage(id) {
            this.messages = this.messages.filter(item => item.messageId !== id);
            saveToLocal(liuyanKey, this.messages);
        }
    }
};
</script>
