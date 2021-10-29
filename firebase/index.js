import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const signIn = () => {
    auth()
        .signInAnonymously()
        .then(() => {
            // console.log('User signed in anonymously')
        })
        .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.')
            }
            console.error(error)
        });
}

export const userUid = auth().currentUser.uid

export const data = firestore().collection('users').doc(userUid).collection('lists')

export const getLists = (setLists, setLoading) => {
    setLoading(true)
    const usersLists = data.orderBy('name')
    const subscriber = usersLists.onSnapshot(doc => {
        let lists = []
        doc.forEach(e => lists.push({
            id: e.id,
            ...e.data()
        }))
        setLists(lists)
        setLoading(false)
    })
    return () => subscriber()
}

export const getTodos = (id, setTodos, setLoading) => {
    setLoading(true)
    const usersTodos = data.doc(id)
    const subscriber = usersTodos.onSnapshot(doc => {
        setTodos(doc.data()?.todos)
        setLoading(false)
    })
    return () => subscriber()
}

export const addList = (list, setLoading) => {
    setLoading(true)
    data.add(list).then(() => setLoading(false))
}

export const updateTodos = (id, list, setLoading) => {
    setLoading(true)
    data.doc(id).update(list).then(() => setLoading(false))
}