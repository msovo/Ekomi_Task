$(".AddUser").click(function(){
    $(".TableCreateTask").css("display","none");
    $(".DynamicHTMLPlaceholder").html("")
    $(".TableCreateuser").fadeIn("slow");

});
$(".CreateATask").click(function(){
    $(".TableCreateuser").css("display","none");
    $(".DynamicHTMLPlaceholder").html("")
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
            AjaxPostRequest(formdata)
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

            AjaxPostRequest(formdata)

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
function AjaxPostRequest(formdata){
    var xhr= new XMLHttpRequest();
    xhr.onload=function(){
        ResponseFromAjaxPost(this.responseText)
        }
    xhr.open("POST","_PHP/Home.php")
    xhr.send(formdata);
}

function ResponseFromAjaxPost(res){
    alert(res)
    if(res==1){
        $(".TableCreateuser").css("display","none");
        $(".TableCreateTask").css("display","none");
    }
}


//function that will be executed when we press the list button from the GUI
//the parameter will be based on the type of an action is required, whether to list users/tasks/or asigned tasks

//use get request to get the list as per the nature of the request if it for listing of tasks or users or it is for the user to asgn a task to the user
function AjaxGetRequest(action,Table){
var xhr= new XMLHttpRequest();
    xhr.onload=function(){
        ResponseFromAjaxGet(this.responseText)
        }
    xhr.open("GET","_PHP/Home.php?Action="+action+"&&Table="+Table+"")
    xhr.send();
}

function ResponseFromAjaxGet(Data){
    Newdata=JSON.parse(Data);
//Explains the number between 1 and 3 in terms of refering to tablenames
// 1 = Users table
// 2 = Task table
// 3 = Assigned tasks table
///4 is getting data to create an assign task funtions

    if(Newdata["TblError"]==1){
        switch(Newdata["TblName"])
        {
            case 1:
                CreateHTMLCode(Newdata.data, "Users")
                break;
            case 2:
                CreateHTMLCode(Newdata.data,"Tasks")
                break;
            case 3:
                CreateHTMLCode(Newdata.data,"Assigned Tasks")
                break;
            case 4:
                HandleAsignTasks(Newdata.data)
                break;
            default:
                break;

        }
    }

}

//this  function will create an html code for our lists
function CreateHTMLCode(data,description) {

    var output="<div>"+description+"</div><table>"
    for(var i=0;i<data.length;i++)
    {
        var id
        output +="<tr>"
        for(var j=0;j<data[i].length;j++){
            output += "<td>" + data[i][j] + "</td>"
            id=data[i][0]
        }
        output += "<td><button type='button' class='Delete' onclick='DeleteFunc("+id+","+i+")'>Delete</button></td>"
        +"<td><button type='button' class='Edit'  onclick='EditFunc("+id+","+i+")'>Edit</button></td>"
        +"</tr>"
    }
    output += "</table></div>"+sortFilter(data)+""

    AddToDisplayThelist(output,description)

}

function sortFilter(data){
    output="<div>"
   + '<input type="radio" id="Ascending" name="sort_by_id" value="Ascending">'
   + '<label for="Ascending">Ascending</label><br>'
   + '<input type="radio" id="Descending" name="sort_by_id" value="Descending">'
    +'<label for="Descending">Descending</label><br></br></div>'

    return output
}

function AddToDisplayThelist(HMLcode,description) {
    
//Hide anything possible to be visible in the mainbar using DynamicHTMLPlaceholder area
$(".DynamicHTMLPlaceholder").html("")
$(".TableCreateuser").css("display","none");
$(".TableCreateTask").css("display","none");
$("."+description).css("display","none");//if possible it is  clicked it must be closed
$(".DynamicHTMLPlaceholder").append("<div class="+description+" style='display:none'>"+HMLcode+"</div>")
$("."+description).fadeIn("slow");

}


function HandleAsignTasks(data){
    
    for(var j=0;j<1;j++){
        switch(j){
            case 0:
                label="Whom does the task below to"
                selectLabel="Please select the candidate"
                break;
            case 1:
                label="Which task do you want to asign?"
                selectLabel="Please select the task"
        }
    output="<label>"+label+"</label><select name='select"+j+"' class='select"+j+"'><option value='default'>"+selectLabel+"</option"
    for(var i=0 ; data[j].length;i++){
       // output+="<option value='"+data[j][i]+"'>"+data[j][i]+"</option>"
    }
    output+="</select>";

 }
 $(".DynamicHTMLPlaceholder").html("")
 $(".DynamicHTMLPlaceholder").append(output)


}

function DeleteFunc(Id, Index){

}

function EditFunc(Id, Index){

}