<template>
    <div class="lianxi-wrap">
        <h1 class="lianxi-title">Vue3 常用指令练习</h1>
        <p class="lianxi-tip">对照《实验5-1 Vue常用指令基本用法示例》逐个敲的，左侧导航能切回博客</p>

        <section class="lianxi-block">
            <h2>一、v-bind（简写 :）—— class 与 style 绑定</h2>

            <p :class="myClass">绑定 class：普通变量（Vue.js 是渐进式前端框架）</p>
            <p :class="classObject">绑定 class：对象形式（Vue 单页应用开发）</p>
            <div :class="{ active: isActive }">
                绑定 class：对象里放布尔值，决定这个类名加不加
            </div>
            <div :class="[classA, classB]">绑定 class：数组，两个样式都生效</div>
            <p :style="{ color: ziti, fontSize: zihao + 'px' }">绑定 style：颜色和字号都由数据控制</p>

            <button type="button" @click="isActive = !isActive">切换 active</button>
            <p class="lianxi-out">isActive 现在是：{{ isActive }}</p>
        </section>

        <section class="lianxi-block">
            <h2>二、v-if / v-else / v-else-if</h2>

            <div v-if="flag">
                <h4>template 模板内容</h4>
                <p>flag 为真，显示这块，flag 为假时这块 DOM 会被销毁</p>
            </div>
            <div v-else>flag 为假，显示这块</div>

            <p>成绩：{{ score }} 分</p>
            <h3 v-if="score >= 90">结果：优秀！</h3>
            <h3 v-else-if="score >= 60">结果：合格！</h3>
            <h3 v-else>结果：不合格，请补考！！</h3>

            <button type="button" @click="flag = !flag">切换 flag</button>
            <button type="button" @click="score = 95">改成 95 分</button>
            <button type="button" @click="score = 65">改成 65 分</button>
            <button type="button" @click="score = 45">改成 45 分</button>
        </section>

        <section class="lianxi-block">
            <h2>三、v-show（和 v-if 的区别：只改 display，DOM 一直留着）</h2>

            <div v-show="flag">
                <p>flag 为真时能看到这块内容</p>
            </div>
            <p class="lianxi-out">当前 flag：{{ flag }}，按 F12 看这块元素其实还在，只是 display 变了</p>
        </section>

        <section class="lianxi-block">
            <h2>四、v-for</h2>

            <h4>（1）遍历对象数组</h4>
            <ul>
                <li v-for="(item, index) in items" :key="item.id">
                    {{ index + 1 }} - {{ item.bookName }} - {{ item.press }} - {{ item.author }}
                </li>
            </ul>

            <h4>（2）遍历对象（注意参数顺序是 value, key, index）</h4>
            <ul>
                <li v-for="(value, key, index) in stu" :key="key">
                    {{ index + 1 }} - {{ key }}：{{ value }}
                </li>
            </ul>
        </section>

        <section class="lianxi-block">
            <h2>五、v-on（简写 @）</h2>

            <p>属性值是表达式：计数器为 {{ count }}</p>
            <button type="button" @click="count += 1">开始计数 - {{ count }}</button>

            <p>属性值是方法：当前日期为 {{ now || '还没点' }}</p>
            <button type="button" @click="newDate">显示日期</button>

            <p>属性值是带参数的方法：{{ numArr.length ? numArr.join('、') : '还没生成' }}</p>
            <button type="button" @click="createRndNum6(100, 300)">产生 6 个随机整数</button>

            <p>用 $event 拿原生事件对象：{{ information || '还没点' }}</p>
            <button type="button" @click="showInfo1('用 $event 传进来的', $event)">带 $event 参数</button>
        </section>

        <section class="lianxi-block">
            <h2>六、v-model 双向绑定</h2>

            <p>
                姓名：<input type="text" v-model="myName" placeholder="输入姓名">
                → {{ myName || '（还没输入）' }}
            </p>

            <p>兴趣与爱好：{{ checkMyLove.length ? checkMyLove.join('、') : '（还没选）' }}</p>
            <label><input type="checkbox" value="绘画" v-model="checkMyLove"> 绘画</label>
            <label><input type="checkbox" value="网络小说" v-model="checkMyLove"> 网络小说</label>
            <label><input type="checkbox" value="音乐" v-model="checkMyLove"> 音乐</label>

            <p>性别：{{ sex || '（还没选）' }}</p>
            <label><input type="radio" value="男" v-model="sex"> 男</label>
            <label><input type="radio" value="女" v-model="sex"> 女</label>

            <h4>三个修饰符</h4>
            <p>姓名（.lazy，失焦才同步）：<input type="text" v-model.lazy="name" placeholder="输入姓名"></p>
            <p>学号（.number，转成数字）：<input type="number" v-model.number="myNo" placeholder="输入学号"></p>
            <p>教学意见（.trim，去首尾空格）：</p>
            <textarea v-model.trim="myIdea" rows="3" placeholder="输入意见"></textarea>

            <p class="lianxi-out">
                姓名：{{ name || '（空）' }} ｜ 学号：{{ myNo === '' ? '（空）' : myNo }}（{{ typeof myNo }}） ｜
                意见：{{ myIdea || '（空）' }}
            </p>
        </section>

        <section class="lianxi-block">
            <h2>七、v-html 与 v-text</h2>

            <!-- v-text 会盖掉标签里原有的文字，所以元素里不写内容 -->
            <p v-text="msg"></p>
            <p>插值写法对比：{{ msg }}</p>

            <p v-text="htmlStr"></p>
            <p v-html="htmlStr"></p>

            <p class="lianxi-out">v-text 不解析标签，v-html 解析但有 XSS 风险，别拿它渲染用户输入。</p>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            myClass: 'red',
            classObject: { class1: true, class2: true },
            classA: 'class1',
            classB: 'class2',
            isActive: true,
            ziti: '#2e6e4e',
            zihao: 16,

            flag: true,
            score: 65,

            items: [
                { id: 1, bookName: '计算机网络', press: '清华社', author: '张功萱' },
                { id: 2, bookName: 'Vue.js前端框架技术与实战', press: '清华社', author: '储久良' },
                { id: 3, bookName: 'HTML+CSS+JavaScript页面设计', press: '电子社', author: '王大松' }
            ],
            stu: { name: 'James', age: 19, city: 'Chongqing' },

            count: 0,
            now: '',
            numArr: [],
            information: '',

            myName: '',
            checkMyLove: [],
            sex: '',
            name: '',
            myNo: '',
            myIdea: '',

            msg: 'Hello v-text',
            htmlStr: '<span style="color:red">红色文字</span>'
        };
    },

    methods: {
        newDate() {
            this.now = new Date().toLocaleDateString();
        },

        createRndNum6(start, end) {
            const arr = [];
            for (let i = 0; i < 6; i++) {
                arr.push(Math.floor(Math.random() * (end - start) + start));
            }
            this.numArr = arr;
        },

        showInfo1(message, event) {
            if (event) {
                event.preventDefault();
            }
            this.information = message + '，当前点击的元素是 <' + event.target.tagName.toLowerCase() + '>';
        }
    }
};
</script>
