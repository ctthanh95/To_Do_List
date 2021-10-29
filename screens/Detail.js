import React, { useState, useEffect } from 'react'
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    ActivityIndicator,
    Animated
} from 'react-native'
// import { useDispatch, useSelector } from 'react-redux'
// import { actionType, UPDATE_LIST, ADD_TODO_LIST } from '../redux/reducers'
import colors from '../constants/colors'
import images from '../constants/images'
import { getTodos, updateTodos } from '../firebase'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const Detail = ({ route: { params: { id, color, name } }, navigation }) => {
    const [todos, setTodos] = useState([])
    const [nameTodo, setNameTodo] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getTodos(id, setTodos, setLoading)
    }, [])

    const length = todos.length

    const completed = todos.filter(e => e.completed === true).length

    //Redux

    // const lists = useSelector(state => state.lists)

    // const listDetail = lists.filter(e => e.id === id)[0]

    // const dispatch = useDispatch()

    // const updateTodoList = (type, payload) => {
    //     dispatch(actionType(type, payload))
    // }

    // const addTodoList = (type, payload) => {
    //     dispatch(actionType(type, payload))
    //     setTodo('')
    //     Keyboard.dismiss()
    // }

    const rightAction = () => {
        return (
            <TouchableOpacity>

                <Text>Delete</Text>

            </TouchableOpacity>
        )
    }

    const renderTodo = (item, index) => (

        <Swipeable >
            <View style={styles.item}>

                <TouchableOpacity

                    onPress={() => {
                        // updateTodoList(UPDATE_LIST, { id, index })
                        let newTodos = todos.map((e, i) => {
                            if (i === index) {
                                e.completed = !e.completed
                            }
                            return e
                        })
                        updateTodos(
                            id,
                            {
                                name,
                                color,
                                todos: newTodos
                            },
                            setLoading
                        )
                    }}
                >
                    <Image
                        style={[styles.image, { tintColor: colors.gray }]}
                        source={item.completed ? images.check_box : images.square}
                    />
                </TouchableOpacity>
                <Text style={
                    [styles.txtItem,
                    {
                        textDecorationLine: item.completed ? 'line-through' : 'none',
                        color: item.completed ? colors.gray : colors.black,
                    }]
                }
                >
                    {item.title}
                </Text>
            </View>
        </Swipeable>
    )
    if (loading) {
        return (
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <ActivityIndicator size='large' color={colors.blue} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={images.close}
                    style={styles.image}
                />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.task}>{completed} of {length} tasks</Text>
                <View style={[styles.divider, { backgroundColor: color, }]} />
            </View>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flex: 4 }}>
                    <FlatList
                        data={todos}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => renderTodo(item, index)}
                    />
                </View>
                <KeyboardAvoidingView style={styles.footer} behavior='padding'>
                    <TextInput
                        style={[styles.input, { borderColor: color, }]}
                        onChangeText={setNameTodo}
                        value={nameTodo}
                    />
                    <TouchableOpacity
                        style={[styles.buttonAdd, { backgroundColor: color }]}
                        onPress={() => {
                            // addTodoList(ADD_TODO_LIST, { idAdd: id, todo })
                            let newTodos = [...todos, {
                                title: nameTodo,
                                completed: false
                            }]
                            updateTodos(
                                id,
                                {
                                    name,
                                    color,
                                    todos: newTodos
                                },
                                setLoading
                            )
                            setNameTodo('')
                            Keyboard.dismiss()
                        }}
                    >
                        <Image
                            source={images.plus}
                            style={[styles.image, { tintColor: colors.white }]}
                        />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
    },
    image: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: colors.black
    },
    button: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    header: {
        marginLeft: 60,
        marginTop: 100
    },
    divider: {
        height: 2,
        width: '100%'
    },
    name: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.black
    },
    task: {
        color: colors.gray,
        fontWeight: '600',
        marginTop: 5,
        marginBottom: 15
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 15,
        padding: 10,
        flex: 1,
        marginRight: 10
    },
    buttonAdd: {
        height: 50,
        width: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 20
    },
    txtItem: {
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 15
    }
})
