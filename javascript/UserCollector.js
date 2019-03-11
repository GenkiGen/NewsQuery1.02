collect_data = async (size) => {
    let url = `https://randomuser.me/api/?results=${size}`
    try {
        let users = await fetch(url).then(resp => resp.json())
        return { type: "SUCCESS", users: users.results};
    } catch (error) {
        return { type: 'ERROR', error }
    }
}