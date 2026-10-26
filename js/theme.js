/* theme.js 换肤
   这个js是放在body末尾引入的，那时候页面元素都已经有了，直接用
   如果放在head里就得包一层window.onload，不然取到的是null */

// 所有跟皮肤有关的类名，切换前先按这个数组清理
var zhutiArr = ['theme-light', 'theme-red', 'theme-blue', 'night'];

// 页面打开时先把上次选的皮肤读出来，这样跳页面也能保持住
// 放在localStorage里的东西，隐私模式下可能不让用，所以包一层try
function duZhuTi() {
    var cunDe = null;
    try {
        cunDe = localStorage.getItem('zhuti');
    } catch (e) {
        return;
    }

    // 存的类名得是认识的才用，免得老数据把页面搞乱
    if (cunDe && zhutiArr.indexOf(cunDe) > -1) {
        for (var i = 0; i < zhutiArr.length; i++) {
            document.body.classList.remove(zhutiArr[i]);
        }
        document.body.classList.add(cunDe);
    }
}

// 换完皮肤把当前的存一下
function cunZhuTi() {
    var dangqianZhuti = '';
    for (var i = 0; i < zhutiArr.length; i++) {
        if (document.body.classList.contains(zhutiArr[i])) {
            dangqianZhuti = zhutiArr[i];
        }
    }

    if (dangqianZhuti === '') {
        return;
    }

    try {
        localStorage.setItem('zhuti', dangqianZhuti);
    } catch (e) {
        // 存不了就算了，不影响当前页面
    }
}

// 页面一加载就应用上次的皮肤
duZhuTi();

// 换肤按钮：判断当前是不是深色，是就换回浅色，不是就换深色
var huanfuBtn = document.getElementById('huanfubtn');

// querySelector取的是符合选择器条件的第一个元素
var dangqian = document.querySelector('.daohang a.dangqian');
console.log('当前在的页面：', dangqian ? dangqian.textContent : '没找到');

huanfuBtn.onclick = function () {
    // 先看现在是不是深色（night就是深色）
    var shiShenSe = document.body.classList.contains('night');

    // 把旧主题清干净，不然会叠在一起
    for (var i = 0; i < zhutiArr.length; i++) {
        document.body.classList.remove(zhutiArr[i]);
    }

    if (shiShenSe) {
        document.body.classList.add('theme-light');
    } else {
        document.body.classList.add('night');
    }

    console.log('点了一下换肤，现在body的类名是：', document.body.className);
    cunZhuTi();
};

// 鼠标移入弹出二级菜单，移出收起来
var huanfu = document.getElementById('huanfu');
var zhutiList = document.getElementById('zhutilist');

huanfu.addEventListener('mouseenter', function () {
    zhutiList.classList.add('xianshi');
});

huanfu.addEventListener('mouseleave', function () {
    zhutiList.classList.remove('xianshi');
});

// 批量给三个主题按钮绑事件
// querySelectorAll拿到的是一个集合，用for循环一个个绑
var zhutiBtns = document.querySelectorAll('#zhutilist button');

for (var i = 0; i < zhutiBtns.length; i++) {
    zhutiBtns[i].onclick = function () {
        // 先把之前那套主题的类名全部清掉
        for (var j = 0; j < zhutiArr.length; j++) {
            document.body.classList.remove(zhutiArr[j]);
        }
        // 按钮上写了data-zhuti，点哪个就加哪个类名
        var ming = this.getAttribute('data-zhuti');
        document.body.classList.add(ming);
        console.log('换成了：' + ming);

        // 存起来，跳页面也不丢
        cunZhuTi();

        // 选完把菜单收回去
        zhutiList.classList.remove('xianshi');
    };
}
