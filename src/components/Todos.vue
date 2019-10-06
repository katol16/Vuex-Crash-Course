<template>
    <div>
        <h3>Todos</h3>
        <div class="legend">
            <span>Double click to mark as complete</span>
            <span>
                <span class="incomplete-box"> = Incomplete</span>
            </span>
            <span>
                <span class="complete-box"> = Complete</span>
            </span>
        </div>
        <div class="todos">
            <div
                v-bind:class="{'is-complete':todo.completed}"
                @dblclick="onDblClick(todo)"
                :key="todo.id" v-for="todo in allTodos"
                class="todo"
            >
                {{ todo.title}}
                Lajki: {{ todo.likes}}
                <button @click="addLike(todo.id)" class="likeBtn">Dodaj lajka</button>
                <!-- zauwaz bezposrednie wywołąnie w button do usuniecia-->
                <button @click="deleteTodo(todo.id)" class="deleteBtn">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    // mapGetters, to cos jak Connect  redux
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Todos",
        methods: {
            // tu dodamy mapActions
            // Będzie tutaj wiele metod.
            // Jesi mialibysmy samą akcje jako metode, to mogłoby byc:
            // methods: mapActions(['fetchTodos']);
            // ale bedziemi mieli wiele akcji, wiec:
            ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo', "addLike"]),
            // ponizje mozemy dawac nastepne akcje/metody

            onDblClick(todo) {
                const updTodo = {
                    id: todo.id,
                    title: todo.title,
                    completed: !todo.completed
                };

                this.updateTodo(updTodo);
            }

        },
        computed: mapGetters(['allTodos']),

        // created jest tak jak componentDidMount
        created() {
            this.fetchTodos();
        }
    }
</script>

<style scoped>

    .todos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    .todo {
        border: 1px solid #ccc;
        background: #41b883;
        padding: 1rem;
        text-align: center;
        position: relative;
        cursor: pointer;
    }
    
    .deleteBtn {
        position: absolute;
        top: 0px;
        right: 0px;
        cursor: pointer;
    }

    .likeBtn {
        position: absolute;
        bottom: 0px;
        right: 0px;
        cursor: pointer;
    }

    .legend {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1rem;
    }

    .complete-box {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #35495e;
    }

    .incomplete-box {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #41b883;
    }

    .is-complete {
        background: #35495e;
    }

</style>
