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
    console.log(weatherURL);
    $.ajax({
        url: weatherURL,
        method: "GET"
      })
        .then(function(response) {
            console.log("hi");
            $("#cityName").text(response.name);
            $("#temperature").text("Temperature: "+response.main.temp+" degrees fahrenheit");
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

}

$("#searchButton").on("click", search);