<template>
    <div class="lianxi-wrap">
        <h1 class="lianxi-title">待办事项 TodoList</h1>
        <p class="lianxi-tip">输入内容后按回车添加，不用点按钮</p>

        <div class="todo-box">
            <h2>今日待办（{{ todos.length }} 项）</h2>

            <form @submit.prevent="add">
                <input class="todo-input" type="text" v-model.trim="taskText" placeholder="要做什么？按回车添加">
            </form>

            <ul class="todo-list">
                <li v-for="(item, index) in todos" :key="item.id" :class="{ done: item.done }">
                    <input type="checkbox" v-model="item.done">

                    <input v-if="editingId === item.id"
                           class="todo-edit"
                           type="text"
                           ref="editInput"
                           v-model="item.text"
                           @blur="finishEdit(item)"
                           @keyup.enter="finishEdit(item)">
                    <span v-else class="todo-text">{{ item.text }}</span>

                    <button type="button" class="todo-edit-btn" v-if="editingId !== item.id" @click="startEdit(item)">编辑</button>
                    <button type="button" class="todo-del" @click="del(index)">删除</button>
                </li>
            </ul>

            <p class="todo-empty" v-if="todos.length === 0">还没有待办，先加一条试试。</p>

            <p class="todo-count" v-if="todos.length > 1">
                共 {{ todos.length }} 项：未完成 <strong>{{ undoCount }}</strong> 项，已完成 <strong>{{ doneCount }}</strong> 项
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todos: [],
            taskText: '',
            editingId: null
        };
    },

    computed: {
        doneCount() {
            return this.todos.filter(item => item.done).length;
        },
        undoCount() {
            return this.todos.filter(item => !item.done).length;
        }
    },

    methods: {
        add() {
            const text = this.taskText.trim();
            if (text === '') {
                return;
            }

            this.todos.push({
                id: Date.now(),
                text: text,
                done: false
            });

            this.taskText = '';
        },

        del(index) {
            this.todos.splice(index, 1);
        },

        startEdit(item) {
            this.editingId = item.id;

            this.$nextTick(() => {
                const el = this.$refs.editInput;
                if (el) {
                    const input = Array.isArray(el) ? el[0] : el;
                    if (input) {
                        input.focus();
                    }
                }
            });
        },

        finishEdit(item) {
            if (item.text.trim() === '') {
                this.todos = this.todos.filter(t => t.id !== item.id);
            } else {
                item.text = item.text.trim();
            }

            this.editingId = null;
        }
    }
};
</script>
