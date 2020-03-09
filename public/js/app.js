console.log("%cThis is developer region, Not for normal users!🚀", "color: Hotpink;background-color: black;padding:10px;border-radius:20px;margin:10px;font-size:1.25rem")
const form = document.querySelector('form')
const input = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

// automatically geting weather
if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser')
} else {
    console.log('Locating…')
    navigator.geolocation.getCurrentPosition((position) => {
        const clat = position.coords.latitude
        const clong = position.coords.longitude
        msg1.textContent = 'Waiting for the response...'
        msg2.textContent = ''
        fetch('/weather-allow?lat=' + clat + '&long=' + clong).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = data.error
                } else {
                    msg1.textContent = data.location
                    msg2.textContent = data.forecast
                }
            })
        })
    });
}

// weather by submitting the form
form.addEventListener('submit', (e) => {
    e.preventDefault()
    msg1.textContent = 'Waiting for the response...'
    msg2.textContent = ''
    const location = input.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})

// auto complete code for searn field

var searchInput = 'search_input';

$(document).ready(function () {
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['geocode'],
    });
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var near_place = autocomplete.getPlace();
    });
});