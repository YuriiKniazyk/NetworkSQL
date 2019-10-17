import { REGISTER, LOGIN, AUTHORIZATION, LOGOUT, PROFILE, FINDBYNAME, FORGOTEPASSWORD, SENDCODEANDEMAIL, UPDATEPASSWORD } from "../action-types"

export const register = (payload) => {
    return {
        type: REGISTER,
        payload,
    }
}

export const login = (payload) => {
    return {
        type: LOGIN,
        payload,
    }
}

export const authorization = (payload) => {
    return {
        type: AUTHORIZATION,
        payload,
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

export const profile = (payload) => {
    return {
        type: PROFILE,
        payload
    }
}

export const findByName = (payload) => {
    return {
        type: FINDBYNAME,
        payload
    }
}

export const forgotePassword = (payload) => {
    return {
        type: FORGOTEPASSWORD,
        payload
    }
}

export const sendCodeAndEmail = (payload) => {
    return {
        type: SENDCODEANDEMAIL,
        payload
    }
}

export const updatePassword = (payload) => {
    return {
        type: UPDATEPASSWORD,
        payload
    }
} 