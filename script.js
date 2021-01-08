// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Davis&appid=b76d3a5bbf0536a4b6731b8694802bb2";

// $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     .then(function(response) {
//         console.log("hi");
//         $("#temperature").text("Temperature: "+response.main.temp);
// });

function search(event) {
    event.preventDefault();
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $("#searchText").val() + "&units=imperial&appid=b76d3a5bbf0536a4b6731b8694802bb2";
    var uvURL = "";
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + $("#searchText").val() + "&units=imperial&appid=b76d3a5bbf0536a4b6731b8694802bb2";
    console.log(weatherURL);
    // First ajax call for today's weather and UVI
    $.ajax({
        url: weatherURL,
        method: "GET"
      })
        .then(function(response) {
            console.log("hi");
            $("#cityName").text(response.name+" "+moment().format("MM/DD/YY"));
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
                $("#date"+(i+1)).text(moment(response.list[3+(i*8)].dt_txt).format("MM/DD/YY"));
                $("#temperature"+(i+1)).text("temp: "+response.list[3+(i*8)].main.temp+" °F");
                $("#humidity"+(i+1)).text("humidity: "+response.list[3+(i*8)].main.humidity+"%");
            }

    });

}

$("#searchButton").on("click", search);