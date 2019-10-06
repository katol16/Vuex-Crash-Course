// entry point to vuex, here we compine all modules, like rootreducers in redux
import Vuex from 'vuex';
import Vue from 'vue';
import todos from './modules/todos';

// Load Vuex
Vue.use(Vuex);

// Create stroe
export default new Vuex.Store({
    modules: {
        todos
    }
});