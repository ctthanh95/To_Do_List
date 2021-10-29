import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { actionType, ADD_LIST } from '../redux/reducers'
import colors from '../constants/colors'
import images from '../constants/images'

const AddListModal = ({ clickModal }) => {

    const dispatch = useDispatch()

    const backgroundColors = ['#5CD859', '#24A6D9', '#595BD9', '#8022D9', '#D159D8', '#D85963', '#D88559',]

    const [name, setName] = useState('')

    const [color, setColor] = useState(backgroundColors[0])

    const renderColor = () => {
        return (
            <View style={styles.wColor}>
                {
                    backgroundColors.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.itemColor, { backgroundColor: item }]}
                            onPress={() => setColor(item)}
                        />
                    ))
                }
            </View>
        )
    }

    const addTodoList = (type, payload) => {
        dispatch(actionType(type, payload))
        setName('')
        clickModal()
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <TouchableOpacity
                onPress={clickModal}
                style={styles.button}
            >
                <Image
                    source={images.close}
                    style={styles.image}
                />
            </TouchableOpacity>
            <Text style={styles.create}>Create Todo List</Text>
            <TextInput
                placeholder='List Name?'
                style={styles.input}
                onChangeText={setName}
            />
            <View style={{ alignSelf: 'stretch' }}>
                {renderColor()}
            </View>
            <TouchableOpacity
                style={[styles.btnCreate, { backgroundColor: color }]}
                onPress={() => addTodoList(ADD_LIST, { name, color, todos: [] })}
            >
                <Text style={styles.txtCreate}>Create!</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default AddListModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
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
        right: 20
    },
    create: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.black,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: colors.lightBlue,
        borderRadius: 10,
        width: '100%',
        marginVertical: 15,
        padding: 10
    },
    btnCreate: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtCreate: {
        color: colors.white,
        fontWeight: '600'
    },
    wColor: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    itemColor: {
        width: 30,
        height: 30,
        borderRadius: 5,
    }
})
