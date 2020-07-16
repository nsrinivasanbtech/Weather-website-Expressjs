
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageSecond = document.querySelector('#messageSecond')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    messageSecond.textContent = ''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.Error){
                messageOne.textContent = data.Error
            } else {
                messageOne.textContent = data.forecastData
                messageSecond.textContent = data.address
            }
        })
    })

})