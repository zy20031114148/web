import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import ComponentBlog from '../views/ComponentBlog.vue';
import Articles from '../views/Articles.vue';
import About from '../views/About.vue';
import RouterDemo from '../views/RouterDemo.vue';
import Directives from '../views/Directives.vue';
import Todo from '../views/Todo.vue';

const router = createRouter({
    // 换成 History 模式，地址栏没有 # 了，刷新由 Vite 的开发服务器兜底
    history: createWebHistory(),

    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/component', name: 'component', component: ComponentBlog },
        { path: '/articles', name: 'articles', component: Articles },
        { path: '/about', name: 'about', component: About },
        { path: '/router', name: 'routerDemo', component: RouterDemo },
        { path: '/directives', name: 'directives', component: Directives },
        { path: '/todo', name: 'todo', component: Todo },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ],

    scrollBehavior(to) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' };
        }
        return { top: 0 };
    }
});

export default router;
