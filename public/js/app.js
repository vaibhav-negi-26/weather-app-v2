console.log("This is developer region, Not for normal users!")
fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
        }
        else{
            console.log(data.forecast)   
            console.log(data.location)   
        }
    })
})