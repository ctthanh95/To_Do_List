import React, { useEffect, useState } from 'react'
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
// import { useSelector } from 'react-redux'
import ToDoList from '../components/ToDoList'
import colors from '../constants/colors'
import images from '../constants/images'
import AddListModal from '../components/AddListModal'
import { signIn, getLists } from '../firebase'

const Lists = ({ navigation }) => {
    const [visible, setVisible] = useState(false)
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(false)

    const clickModal = () => {
        setVisible(!visible)
    }

    //Redux
    // const lists = useSelector(state => state.lists)

    useEffect(() => {
        signIn()
    }, [])
    useEffect(() => {
        getLists(setLists, setLoading)
    }, [])

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={colors.blue} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                visible={visible}
                onRequestClose={clickModal}
            >
                <AddListModal
                    clickModal={clickModal}
                    setLoading={setLoading}
                />
            </Modal>
            <View style={styles.title}>
                <View style={styles.divider} />
                <Text style={styles.todo}>
                    Todo <Text style={styles.lists}>Lists</Text>
                </Text>
                <View style={styles.divider} />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={clickModal}
            >
                <Image
                    source={images.plus}
                    style={styles.image}
                />
            </TouchableOpacity>
            <Text style={styles.add}>Add List</Text>
            <View style={styles.flat}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id + ''}
                    data={lists}
                    renderItem={({ item }) => <ToDoList item={item} navigation={navigation} />}
                />
            </View>
        </View>
    )
}

export default Lists

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    title: {
        flexDirection: 'row', alignItems: 'center'
    },
    divider: {
        height: 1,
        backgroundColor: colors.lightBlue,
        width: '100%'
    },
    todo: {
        fontSize: 38,
        fontWeight: '800',
        color: colors.black,
        paddingHorizontal: 50
    },
    lists: {
        fontWeight: '300',
        color: colors.blue
    },
    image: {
        height: 30,
        width: 30,
        resizeMode: 'cover',
        tintColor: colors.lightBlue
    },
    button: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: colors.lightBlue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 15
    },
    add: {
        color: colors.blue,
        fontWeight: '600',
        fontSize: 14,
        marginTop: 10
    },
    flat: {
        height: 275,
        marginTop: 20
    }
})
