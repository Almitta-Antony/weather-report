var x= document.getElementById("lButton");
function clickLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition); 
    }
    else{
        x.innerHTML="Geolocation is not supported by this browser";
    }
}
// console.log("took");
function showPosition(position){
x.innerHTML="Latitude"+position.coords.latitude+"Longitude :"+position.coords.longitude;
}
// console.log("next");




function clickButton(){
    place=sLocation.value

    console.log("started");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b41ec3be35c7dac8aabbc21ba253137a`).then(data=>data.json())
    .then(outdata=>displayData(outdata))


    // added
    // ---------------
    .catch(error => {
        console.error("Error fetching data:", error);
        displayError("An error occurred while fetching weather data.");
    });
// -------------------
}


function displayData(data) {
    if (data.cod === 200) {
        temp=parseInt(data.main.temp_max-273.15)
        temp1=parseInt(data.main.temp_min-273.15)

        const location = data.name;
        const weatherDescription = data.weather[0].description;
        // const maxTemp = data.main.temp_max;
        // const minTemp = data.main.temp_min;
        const windSpeed = data.wind.speed;
        const pressureD = data.main.pressure;


        

        

// a1.innerHTML=`    <h1 >Location :${location}</h1>`

result.innerHTML = `
<div class="row p-3">
<div class="col-lg-6">
<div class="col-lg-6">

    <i class="fa-solid fa-cloud-sun fa-4x p-3" style="color: #bdb9b9;"></i>  
</div>
<div class="row p-3">
<div class="col-lg-12">
<h1>Location : ${location}</h1>
</div>
<div class="row p-3">
<div class="col-lg-12">
<h3>${weatherDescription}</h3>
</div>

<div class="row p-2 mt-2">
<div class="col-lg-12">
<h6>Date|Time</h6>
</div>
</div>
</div>

</div>
</div>


<!-- right section -->


<div class="col-lg-6 border-start border-black">
<div class="row p-3">
<div class="col-lg-12">
<h3>Max-Temp :${temp}&#8451;</h3>
</div>
<div class="row p-3">
<div class="col">
<h3>Min-Temp :${temp1}&#8451;</h3>
</div>
<div class="row p-3">
<div class="col">
<h3>Wind-Speed :${windSpeed}km/h</h3>
</div>
<div class="row p-3">
<div class="col">
    <h3>Pressure :${pressureD}Pa</h3>
</div>
</div>
</div>
</div>
</div>


</div>

</div>




`


    }
    else{
        displayError("Weather data not found for the specified location")
    }
    //   console.log("end");

    }



    function displayError(errorMessage) {
        result.innerHTML = `
            <div class="alert alert-danger" role="alert">
                ${errorMessage}
            </div>
        `
    }


