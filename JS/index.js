$(".AddUser").click(function(){
    $(".TableCreateTask").css("display","none");;

    $(".TableCreateuser").fadeIn("slow");

});
$(".CreateATask").click(function(){
    $(".TableCreateuser").css("display","none");

    $(".TableCreateTask").fadeIn("slow");
});

//lets collect information using this function from HTML inputs when the submit button is pressed
//lets create a formdata that we will submit to our server so it can interact with SQL queries
function CollectFromForm(type) {

    var formdata = new FormData();
    var ArrInput={}
    if(type == 1){

        tasktype=$("#tasktype").val();
        taskDescription=$("#taskDescription").val();

        ArrInput["tasktype"]=tasktype
        ArrInput["taskDescription"]= taskDescription
     
        res =  validinputCheck(ArrInput)

        if(!res.includes("0")){
            formdata.append("tasktype",tasktype);
            formdata.append("taskDescription",taskDescription);
            formdata.append("Request","Task");
            AjaxRequest(formdata)
        }else{
            $(".errorwarning").remove()
            $(".Btn_Submittask").after("<div class='errorwarning' style='color:red'>Please fill in all the required fields</div>")
        }
    }else if(type == 2){

        fullnames=$("#fullnames").val();
        email=$("#email").val()
        dateofbirth=$("#dateofbirth").val()

        ArrInput["fullnames"]=fullnames
        ArrInput["email"]=email
        ArrInput["dateofbirth"]=dateofbirth

        res = validinputCheck(ArrInput)

        if(!res.includes("0")){
            formdata.append("fullnames",fullnames);
            formdata.append("email",email);
            formdata.append("dateofbirth",dateofbirth);
            formdata.append("Request","User");

            AjaxRequest(formdata)

        }else{
            $(".errorwarning").remove()

            $(".Btn_SubmitUser").after("<div class='errorwarning' style='color:red'>Please fill in all the required fields</div>")
        }
    
    }else{
        $(".errorwarning").remove()

        $(".Btn_SubmitUser").after("<div class='errorwarning' style='color:red'>Internal Error Occured</div>")
    }

}

//the function checks if the input contains values
function validinputCheck(input){

    var stringCheckifcontaininvalidinput=""
    Object.entries(input).forEach(([key, val]) => {

        if(val.length == 0){
            $("#"+key).after("<label style='color:red'>Required<label/>")
            stringCheckifcontaininvalidinput+= " 0 "
        }else{
            stringCheckifcontaininvalidinput+= " 1 "
        }
    })

    return stringCheckifcontaininvalidinput
}

//formdata Takes a parameter of the data to send to the server
function AjaxRequest(formdata){
    var xhr= new XMLHttpRequest();
    xhr.onload=function(){
        ResponseFromAjax(this.responseText)
        }
    xhr.open("POST","_PHP/Home.php")
    xhr.send(formdata);
}

function ResponseFromAjax(res){
    alert(res)
    if(res==1){
        $(".TableCreateuser").css("display","none");
        $(".TableCreateTask").css("display","none");
    }
}