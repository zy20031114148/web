/* 文章数据，从实验5 的 data.js 搬过来，改成 export 给组件用 */

export const categories = ['学习', '日常', '随想'];

export const articles = [
    {
        id: 1,
        title: '成绩统计（鼠标事件）',
        category: '学习',
        date: '2026-10-15',
        summary: '这个页面把班里的分数整理了一下，选个及格线就能统计及格人数和及格率，顺便练了 click 和 mouseenter 两个鼠标事件。',
        link: 'score.html'
    },
    {
        id: 2,
        title: 'JS基础语法练习',
        category: '学习',
        date: '2026-10-12',
        summary: '变量、数据类型、循环、函数、模板字符串，还有几个ES6的解构和扩展运算符，都写成小例子打印在控制台里了。',
        link: 'basic.html'
    },
    {
        id: 3,
        title: '折腾博客模板',
        category: '随想',
        date: '2026-10-06',
        summary: '把页面布局从最开始的上下堆叠改成了左右分栏，顺便用 flex 重写了导航条和留言板。中间样式覆盖来覆盖去，改到快十二点才好。不过看到页面一点点变成自己想要的样子，还是挺值的。',
        link: ''
    },
    {
        id: 4,
        title: '重修考试临近',
        category: '日常',
        date: '2026-09-25',
        summary: '这几周一直在复习，博客更得慢了。Web重修加上另一门课，复习时间被切得很碎。先把Web前几章的笔记翻出来重新过了一遍，希望能过吧。',
        link: ''
    },
    {
        id: 5,
        title: '初识CSS',
        category: '学习',
        date: '2026-09-14',
        summary: '这周开始学CSS。选择器先记了类选择器、id选择器、后代选择器和伪类 :hover。属性方面试了颜色、字体、背景和边框。改完代码刷新一下就能看到效果，还挺有成就感的。',
        link: ''
    },
    {
        id: 6,
        title: '用HTML搭建文章结构',
        category: '学习',
        date: '2026-09-07',
        summary: '这周把常用标签过了一遍：用 h1~h6 组织标题层级，用 p 写段落，用 a 做链接跳转，用 ul/li 写列表。另外还有语义化标签 header、nav、main、footer，比起满屏的 div，语义化标签读起来清楚多了。',
        link: 'article.html'
    },
    {
        id: 7,
        title: '我的第一篇博客',
        category: '学习',
        date: '2026-09-01',
        summary: '大四还要回来重修Web，想想都觉得丢人。既然躲不掉，干脆认真一点。开个博客把每次课学的东西记下来，免得再混过去一遍。这次就当从零开始吧。',
        link: ''
    }
];
