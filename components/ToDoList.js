import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../constants/colors'

const ToDoList = ({ item, navigation }) => {
    const countRemaining = item.todos.filter(e => e.completed === false).length
    const countCompleted = item.todos.length - countRemaining
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: item.color,
                }]}
            onPress={() => navigation.navigate('Detail', {
                id: item.id,
            })}
        >
            <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
            <View style={styles.wrapText}>
                <Text style={styles.number}>{countRemaining}</Text>
                <Text style={styles.status}>Remaining</Text>
                <Text style={styles.number}>{countCompleted}</Text>
                <Text style={styles.status}>Completed</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ToDoList

const styles = StyleSheet.create({
    container: {
        width: 200,
        marginHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10
    },
    wrapText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white
    },
    number: {
        fontSize: 48,
        fontWeight: '200',
        color: colors.white
    },
    status: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.white
    },
})
