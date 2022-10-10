const percentages=document.querySelectorAll(".tip_percentages button");
const bill=document.getElementById("bill");
const people=document.getElementById("people");
const tip_person=document.querySelector(".tip_person");
const total_person=document.querySelector(".total_person");
const reset=document.querySelector(".reset");
const custom=document.querySelector(".custom");
const message=document.querySelectorAll(".message");
const input=document.querySelectorAll("input");


let var_bill;
let var_people;
let tip;
let percentage=0;
let x=-1;
const regex=/^[0-9]+(\.|\,)?[0-9]+$/;

for(let i=0;i< percentages.length;i++){
  percentages[i].addEventListener("click", function(){
  if(x!=-1)
  percentages[x].classList.remove("active");
  if(message[1]!="")
  message[1].innerHTML="";

  percentage=Number(this.value);
  custom.value="";
  x=i;
  calcTip(percentage);
  this.classList.add("active"); 

  });       
}

function calcTip(percentage){
  if(bill.value!="" && people.value!="" && percentage!=0)
  {
    if(regex.test(bill.value)){
      var_bill=bill.value;
      var_bill=Number(var_bill.replace(',','.'));
      var_people=Number(people.value);      
      tip=Number((var_bill*percentage).toFixed(2));
      tip_person.innerHTML="$"+(tip/var_people).toFixed(2);
      total_person.innerHTML="$"+((var_bill+tip)/(var_people)).toFixed(2);
      reset.classList.add("active");
    }
    else
    {
      message[0].innerHTML="Wrong format";
      bill.classList.add("error"); 
    }
  }      
}

reset.addEventListener("click",function(){
  percentages[x].classList.remove("active");
  reset.classList.remove("active");
  bill.value="";
  people.value="";
  tip_person.innerHTML="$0.00";
  total_person.innerHTML="$0.00";
  custom.value="";
  x=-1;
  percentage=0;
});

for(let i=0;i<input.length;i++){

  input[i].addEventListener("input", function(){

     if(this.classList.contains("error"))
     {
      this.classList.remove("error");
      message[i].innerHTML="";
     }
     else if(message[i].innerHTML!=""){
      message[i].innerHTML="";
     }

     if(this.classList.contains("custom")){
      if(x!=-1)
      percentages[x].classList.remove("active");
      percentage=(this.value)/100;

     }

      calcTip(percentage);

  });

  input[i].addEventListener("keypress", function(e){
      var charCode = (typeof e.which == 'number') ? e.which : e.keyCode;

      if(this.id=="bill")
      {
        if ((charCode > 31 && (charCode < 44 || charCode > 57 || charCode==45 || charCode==47)))
        e.preventDefault();
      }
      else{
         if (charCode > 31 && (charCode < 48 || charCode > 57))
          e.preventDefault();
      }

      if(e.keyCode===13){

      if(bill.value=="")
      {
        bill.classList.add("error");
        message[0].innerHTML="Can't be blank";
      }
      if(percentage==0)
      {
        message[1].innerHTML="Can't be blank";
        if(this.classList.contains("custom"))
          this.classList.add("error");
      }
      if(people.value=="")
      {
        people.classList.add("error");
        message[2].innerHTML="Can't be blank";
      }

      }
  });

}