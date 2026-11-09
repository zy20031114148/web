/* basic.js 基础语法和ES6练习
   按F12打开控制台Console，下面这些都会打印在那里 */

console.log('===== 1、常量和变量 =====');
const PI = 3.14159;                 // const定义的不能改
let age = 18;                        // let定义的可以改
age = 22;
console.log('PI:', PI, 'age:', age);

console.log('===== 2、数据类型 =====');
let web = 'www.cqut.edu.cn';         // 字符串
let balance = 100;                   // 整数
let weight = 60.5;                   // 小数
let isPass = true;                   // 布尔
console.log('字符串:', web, '整数:', balance, '小数:', weight, '布尔:', isPass);

// 对象：拿一篇博客文章当例子
const wenzhang = {
    biaoti: '用HTML搭建文章结构',
    zishu: 1200,
    fenlei: '学习',
    zhengwen: function () {
        return '这是一篇讲HTML标签的文章';
    }
};
console.log('文章对象:', wenzhang);
console.log('调用对象里的方法:', wenzhang.zhengwen());

// 数组
let biaoqianArr = ['学习', '日常', '随想'];
let fenshu = [72, 45, 88, 91, 60];
console.log('标签数组:', biaoqianArr);
console.log('分数数组:', fenshu);

console.log('===== 3、数组的操作 =====');
biaoqianArr.push('转载');            // 末尾加一个
console.log('push之后:', biaoqianArr);
biaoqianArr.pop();                   // 删掉末尾那个
console.log('pop之后:', biaoqianArr);

// 普通for循环
console.log('普通for循环打印分数:');
for (let i = 0; i < fenshu.length; i++) {
    console.log('第' + (i + 1) + '个:' + fenshu[i]);
}

// for...of
console.log('for...of遍历:');
for (let item of fenshu) {
    console.log(item);
}

// forEach，箭头函数当回调
console.log('forEach遍历:');
fenshu.forEach((value, index) => {
    console.log('下标' + index + '的值是' + value);
});

console.log('===== 4、条件结构 =====');
if (fenshu[0] >= 60) {
    console.log(fenshu[0] + '分，及格了');
} else {
    console.log(fenshu[0] + '分，没及格');
}

// 统计及格人数
let jigeShu = 0;
for (let i = 0; i < fenshu.length; i++) {
    if (fenshu[i] >= 60) {
        jigeShu++;
    }
}
console.log('及格人数:', jigeShu);

console.log('===== 5、函数 =====');
// 普通函数
function add(a, b) {
    return a + b;
}
console.log('add(1,2):', add(1, 2));

// 匿名函数存到变量里
const sub = function (x, y) {
    return x - y;
};
console.log('sub(30,5):', sub(30, 5));

// 箭头函数
const plus = (a, b) => {
    return a + b;
};
console.log('plus(5,10):', plus(5, 10));

// 只有一句return时可以省掉花括号和return
let plus2 = (a, b) => a + b;
console.log('plus2(10,20):', plus2(10, 20));

console.log('===== 6、内置方法 =====');
// 字符串
let str = '  HTML,CSS,JavaScript  ';
console.log('原字符串:[' + str + ']');
console.log('trim去掉两头空格:[' + str.trim() + ']');
console.log('split按逗号切开:', str.trim().split(','));
console.log('includes包含CSS吗:', str.includes('CSS'));

// 数组
console.log('filter筛出及格的:', fenshu.filter((v) => v >= 60));
console.log('map把分数转成字符串:', fenshu.map((v) => v + '分'));

// 数字
let xiaoshu = 3.14159;
console.log('parseInt取整:', parseInt(xiaoshu));
console.log('toFixed留两位:', xiaoshu.toFixed(2));

console.log('===== 7、模板字符串 =====');
const product = '笔记本';
const price = 2999;
const text = `商品：${product}，价格：${price}元`;   // 用反引号，变量塞进${}
console.log(text);

const a = 10, b = 5;
console.log(`算一下：${a} + ${b} = ${a + b}`);

const multiLine = `
第一行：HTML
第二行：CSS
第三行：JavaScript
`;
console.log('多行字符串:', multiLine);

console.log('===== 8、ES6+ 字符串新方法 =====');
let school = 'chongqing';
console.log('includes包含chong:', school.includes('chong'));
console.log('startsWith以ch开头:', school.startsWith('ch'));
console.log('endsWith以ing结尾:', school.endsWith('ing'));

console.log('===== 9、ES6+ 解构赋值 =====');
// 数组解构
const arr = [14, 34, 23];
const [arr1, arr2] = arr;
console.log('数组解构:', arr1, arr2);

// 对象解构
const boy = { name: 'James', age: 19, weight: 74.5 };
const { name, age: nianling } = boy;        // age改名成nianling
console.log('对象解构:', name, nianling);

// 收集剩下的
let [A, ...B] = [1, 2, 3, 4, 5, 6];
console.log('扩展运算符收集:', A, B);

console.log('===== 10、ES6+ 对象简写和扩展 =====');
const ming = '我的博客';
const shu = 5;
const blog = {
    ming,                    // 简写，等于 ming: ming
    shu,
    sayHi() {                // 方法的简写
        return '欢迎来看我的博客';
    }
};
console.log(blog, blog.sayHi());

const arr3 = [1, 2];
const arr4 = [...arr3, 3, 4];   // 展开再拼
console.log('数组展开合并:', arr4);
