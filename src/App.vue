<template>
    <header class="topbar">
        <div class="neikuang">
            <h1 class="zhanming"><router-link to="/">个人博客</router-link></h1>

            <nav class="daohang">
                <ul>
                    <li><router-link to="/" exact-active-class="dangqian">首页</router-link></li>
                    <li><router-link to="/articles" active-class="dangqian">文章</router-link></li>
                    <li><router-link to="/about" active-class="dangqian">关于我</router-link></li>
                    <li><router-link to="/#liuyanban">留言板</router-link></li>
                </ul>
            </nav>

            <details class="mobile-menu">
                <summary>菜单</summary>
                <nav>
                    <ul>
                        <li><router-link to="/">首页</router-link></li>
                        <li><router-link to="/articles">文章</router-link></li>
                        <li><router-link to="/about">关于我</router-link></li>
                        <li><router-link to="/#liuyanban">留言板</router-link></li>
                    </ul>
                </nav>
            </details>

            <div class="huanfu" @mouseenter="showTheme = true" @mouseleave="showTheme = false">
                <button type="button" class="huanfubtn" @click="toggleNight">更换皮肤</button>
                <ul class="zhutiliebiao" :class="{ xianshi: showTheme }">
                    <li><button type="button" @click="setTheme('theme-red')">红色系</button></li>
                    <li><button type="button" @click="setTheme('theme-blue')">蓝色系</button></li>
                    <li><button type="button" @click="setTheme('theme-light')">还原主题</button></li>
                </ul>
            </div>
        </div>
    </header>

    <section class="hengfu">
        <div class="neikuang">
            <p class="xiaobiaoti">LEARNING JOURNAL</p>
            <h2 class="dabiaoti">重修Web，记录学习，也记录生活。</h2>
        </div>
    </section>

    <main class="zhuti neikuang">

        <div class="zuo">
            <router-view></router-view>
        </div>

        <aside class="you" id="guanyu">

            <section class="mokuai">
                <h3>练习页面</h3>
                <ul class="biji">
                    <li><router-link to="/">博客主页（Vue 重构）</router-link></li>
                    <li><router-link to="/component">博客主页（组件版）</router-link></li>
                    <li><router-link to="/articles">全部文章</router-link></li>
                    <li><router-link to="/router">Vue Router 示例</router-link></li>
                    <li><router-link to="/directives">Vue 指令练习</router-link></li>
                    <li><router-link to="/todo">待办事项 TodoList</router-link></li>
                </ul>
            </section>

            <section class="mokuai">
                <h3>实验2 到 4 的页面</h3>
                <ul class="biji">
                    <li><a href="/archive.html">文章归档</a></li>
                    <li><a href="/article.html">HTML 常用标签</a></li>
                    <li><a href="/score.html">成绩统计</a></li>
                    <li><a href="/register.html">注册校验</a></li>
                    <li><a href="/basic.html">JS 语法练习</a></li>
                </ul>
            </section>

            <section class="mokuai">
                <h3>关于我</h3>
                <figure class="touxiang">
                    <img src="https://picsum.photos/seed/avatar7/96/96" alt="我的头像">
                </figure>
                <p class="wo">大四重修 · 计算机应用专业</p>
                <p>Web基础重修中，重新过一遍标签和样式，顺便记点东西。争取这次把它学扎实。</p>
            </section>

            <section class="mokuai">
                <h3>博客统计</h3>
                <table class="tongji">
                    <tbody>
                        <tr><td>文章总数</td><td>7 篇</td></tr>
                        <tr><td>分类</td><td>学习 / 日常 / 随想</td></tr>
                        <tr><td>建站时间</td><td>2026-09-01</td></tr>
                        <tr><td>最近更新</td><td>2026-10-06</td></tr>
                    </tbody>
                </table>
            </section>

            <section class="mokuai">
                <h3>学习记录</h3>
                <p>博客的几个练习阶段：</p>
                <table class="jieduan">
                    <tbody>
                        <tr>
                            <th>阶段</th>
                            <th>内容</th>
                        </tr>
                        <tr>
                            <td>第一步</td>
                            <td>HTML 结构</td>
                        </tr>
                        <tr>
                            <td>第二步</td>
                            <td>基础 CSS</td>
                        </tr>
                        <tr>
                            <td>第三步</td>
                            <td>Flex 布局</td>
                        </tr>
                        <tr>
                            <td>第四步</td>
                            <td>Vue 重构</td>
                        </tr>
                        <tr>
                            <td>第五步</td>
                            <td>组件 + 路由 + Vite</td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </aside>
    </main>

    <footer class="dibu">
        <p>&copy; 2026 个人博客 · 大四Web重修记录</p>
    </footer>
</template>

<script>
// 换肤还是加 body 的类名，和实验3 一样，只是改成由 Vue 管状态
const zhutiArr = ['theme-light', 'theme-red', 'theme-blue', 'night'];

export default {
    data() {
        return {
            showTheme: false
        };
    },

    mounted() {
        let cunDe = null;
        try {
            cunDe = localStorage.getItem('zhuti');
        } catch (e) {
            return;
        }

        if (cunDe && zhutiArr.indexOf(cunDe) > -1) {
            this.applyTheme(cunDe);
        }
    },

    methods: {
        applyTheme(cls) {
            for (let i = 0; i < zhutiArr.length; i++) {
                document.body.classList.remove(zhutiArr[i]);
            }

            if (cls) {
                document.body.classList.add(cls);
            }

            try {
                localStorage.setItem('zhuti', cls || 'theme-light');
            } catch (e) {
                // 存不了就算了，不影响当前页面
            }
        },

        setTheme(cls) {
            this.applyTheme(cls);
            this.showTheme = false;
        },

        toggleNight() {
            const shiShenSe = document.body.classList.contains('night');
            this.applyTheme(shiShenSe ? 'theme-light' : 'night');
        }
    }
};
</script>
