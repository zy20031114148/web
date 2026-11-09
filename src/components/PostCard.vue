<template>
    <article class="wenzhang">
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
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    }
};
</script>
