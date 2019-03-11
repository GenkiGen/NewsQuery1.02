//Global vars
var articles = document.querySelector('.articles')
var form = document.querySelector('form')
var loading = document.querySelector('.loading')
var errors = document.querySelector('.errors')

//Functions
displayErrors = (errs) => {
    errs.forEach(error => {
        let para = document.createElement('p')
        para.className = "text-danger animated bounce"
        para.innerText = error
        errors.appendChild(para)
    })
}


clearErrors = () => {
    errors.innerHTML = ''
}

toggleLoading = (isVisible) => {
    if (isVisible)  loading.style.display = 'block'
    else            loading.style.display = 'none'
}

populateArticles = (arts) => {
    //Toggle loading
    arts.forEach(article => {
        //Create a li element
        let li = document.createElement('li')
        li.className = "list-group-item animated slideInLeft"
        li.innerHTML = `
            <a href="${article.url}">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${article.urlToImage}" alt="caption" class="img-fluid cover"/>
                    </div>

                    <div class="col-md-9">
                        <h5 class="title">${article.title}</h5>
                        <p class="author">By: ${article.author || 'Unknown'}</p>
                        <p>${article.description}</p>
                    </div>
                </div>
            </a>
        `
        //Add element to articles
        articles.appendChild(li)
    })
}

clearArticles = () => {
    articles.innerHTML = ''
}

init = async () => {
    //Gather top stories and populate
    clearArticles()
    //Loading
    toggleLoading(true)
    //Get articles
    let data = await getTopStories('us')
    //populate
    toggleLoading(false)
    //If error
    if (data.type == 'ERROR') {
        console.log(data.error)
    } else {
        //Then populate
        populateArticles(data.articles)
    }
    //Set on click
    form.onsubmit = async (event) => {
        //Prevent default
        event.preventDefault()
        //Get data
        let formData = new FormData(form)
        let searchToken = formData.get("search")
        //Clear errors
        clearErrors()
        //Validate form
        let errors = validate(searchToken)
        if (errors.length > 0) {
            displayErrors(errors)
        } else {
            //Clear First
            clearArticles()
            //Loading
            toggleLoading(true)
            //Search data
            let data = await getSearchedStories(searchToken, 20)
            //Not loading
            toggleLoading(false)
            //If error
            if (data.type == 'ERROR') {
                console.log(data.error)
            } else {
                //Then populate
                populateArticles(data.articles)
            }
        }
    }
}

init()
