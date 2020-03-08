console.log("%cThis is developer region, Not for normal users!🚀","color: Hotpink;background-color: black;padding:10px;border-radius:20px;margin:10px;font-size:1.25rem")
const form = document.querySelector('form')
const input = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
form.addEventListener('submit',(e) => {
    e.preventDefault()
    msg1.textContent = 'Waiting for the response...'
    msg2.textContent = ''
    const location = input.value
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msg1.textContent = data.error
        }
        else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})
})