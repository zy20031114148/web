<template>
    <section class="wenliebiao">
        <h2 class="kuaibiao">全部文章</h2>
        <p class="wenzhangshu">共 {{ list.length }} 篇，数据来自 src/data/articles.js</p>

        <post-card v-for="article in list" :key="article.id" :article="article"></post-card>
    </section>
</template>

<script>
import PostCard from '../components/PostCard.vue';
import { articles } from '../data/articles.js';

export default {
    components: { PostCard: PostCard },

    data() {
        return {
            list: articles
        };
    }
};
</script>
