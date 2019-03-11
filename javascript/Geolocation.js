geolocationAvailable = () => {
    return navigator.geolocation != null
}

getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

getCountry = async (lat, long) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
    let data = await fetch(url).then(resp => resp.json())
    return {
        type: "SUCCESS",
        country: data.address.country,
        country_code: data.address.country_code
    }
}

getCountryUsingGeolocation = async () => {
    if (geolocationAvailable()) {
        try {
            let data = await getLocation()
            let lat = data.coords.latitude
            let lng = data.coords.longitude
            let country = await getCountry(lat, lng)
            return country
        } catch(error) {
            return {
                type: 'ERROR',
                error
            }
        }
    } 

    return {
        type: 'ERROR',
        error: 'Geolocation unavailable'
    }
}