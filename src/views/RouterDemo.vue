<template>
    <div class="lianxi-wrap">
        <h1 class="lianxi-title">Vue Router 示例</h1>
        <p class="lianxi-tip">
            原来这个页面用的是 Hash 模式，地址后面带 #；搬进 Vite 之后改成了 History 模式，地址栏是干净的 /articles 这种，点下面的链接就能切
        </p>

        <div class="router-box">
            <nav class="router-nav">
                <router-link to="/">首页</router-link>
                <router-link to="/articles">文章</router-link>
                <router-link to="/about">关于</router-link>
            </nav>

            <div class="router-page">
                <h2>三条路由都指向真实页面</h2>
                <p>实验6 里的路由示例只有三个占位组件，这里是直接接在整站路由上的：</p>
                <ul>
                    <li>/（首页）→ 博客主页，搜索和留言板都在这一页</li>
                    <li>/articles（文章）→ 全部文章列表</li>
                    <li>/about（关于）→ 关于页，也就是左手边这一页</li>
                </ul>
                <p>导航上当前项的高亮由 router-link-active 自动加上，没写一行判断当前路径的代码。</p>
            </div>
        </div>
    </div>
</template>
