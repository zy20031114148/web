<template>
    <div class="sousuo">
        <input type="text"
               :value="keyword"
               placeholder="输入标题关键词"
               @input="$emit('change-keyword', $event.target.value)">
        <select :value="fenlei" @change="$emit('change-fenlei', $event.target.value)">
            <option value="">全部分类</option>
            <option v-for="lei in fenleiArr" :key="lei" :value="lei">{{ lei }}</option>
        </select>
        <button type="button" class="cibtn" @click="$emit('reset')">重置</button>
    </div>
</template>

<script>
export default {
    props: {
        keyword: { type: String, default: '' },
        fenlei: { type: String, default: '' },
        fenleiArr: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    emits: ['change-keyword', 'change-fenlei', 'reset']
};
</script>
