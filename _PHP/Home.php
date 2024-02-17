<?php
require("Config.php");

if(isset($_POST["Request"])){

    if($_POST["Request"]=="Task"){
        if(isset($_POST["tasktype"]) && isset($_POST["taskDescription"])){
            $tasktype=$_POST["tasktype"];
            $taskDescritption=$_POST["taskDescription"];
            $status=1;
            $SQLQuery="INSERT INTO tasks_tbl(Task_type, Description,Status) VALUES('".$tasktype."','".$taskDescritption."','".$status."')";
            if ($con->query($SQLQuery) === TRUE) {
                echo 1;
              } else {
                echo -1;
              }
    }
}else if($_POST["Request"]=="User"){
        if(isset($_POST["fullnames"]) && isset($_POST["email"]) && isset($_POST["dateofbirth"])){
            $fullnames=$_POST["fullnames"];
            $email=$_POST["email"];
            $dateofbirth=$_POST["dateofbirth"];
            $status=1;
            $SQLQuery="INSERT INTO users_tbl(Fullnames, Email,status,Date_Of_Birth) VALUES('".$fullnames."','".$email."','".$status."','".$dateofbirth."')";
            if ($con->query($SQLQuery) === TRUE) {
                echo 1;
              } else {
                echo -1;
              }
        }
    }
}
