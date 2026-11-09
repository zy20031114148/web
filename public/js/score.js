/* score.js 成绩统计
   选个及格线，点按钮（或者鼠标移上去）就能统计 */

var mingdan = document.getElementById('mingdan');
var jigexian = document.getElementById('jigexian');
var tongjiBtn = document.getElementById('tongjibtn');
var jieguo = document.getElementById('jieguo');

// 名单里每个li的data-fenshu存着分数，先全取出来
var xuesheng = mingdan.querySelectorAll('li');

function tongji() {
    var xian = parseInt(jigexian.value);      // 当前选的及格线，字符串转数字
    var zongfen = 0;
    var zongshu = xuesheng.length;
    var max = 0;
    var min = 100;
    var jigeRenshu = 0;
    var jigeMingdan = [];

    for (var i = 0; i < zongshu; i++) {
        var fenshu = parseInt(xuesheng[i].getAttribute('data-fenshu'));
        zongfen += fenshu;

        if (fenshu > max) {
            max = fenshu;
        }
        if (fenshu < min) {
            min = fenshu;
        }

        // 够及格线的记下来，名字后面顺便加个绿色
        if (fenshu >= xian) {
            jigeRenshu++;
            jigeMingdan.push(xuesheng[i].textContent);
            xuesheng[i].classList.add('jige');
        } else {
            xuesheng[i].classList.remove('jige');
        }
    }

    // 拼一段结果显示到页面上
    jieguo.innerHTML = `
        <p>全班一共 <strong>${zongshu}</strong> 人</p>
        <p>平均分：<strong>${(zongfen / zongshu).toFixed(1)}</strong> 分</p>
        <p>最高分：<strong>${max}</strong> 分，最低分：<strong>${min}</strong> 分</p>
        <p>${xian} 分以上的有 <strong>${jigeRenshu}</strong> 人</p>
        <p>及格率：<strong>${((jigeRenshu / zongshu) * 100).toFixed(0)}%</strong></p>
        <p>及格的同学：${jigeMingdan.join('、') || '一个都没有'}</p>
    `;

    console.log('及格线' + xian + '，及格' + jigeRenshu + '人：', jigeMingdan);
}

// 点击按钮统计
tongjiBtn.onclick = tongji;

// 鼠标移上去也统计一次
tongjiBtn.addEventListener('mouseenter', tongji);
