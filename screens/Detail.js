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
    Alert,
} from 'react-native'
import Swipeable from 'react-native-swipeable'
import colors from '../constants/colors'
import images from '../constants/images'
import { getTodos, updateTodos } from '../firebase'

const Detail = ({ route: { params: { id, color, name } }, navigation }) => {

    const [todos, setTodos] = useState([])
    const [nameTodo, setNameTodo] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTodos(id, setTodos, setLoading)
    }, [])

    let length = todos.length

    let completed = todos.filter(e => e.completed === true).length

    const addTodos = () => {
        if (nameTodo) {
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
        } else {
            Alert.alert('Please fill in the required information')
        }
    }

    const updateToDos = (index) => {
        let newTodos = todos.filter((e, i) => {
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
    }

    const deleteToDos = (index) => {
        let newTodos = todos.filter((e, i) => i !== index)
        updateTodos(
            id,
            {
                name,
                color,
                todos: newTodos
            },
            setLoading
        )
    }

    const renderTodo = (item, index) => (
        <Swipeable
            rightButtons={[
                <TouchableOpacity
                    style={styles.btnDel}
                    onPress={() => deleteToDos(index)}
                >
                    <Text style={styles.txtDel}>Delete</Text>
                </TouchableOpacity>
            ]}
        >
            <View style={styles.item}>
                <TouchableOpacity
                    onPress={() => updateToDos(index)}
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
        </Swipeable >
    )
    if (loading) {
        return (
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <ActivityIndicator size='large' color={colors.blue} />
            </View>
        )
    }
    return (
        <View style={styles.container} >
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
                <Text style={styles.task}>{completed} of {length} tasks (Swipe to delete tasks)</Text>
                <View style={[styles.divider, { backgroundColor: color, }]} />
            </View>
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flex: 4 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
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
                        onPress={addTodos}
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
        paddingHorizontal: 20,
        marginTop: 5,
    },
    txtItem: {
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 15
    },
    btnDel: {
        backgroundColor: colors.red,
        width: 70,
        height: 50,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    txtDel: {
        fontWeight: '800',
        fontSize: 16,
        color: colors.white
    }
})
