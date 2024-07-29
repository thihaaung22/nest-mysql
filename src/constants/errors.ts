const errMessage = (message: string, status_code: number) => {
    return {
        message,
        status_code
    }
}

export const ERRORS = {
    USER_NOT_FOUND: errMessage("User not found.", 404),
    USER_PROFILE_EXISTS: errMessage("User profile already exists.", 400)
}

