import { createStore } from 'redux'
import reducerTodoList from './reducers'

const store = createStore(reducerTodoList)

export default store