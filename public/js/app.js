console.log("running") //client side javascript loaded

//used to fetch data from an url and parse the received data nad display it 
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then( (data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location, data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form') //querySelector() method returns the first element that matches a specified CSS selector(s) in the document
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')

weatherForm = addEventListener('submit', (e) => {
    e.preventDefault() //prevents the default behaviour of the browser to get refreshed
    const location = search.value 
    const url = '/weather?address=' + encodeURIComponent(location)
    m1.textContent = "Loading Data"
    m2.textContent = " "
    fetch(url).then((response) => {
    response.json().then( (data) => {
        if(data.error){
            m1.textContent = data.error
        }else{
            m1.textContent = data.location
            m2.textContent = data.forecast
        }
    })
})
    console.log(location)
})