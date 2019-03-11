isBlank = (text) => {
    return !text || text.length == 0
}

containsSpecialChar = (text) => {
    const SPECIAL = '`~!@#$%^&*()-_+={}[]|\\:;\'\"<,>.?/'
    return text.split('').some(char => SPECIAL.indexOf(char) != -1)
}

validate = (token) => {
    let errors = []
    if (isBlank(token)) {
        errors.push('Empty search term')
    }

    if (containsSpecialChar(token)) {
        errors.push('Search term contains special characters')
    }

    return errors
}