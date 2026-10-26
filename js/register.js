/* register.js 注册表单校验
   focus提示格式，blur判空+正则，submit统一检查一遍再决定能不能提交 */

var form = document.getElementById('zhuceform');
var mima1 = document.getElementById('mima');
var mima2 = document.getElementById('mima2');
var tishiMima2 = document.getElementById('tishi-mima2');
var jieguoTishi = document.getElementById('jieguotishi');

// 要用正则校验的输入框，规则都写在这，改起来方便
var shuruArr = [
    {
        id: 'yonghuming',
        zhengze: /^\w{3,16}$/,
        shuoming: '3～16 位字母、数字或下划线',
        cuowu: '用户名需为 3～16 位字母、数字或下划线。'
    },
    {
        id: 'youxiang',
        zhengze: /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/,
        shuoming: '例如 student@example.com',
        cuowu: '请输入正确的邮箱，例如 student@example.com。'
    },
    {
        id: 'shouji',
        zhengze: /^1\d{10}$/,
        shuoming: '11 位数字，1 开头',
        cuowu: '手机号需为 11 位数字，且以 1 开头。'
    },
    {
        id: 'mima',
        zhengze: /^\S{6,20}$/,
        shuoming: '6～20 位，且不能含空格',
        cuowu: '密码需为 6～20 位，且不能含空格。'
    }
];

// 显示错误：提示文字变红，输入框加红边
function xianShiCuo(input, tishi, wenZi) {
    tishi.className = 'tishi cuo';
    tishi.textContent = wenZi;
    input.classList.remove('dui');
    input.classList.add('cuo');
}

// 显示正确：提示文字变绿，输入框加绿边
function xianShiDui(input, tishi, wenZi) {
    tishi.className = 'tishi dui';
    tishi.textContent = wenZi;
    input.classList.remove('cuo');
    input.classList.add('dui');
}

// 校验单个输入框，返回true说明填对了
function jiaoYan(input, guize, tishi) {
    var zhi = input.value.trim();

    // 先判空
    if (zhi === '') {
        xianShiCuo(input, tishi, '此项不能为空。');
        return false;
    }

    // 再用正则验格式，test匹配上了返回true
    if (!guize.zhengze.test(zhi)) {
        xianShiCuo(input, tishi, guize.cuowu);
        return false;
    }

    xianShiDui(input, tishi, '填对了');
    return true;
}

// 校验确认密码，单独一个函数，提交时也能直接用
function jiaoYanMima2() {
    var zhi = mima2.value.trim();

    if (zhi === '') {
        xianShiCuo(mima2, tishiMima2, '此项不能为空。');
        return false;
    }

    // 两次密码必须完全一样
    if (zhi !== mima1.value.trim()) {
        xianShiCuo(mima2, tishiMima2, '两次输入的密码不一致。');
        return false;
    }

    xianShiDui(mima2, tishiMima2, '两次输入一致');
    return true;
}

// 循环给输入框绑focus和blur
for (let item of shuruArr) {
    let input = document.getElementById(item.id);
    let tishi = document.getElementById('tishi-' + item.id);

    // 获得焦点，提示要填成什么样
    input.addEventListener('focus', function () {
        tishi.className = 'tishi';
        tishi.textContent = item.shuoming;
    });

    // 失去焦点，判空再验格式
    input.addEventListener('blur', function () {
        jiaoYan(input, item, tishi);
    });
}

// 确认密码的提示
mima2.addEventListener('focus', function () {
    tishiMima2.className = 'tishi';
    tishiMima2.textContent = '再输一遍密码，要和上面一样';
});

mima2.addEventListener('blur', function () {
    jiaoYanMima2();
});

// 密码改了以后，如果确认密码已经填过，马上重新比一次
// 不然会一直停在上次的"两次输入一致"
mima1.addEventListener('input', function () {
    if (mima2.value.trim() !== '') {
        jiaoYanMima2();
    }
});

// 提交的时候统一验一遍
form.addEventListener('submit', function (e) {
    // 不加这句表单会刷新页面，填的东西就白填了
    e.preventDefault();

    var quanDui = true;
    var diYiGeCuo = null;      // 记下第一个没填对的框，等下光标跳过去

    // 用户名、邮箱、手机号、密码
    for (let item of shuruArr) {
        let input = document.getElementById(item.id);
        let tishi = document.getElementById('tishi-' + item.id);

        if (!jiaoYan(input, item, tishi)) {
            quanDui = false;
            if (diYiGeCuo === null) {
                diYiGeCuo = input;
            }
        }
    }

    // 两次密码要对上
    if (!jiaoYanMima2()) {
        quanDui = false;
        if (diYiGeCuo === null) {
            diYiGeCuo = mima2;
        }
    }

    if (quanDui) {
        jieguoTishi.className = 'jieguotishi dui';
        jieguoTishi.textContent = '全部校验通过，注册成功！';

        // 控制台把表单数据打出来
        console.log('表单提交的数据：', {
            用户名: document.getElementById('yonghuming').value.trim(),
            邮箱: document.getElementById('youxiang').value.trim(),
            手机号: document.getElementById('shouji').value.trim(),
            密码: mima1.value
        });
    } else {
        jieguoTishi.className = 'jieguotishi cuo';
        jieguoTishi.textContent = '请根据提示修改后再提交。';

        // 光标直接落到第一个没填对的地方
        if (diYiGeCuo !== null) {
            diYiGeCuo.focus();
        }
    }
});

// 点清空的时候把提示也一起清了
form.addEventListener('reset', function () {
    var tishiAll = document.querySelectorAll('.tishi');
    for (let t of tishiAll) {
        t.textContent = '';
        t.className = 'tishi';
    }

    var inputAll = document.querySelectorAll('.formhang input');
    for (let i of inputAll) {
        i.classList.remove('dui');
        i.classList.remove('cuo');
    }

    jieguoTishi.textContent = '';
    jieguoTishi.className = 'jieguotishi';
});
