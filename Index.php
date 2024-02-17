<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="Styles/EkomiCSS.css" /> 
    <script src="JS/jquery.js"></script>

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
    <div class="container">
        <div class="sidebar">
            <button type="button" class="ViewAssingedTasks">View Assinged Tasks</button>
            <button type="button" class="ListUsers"  onclick="Listusers()">List Users</button>
            <button type="button" class="AddUser">Add a User</button>
            <button type="button" class="ListTasks">List Tasks</button>
            <button type="button" class="CreateATask">Create a Task</button>
        </div>
        <div class="mainbar">
    <div class="TableCreateuser"  style="display: none;">
        <div class="Headinguser">
            <h3>Add a new user the system</h3>
        </div>
        <form method="post" id="FormTaskSubmit">
            <table class="TableUserForm">
                <tr>
                    <td>FullName</td>
                    <td><input type="text" id="fullnames"></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td> <input type="text" id="email"></td>
                </tr>
                <tr>
                    <td>Date of birth</td>
                    <td> <input type="date" id="dateofbirth"></td>
                </tr>
                <tr>
                    <td></td>
                    <td> <button type="button" onclick="CollectFromForm(2)"  class="Btn_SubmitUser">Submit</button></td>
                </tr>
            </table>
           
        </form>
    </div>
    <div class="TableCreateTask" style="display: none;">
    <div class="HeadingTask">
            <h3>Add a new Task the system</h3>
        </div>
            <table class="TableTaskForm">
                <tr>
                    <td>Type</td>
                    <td><input type="text" id='tasktype'></td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td> <input type="text" id='taskDescription'></td>
                </tr>
                <tr>
                    <td></td>
                    <td><button type="button" onclick="CollectFromForm(1)" class="Btn_SubmitTask">Submit</button></td>
                </tr>

            </table>
    
    </div>
        </div>
    </div>
</body>
<div class="footer">
    <div class="Fleft">
        EKOMI Task Management for recruitement process
    </div>
    <div class="Fcenter">
        Designed by Msovo
    </div>
    <div class="Fright">
        2/17/2024
    </div>
</div>

<script src="JS/index.js"></script>
</html>