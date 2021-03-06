// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Davis&appid=b76d3a5bbf0536a4b6731b8694802bb2";

// $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     .then(function(response) {
//         console.log("hi");
//         $("#temperature").text("Temperature: "+response.main.temp);
// });

function search(event, city = $("#searchText").val()) {
    event.preventDefault();
    var storageList = [];
    if (localStorage.getItem("cityList")) {
        storageList = JSON.parse(localStorage.getItem("cityList"));
    }
    // Max length = 8
    if (storageList.length > 7) {
        storageList.shift();
        localStorage.setItem("cityList", storageList);
    }
    if (!storageList.includes(city)) {
        storageList.push(city);
    }
    console.log(storageList);
    localStorage.setItem("cityList", JSON.stringify(storageList));
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b76d3a5bbf0536a4b6731b8694802bb2";
    var uvURL = "";
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=b76d3a5bbf0536a4b6731b8694802bb2";
    console.log(weatherURL);
    // First ajax call for today's weather and UVI
    $.ajax({
        url: weatherURL,
        method: "GET"
      })
        .then(function(response) {
            console.log("hi");
            $("#cityName").html(response.name+" "+moment().format("MM/DD/YY")+"<img id='i' />");
            $("#i").attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon+".png");
            $("#temperature").text("Temperature: "+response.main.temp+" °F");
            $("#humidity").text("Humidity: "+response.main.humidity+"%");
            $("#windSpeed").text("Wind Speed: "+response.wind.speed+" MPH");
            uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat="+response.coord.lat+"&lon="+response.coord.lon+"&appid=b76d3a5bbf0536a4b6731b8694802bb2";
            console.log(uvURL);
            $.ajax({
                url: uvURL,
                method: "GET"
              })
                .then(function(response) {
                    console.log(response);
                    $("#uvIndex").text("UV Index: "+response[0].value);
            });
    });

    // Second ajax call for weather forecast
    $.ajax({
        url: forecastURL,
        method: "GET"
      })
        .then(function(response) {
            for (var i=0; i<5; i++) {
                $("#date"+(i+1)).text(moment(response.list[(i*8)].dt_txt).format("MM/DD/YY")); // I used 7 + (i*8) to get the correct offset in the response, since there are 8 timeslots in a day
                $("#i"+(i+1)).attr("src", "http://openweathermap.org/img/wn/"+response.list[(i*8)].weather[0].icon+".png");
                $("#temperature"+(i+1)).text("temp: "+response.list[(i*8)].main.temp+" °F");
                $("#humidity"+(i+1)).text("humidity: "+response.list[(i*8)].main.humidity+"%");
                console.log(response.list[(i*8)].dt_txt);
            }

    });

}

function renderCities () {
    $("#cityList").html("");
    var storageList = [];
    if (localStorage.getItem("cityList")) {
        storageList = JSON.parse(localStorage.getItem("cityList"));
    }
    console.log("hello");
    for (var i=0; i<storageList.length; i++) {
        var cityEl = $("<div class='tile is-vertical-8 box'>");
        cityEl.addClass("has-background-light")
        cityEl.text(storageList[i]);
        $("#cityList").prepend(cityEl);
        cityEl.on("click", function(event) {
            event.preventDefault();
            console.log("hello");
            console.log(i);
            console.log(storageList[0]);
            console.log(event.target.textContent);
            $("#searchText").attr('value', event.target.textContent);
            console.log($("#searchText").val());
            search(event, $("#searchText").attr("value"));
        });
    }
}

renderCities();

$("#searchButton").on("click", function(event) {
    search(event);
    renderCities();
});