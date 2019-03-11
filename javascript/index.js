//Global vars
var comment_section = document.querySelector('.comments')
var loading = document.querySelector('.loading')
const SIZE = 3
const praise = "This is the best news site I have ever seen in my life. All contents are exclusive and come from reliable source. I can not express how much I "
                + "love this site."

//Animation
var banner_text = document.querySelector('.banner-holder')
var why_section = document.querySelector('.why-holder')

//Functions
capitalize = (name) => {
  return name[0].toUpperCase() + name.slice(1, name.length)
}

removeLoading = () => {
    loading.style.display = 'none'
}

displayError = (message) => {
    comment_section.innerHTML = `<p class='lead ml-5'>${message}</p>`
}

populateComments = (users) => {
    let count = 0
    for (let user of users) {
        //Create a col
        let col = document.createElement('div')
        col.className = count == 0 ? "col-md-2 offset-md-3 text-center" : "col-md-2 text-center"
        let div = document.createElement('div')
        div.className = "card comment-card p-2 mx-3"
        col.appendChild(div)

        //Populate content
        let picture = document.createElement('img')
        picture.className = "card-avatar mr-3"
        picture.setAttribute("src", user.picture.medium)

        let title = document.createElement('p')
        title.className = 'card-title'
        title.textContent = capitalize(user.name.first)

        let para = document.createElement('p')
        para.className = 'card-content'
        para.textContent = praise

        //Add
        div.appendChild(picture)
        div.appendChild(title)
        div.appendChild(para)

        //Add to comment section
        comment_section.appendChild(col)

        //Increase count
        count += 1
    }
}

//Set on scroll
window.onload = (event) => {
    banner_text.classList.add('animated')
    banner_text.classList.add('slideInLeft')

    why_section.classList.add('animated')
    why_section.classList.add('zoomIn')
}

//Function to init index page
init = async () => {
    let data = await collect_data(SIZE)
    //Remove loading gif
    removeLoading()
    //Check type
    if (data.type == 'ERROR') {
        //Handle Error
        displayError('Sorry, can not retrieve users')
    } else {
        //Success -> Populate
        populateComments(data.users)
    }
}

init()
