import { createStore } from 'redux';

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const btnSubmit = document.getElementById('submit');
const txtInput  = document.getElementById('txtInput');
const list      = document.getElementById('list');


const addTodo = (data) => {
    return {
        type  : ADD_TODO,
        payload : data
    }
}

const deleteTodo = (data) => {
    return {
        type  : DELETE_TODO,
        payload : data
    }
}

const initialState = {
    loading : false,
    list    : [],
}

const todoReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case ADD_TODO:
            
            return {
                ...state,
                list : [...state.list,{
                    task    : action.payload,
                    status  : false
                }]
            }
           
        default:
           return state
    }
}

const render = () => {
    var data = '';
    const store = todoStore.getState();
    store.list.forEach(todo => {
         data += `<li> ${todo.task} </li>`;
    });
    list.innerHTML = data
}

const todoStore = createStore(todoReducer)
const unsubscribe = todoStore.subscribe(() => {
    render();
})



btnSubmit.addEventListener( 'click', () => {
    todoStore.dispatch(addTodo(txtInput.value))
})






