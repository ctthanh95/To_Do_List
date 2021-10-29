import data from "../constants/data"

export const ADD_LIST = 'ADD_LIST'
export const UPDATE_LIST = 'UPDATE_LIST'
export const DELETE_LIST = 'DELETE_LIST'
export const ADD_TODO_LIST = 'ADD_TODO_LIST'


export const actionType = (type, payload) => ({
    type,
    payload
})

let initState = {
    lists: data
}

const reducerTodoList = (state = initState, action) => {
    switch (action.type) {
        case ADD_LIST:
            return {
                ...state,
                lists: [...state.lists, { id: state.lists.length + 1, ...action.payload }]
            }
        case UPDATE_LIST:
            const { id, index } = action.payload
            let newLists = state.lists.map(e => {
                if (e.id === id) {
                    e.todos[index].completed = !e.todos[index].completed
                }
                return e
            })
            return {
                ...state,
                lists: [...newLists]
            }
        case ADD_TODO_LIST:
            const { idAdd, todo } = action.payload
            let newAdd = state.lists.map(e => {
                if (e.id === idAdd) {
                    e.todos.push({
                        title: todo,
                        completed: false
                    })
                }
                return e
            })
            return {
                ...state,
                lists: [...newAdd]
            }

        default:
            return state
    }

}

export default reducerTodoList