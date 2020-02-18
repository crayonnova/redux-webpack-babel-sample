import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

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
    error   : false,
    loading : false,
    list    : [],
}

const todoReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case ADD_TODO:
            
            const isExist = state.list.find( todo => todo.task === action.payload)
            if(action.payload==''){

                console.log('empty')

                return {
                    ...state,
                    error : true
                };
            }
            else if(isExist){
                console.log('Already exist')
                return {
                    ...state,
                    error : true
                };
            }
            else{

                return {
                    ...state,
                    error : false,
                    list : [...state.list,{
                        task    : action.payload,
                        status  : false
                    }]
                }
            }

           
        default:
           return state
    }
}

const render = () => {
    console.log('....RENDERED..')
    var data = '';
    const store = todoStore.getState();
    store.list.forEach((todo,index) => {
         data += `<li key=${index}> ${todo.task} </li>`;
    });

    list.innerHTML = data
}

const todoStore = createStore(todoReducer,applyMiddleware(createLogger()))
const unsubscribe = todoStore.subscribe(() => {
    if(!todoStore.getState().error)
    render();

})



btnSubmit.addEventListener( 'click', () => {
    todoStore.dispatch(addTodo(txtInput.value))
})






