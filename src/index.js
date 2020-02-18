import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';


const btnTodo       = document.getElementById('btnTodo');
const btnReminder   = document.getElementById('btnReminder');

const txtInput  = document.getElementById('txtInput');
const todoList      = document.getElementById('todoList');
const reminderList      = document.getElementById('reminderList');


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

const initialStateTodo = {
    error   : false,
    loading : false,
    list    : [],
}

const initialStateReminder = {
    error   : false,
    loading : false,
    list    : [],
}

const reminderRedcuer = (state = initialStateReminder , action) => {
    switch (action.type) {
        case 'ADD_REMINDER':
            
            const isExist = state.list.find( reminder => reminder.task === action.payload)
            if(action.payload==''){
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



const todoReducer = (state = initialStateTodo, action) => {
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

    const todoStore = store.getState().todo;
    const reminderStore = store.getState().reminder;
    console.log('todoStore.erro',todoStore.error)
    console.log('reminderStore.error',reminderStore.error)

    
    if(todoStore.error){
       console.log('do not work todoStore')
    }else{
        let todoData = '';
        todoStore.list.forEach((todo,index) => {
            todoData += `<li key=${index}> ${todo.task} </li>`;
        });
        todoList.innerHTML = todoData
    }

    if(reminderStore.error){
        console.log('do not work reminderStore')
    }else{
        let reminderData = '';
        todoStore.list.forEach((reminder,index) => {
            reminderData += `<li key=${index}> ${reminder.task} </li>`;
        });
        todoList.innerHTML = reminderData
    }
}


const  combineReducer = combineReducers({
    todo        : todoReducer,
    reminder    : reminderRedcuer
})




const store = createStore( combineReducer , applyMiddleware(createLogger()));

const unsubscribe = store.subscribe(() => {
        render();
})


btnTodo.addEventListener( 'click', () => {
    store.dispatch(addTodo(txtInput.value))
})

btnReminder.addEventListener( 'click', () => {
    store.dispatch({ type : 'ADD_REMINDER', payload : txtInput.value })
})









