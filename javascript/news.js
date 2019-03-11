//Global vars
var stories_holder = document.querySelector('.stories')
var stories_type = document.querySelector('.stories-type')
var loading = document.querySelector('.loading')
var errors = document.querySelector('.errors')

//Functions
showNoti = (content) => {
    //Set visible
    noti_holder.style.display = 'flex';
    noti.style.display = 'block'
    noti_text.textContent = content;
}

closeNoti = (onClose) => {
    noti_holder.style.display = 'none';
    noti.style.display = 'none'
    noti_text.textContent = '';
}

changeStoriesTitle = (title) => {
    stories_type.textContent = title
}

populateStories = (stories) => {
    if (stories.length > 0) {
        //If there are some stories
        for (let story of stories) {
            //Create a card
            let card = document.createElement('div')
            card.className = "card animated flipInX"
            card.innerHTML = `
                <img class="card-img-top" src="${story.urlToImage}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${story.title}</h5>
                    <a href="${story.url}" class="btn" target="_blank">Read more</a>
                </div>
            `
            //Add card to holde
            stories_holder.appendChild(card)
        }
    } else {
        //Suggest to switch to US
        errors.innerHTML = `
            <h3 class="text-danger">No stories available in your country</h3>
            <p>Please consider <button class="btn" onclick="fillTopStories()">Switch to the US</button></p>
        `
    }
}

toggleLoading = (isVisible) => {
    if (isVisible)  loading.style.display = 'block'
    else            loading.style.display = 'none'
}

clearErrors = () => {
    errors.innerHTML = ''
}

fillTopStories = async (country = 'us', fullCountry = 'USA', customTitle) => {
    //Set title
    changeStoriesTitle(customTitle || `Top stories for: ${fullCountry}`)
    //Create error first
    clearErrors()
    //Set loading running
    toggleLoading(true)
    //Get data
    let data = await getTopStories(country)
    //Set loading icon
    toggleLoading(false)
    //Populate
    if (data.type == 'ERROR') {
        //Handle errors
        console.log(data.error)
    } else {
        //Populate stories
        populateStories(data.articles)
    }
}

//function to init
init = async () => {
    //Default country code
    let countryCode = 'us'
    let fullCountry = 'USA'
    let customTitle = null

    //If local storage is found
    if ((code = localStorage.getItem("country_code")) && (fullName = localStorage.getItem("country"))) {
        countryCode = code
        fullCountry = fullName
        customTitle = `Let's me guess, you're from ${fullCountry}`
    } else {
        //Get country and country code
        let countryData = await getCountryUsingGeolocation()
        if (countryData.type === "ERROR") {
            //ERROR
            customTitle = 'Showing the default for USA'
            alert('Oppsies, I have some troubles getting the news.')
        } else if (countryData.type === "SUCCESS") {
            //Set code
            countryCode = countryData.country_code
            fullCountry = countryData.country
            //Save to local storage
            localStorage.setItem("country_code", countryCode)
            localStorage.setItem("country", fullCountry)
        }
    }

    //Fill news stories
    fillTopStories(countryCode, fullCountry, customTitle)
}

init()