// todos module
import axios from 'axios';

const state = {
    todos: []
};

const getters = {
    allTodos: state => state.todos
};

const actions = {
    // za pomocą tego "commit" będziemy wywoływać mutations
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

       commit('setTodos', response.data)
    },

    async addTodo({ commit }, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos',
            {
                title,
                completed: false
            }
        );

        // to jest potrzebne do wywołania mutation
        commit('newTodo', response.data);
    },

    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

        commit('removeTodo', id)
    },

    async filterTodos({ commit }, e) {
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

        commit('setTodos', response.data);
    },

    async updateTodo({ commit }, updTodo ) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);

        console.log(response);
        commit('updateTodo', response.data);
    },

    // Stworzona przez Ciebie
    async addLike({ commit }, id) {
        console.log('dssd');
        await commit('increaseLikes', id);
    }
};

const mutations = {
    setTodos: (state, todos) => {

        // Jako ćwiczenie dodałeś sobie lajki do każdego todoItem
        todos.map(todo => todo.likes = 0);

        state.todos = todos
    },
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo: (state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);

        if(index !== -1) {
            state.todos.splice(index, 1, updTodo)
        }
    },

    // Tę funkcjonalność robiłeś sam
    increaseLikes: (state, id) => state.todos.filter(todo => {
        if (todo.id === id) {
            todo.likes ++;
        }
    })
};

export default {
    state,
    getters,
    actions,
    mutations
}