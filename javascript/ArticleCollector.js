const API_KEY = 'a6f2012c39034910996903d818694cb4';

getTopStories = async (country) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`
    try {
        let data = await fetch(url).then(resp => resp.json())
        return { type: 'SUCESS', articles: data.articles }
    } catch(error) {
        return { type: 'ERROR', error }
    }
}

getSearchedStories = async (token, size) => {
    let url = `https://newsapi.org/v2/everything?q=${token}&apiKey=${API_KEY}&pageSize=${size}&page=1`
    try {
        let data = await fetch(url).then(resp => resp.json())
        return {
            type: 'SUCCESS',
            articles: data.articles
        }
    } catch (error) {
        return { type: 'ERROR', error }
    }
}