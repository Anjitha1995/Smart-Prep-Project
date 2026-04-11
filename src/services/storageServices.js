const STORAGE_KEYS = {
    REGISTERED_USERS: "smartprep-users",
    LOGGEDIN_USER_SESSION: "smartprep_session-user"
}

const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const setItem = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item))
}

export const getRegisteredUsers = () => {
    const registeredUsers = getItem(STORAGE_KEYS.REGISTERED_USERS)
    return registeredUsers != null ? registeredUsers : []
}

export const setRegisteredUsers = (users) => {
    setItem(STORAGE_KEYS.REGISTERED_USERS, users)
}

export const getLoggedInUserSession = () => {
    return getItem(STORAGE_KEYS.LOGGEDIN_USER_SESSION)
}

export const setLoggedInUserSession = (user) => {
    setItem(STORAGE_KEYS.LOGGEDIN_USER_SESSION, user)
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.LOGGEDIN_USER_SESSION);
}