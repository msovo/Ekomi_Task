<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="Styles/EkomiCSS.css" /> 
    <title>Task Management</title>
</head>
<body>
    <header>
        <div class="topLayer">
            <div class="left">
                <img src="Images/logo_header2.png" alt="Logo" />
            </div>
            <div class="center">
                <h4>Task Management</h4>
            </div>
            <div class="right">
 <?php
$methodForRequest="GET";
$urlToRequest= "https://api.openweathermap.org/data/2.5/weather?lat=-26.20227000&lon=28.04363000&appid=b73af6037a5837b382b6d1dca7529938";

 function CallAPI($method, $url, $data = false)
  {
    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}

$APIResult= json_decode( CallAPI($methodForRequest, $urlToRequest, $data = false));
$Name=$APIResult ->name;
$WindSpeed=$APIResult->wind->speed;
$WeatherStatus=$APIResult->weather[0]-> description;
?>
<div class="Cityname">City: <?php echo $Name ?> </div>
<div class="Windspeed"> Wind speed: <?php echo $WindSpeed ?> </div>
<div class="CurrentStatus"> Current weather: <?php echo $WeatherStatus ?> </div>
            </div>
        </div>
    </header>
</body>
</html>