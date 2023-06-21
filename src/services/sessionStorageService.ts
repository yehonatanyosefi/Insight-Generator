const LOGGEDIN_USER_KEY = 'loggedinUser'

export async function logout() {
    sessionStorage.removeItem(LOGGEDIN_USER_KEY)
}


export function saveLocalUser(user: any) {
    sessionStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(user))
    return user
}

export function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_KEY) || 'null')
}