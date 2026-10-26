/* storage.js 本地缓存小工具
   localStorage 只能存字符串，所以存之前 stringify，取出来再 parse。 */

const liuyanKey = 'blog_messages';

/* 写：把对象/数组转成 JSON 字符串存进去 */
function saveToLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/* 读：把 JSON 字符串还原成对象/数组，没存过就返回空数组 */
function getFromLocal(key) {
    const str = localStorage.getItem(key);
    if (!str) {
        return [];
    }
    try {
        return JSON.parse(str);
    } catch (e) {
        // 缓存被改坏了也不能让页面崩掉
        return [];
    }
}
