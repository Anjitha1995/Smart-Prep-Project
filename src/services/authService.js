import { getRegisteredUsers, setLoggedInUserSession } from "./storageServices";

export const authenticateLogin = (loginData) => {
    const registeredUsers = getRegisteredUsers()
    const userIndex = registeredUsers.findIndex(user => user.email === loginData.email && user.password === loginData.password)
    if (userIndex !== -1) {
        const user = registeredUsers[userIndex]
        setLoggedInUserSession({id: user.id, name: user.name, isLoggedIn: true})
        return true
    } else {
        return false
    }
}