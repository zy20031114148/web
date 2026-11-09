/* 留言存本地，localStorage 只能存字符串 */

export const liuyanKey = 'blog_messages';

export function saveToLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocal(key) {
    const str = localStorage.getItem(key);
    if (!str) {
        return [];
    }

    try {
        return JSON.parse(str);
    } catch (e) {
        return [];
    }
}
