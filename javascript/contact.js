//Global vars
var contact = document.querySelector('.contact')
console.log(contact)

//On load
window.onload = () => {
    console.log('Hello')
    contact.classList.add('animated')
    contact.classList.add('flipInY')
}