/* blog.js 页面逻辑：文章渲染、搜索、留言
   文章用模板字符串拼 HTML，留言用 createElement 一个个建节点 */

let messages = [];   // 全部留言，从本地缓存读出来

// 文章列表：数据拼成模板字符串再塞进 innerHTML
function renderData(liebiao) {
    const kuang = document.getElementById('wenzhangliebiao');
    const shu = document.getElementById('wenzhangshu');

    // 数量就是数组长度
    shu.textContent = `共 ${liebiao.length} 篇文章`;

    // 一条都没有时给个提示，别留一片空白
    if (liebiao.length === 0) {
        kuang.innerHTML = '<p class="kongtishi">没有找到符合条件的文章，换个关键词或者点一下重置。</p>';
        return;
    }

    let html = '';
    liebiao.forEach(wenzhang => {
        // 有详情页的才包一层 a，没有就纯文本
        const biaoti = wenzhang.link
            ? `<a href="${wenzhang.link}">${wenzhang.title}</a>`
            : wenzhang.title;

        html += `
            <article class="wenzhang">
                <p class="wenzhangxinxi">
                    <span class="biaoqian">${wenzhang.category}</span>
                    <time>${wenzhang.date}</time>
                </p>
                <h3>${biaoti}</h3>
                <p>${wenzhang.summary}</p>
            </article>`;
    });

    kuang.innerHTML = html;
}

// 搜索：filter 过滤后重新渲染
function souSuo() {
    const guanjian = document.getElementById('sousuokey').value.trim();
    const fenlei = document.getElementById('fenlei').value;

    const jieguo = wenzhangArr.filter(wenzhang => {
        const biaotiDui = wenzhang.title.includes(guanjian);
        const fenleiDui = fenlei === '' || wenzhang.category === fenlei;
        return biaotiDui && fenleiDui;
    });

    renderData(jieguo);
}

// 重置：清空输入框和下拉，回到全部文章
function chongZhi() {
    document.getElementById('sousuokey').value = '';
    document.getElementById('fenlei').value = '';
    renderData(wenzhangArr);
}

// 留言：createElement 建节点再 append
function renderMessage() {
    const liebiao = document.getElementById('liuyanlist');
    const shu = document.getElementById('liuyanshu');

    shu.textContent = messages.length;
    liebiao.innerHTML = '';   // 每次重画，避免重复

    if (messages.length === 0) {
        const kong = document.createElement('li');
        kong.className = 'kongtishi';
        kong.textContent = '还没有留言，来做第一个吧。';
        liebiao.appendChild(kong);
        return;
    }

    messages.forEach(msg => {
        const li = document.createElement('li');
        li.className = 'liuyantiao';

        const mingzi = document.createElement('p');
        mingzi.className = 'liuyanmingzi';
        mingzi.textContent = msg.user;

        const content = document.createElement('p');
        content.className = 'liuyanneirong';
        content.textContent = msg.content;

        const shijian = document.createElement('p');
        shijian.className = 'liuyanshijian';
        shijian.textContent = msg.time;

        // 每条留言配一个删除按钮，点一下就从数组里 filter 掉自己
        const shanchuBtn = document.createElement('button');
        shanchuBtn.type = 'button';
        shanchuBtn.className = 'shanchu';
        shanchuBtn.textContent = '删除';
        shanchuBtn.addEventListener('click', function () {
            messages = messages.filter(item => item.messageId !== msg.messageId);
            saveToLocal(liuyanKey, messages);
            renderMessage();
        });

        li.append(mingzi, content, shijian, shanchuBtn);
        liebiao.appendChild(li);
    });
}

// 发表留言
function faLiuYan(event) {
    event.preventDefault();   // 先挡住表单默认的刷新

    const nicheng = document.getElementById('xm').value.trim();
    const neirong = document.getElementById('nr').value.trim();
    const tishi = document.getElementById('liuyantishi');

    if (nicheng === '' || neirong === '') {
        tishi.textContent = '昵称和留言内容都要填，不然不知道是谁说的什么。';
        tishi.className = 'liuyantishi cuo';
        return;
    }

    tishi.textContent = '';
    tishi.className = 'liuyantishi';

    messages.push({
        messageId: Date.now(),
        user: nicheng,
        content: neirong,
        time: new Date().toLocaleString('zh-CN')
    });

    saveToLocal(liuyanKey, messages);
    renderMessage();

    document.getElementById('liuyanform').reset();
}

// 页面加载完就执行
messages = getFromLocal(liuyanKey);

renderData(wenzhangArr);
renderMessage();

document.getElementById('sousuobtn').addEventListener('click', souSuo);
document.getElementById('chongzhibtn').addEventListener('click', chongZhi);

// 输入框里直接敲回车也能搜
document.getElementById('sousuokey').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        souSuo();
    }
});

document.getElementById('liuyanform').addEventListener('submit', faLiuYan);
