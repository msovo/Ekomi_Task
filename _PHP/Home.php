<?php
require("Config.php");
$ReturnObj = new \stdClass; //We will use this object to return data to js

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

//Consider the Get Request to list as the nature of the request from JS

if(isset($_GET["Action"]) && isset($_GET["Table"])){
  $action=htmlspecialchars($_GET["Action"]);
  $NumberTospecifyTable=htmlspecialchars($_GET["Table"]);
  switch($NumberTospecifyTable){
    case 1:
        $table="users_tbl";
        $ReturnObj->TblError=1;
        $ReturnObj->TblName=1;
        break;
    case 2:
        $table="tasks_tbl";
        $ReturnObj->TblError=1;
        $ReturnObj->TblName=2;

        break;
    case 3:
        $table="assinged_tasks_tbl";
        $ReturnObj->TblError=1;
        $ReturnObj->TblName=3;
      case 4:
        $ReturnObj->TblError=1;
        $ReturnObj->TblName=4;
      break;
     default:
        $ReturnObj->TblError=-1;
        break;
}
//Check if the action is to list the task/users or it is for getting task and users data to enable a user to asign a taskk to the user
  if($action=="List" || $action=="Asign"){
    if($action =="Asign"){
        $sqlQuery="(SELECT
        Fullnames
        FROM users_tbl)
    UNION
    (SELECT
        Task_type
        FROM tasks_tbl)";
    }else{
      $sqlQuery="SELECT * FROM ".$table."";
    }
    $result = $con->query($sqlQuery);
    if ($result->num_rows > 0){
        $row = $result->fetch_all();
        $ReturnObj->data = $row;
        echo (json_encode($ReturnObj));
    } else {
        $ReturnObj->status = -1;
        echo (json_encode($ReturnObj));
    }
  }
}