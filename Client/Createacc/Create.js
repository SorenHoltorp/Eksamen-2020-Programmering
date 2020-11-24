const mongoose = require("mongoose");





function validateContactInformation() {
    
    
    // Punkt 1: Sæt JS variable, til de værdier der er indtastet i HTML formen
    
    var name = document.getElementById('user_name').value;
    var password = document.getElementById('password').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    var comment = document.getElementById('additional_info').value;
    var contactDay = document.getElementById('contact_day').value;
    var contactMonth = document.getElementById('contact_month').value;
    var contactYear = document.getElementById('contact_year').value;
    
     
    // Date() klassen henter dags dato i centraleuropæisk tid GMT +0200
    // Når vi instantierer en variabel ligesom currentDate i den nedenstående med new Date(), så indeholder denne variabel altså dags dato og klokkeslæt
    var currentDate = new Date();
    var contactDate = new Date();
    
    
    // vi tilføjer brugerens valgte kontakt dato med setFullYear()-metoden
    contactDate.setFullYear(contactYear, contactMonth-1, contactDay);
    
    
    // Radio buttons er faktisk et array, hvor man kun kan vælge en mulighed, så vi skal loope igennem for at tjekke om en radio button er checked

    //Henter arrayet
    var ratingButtons = document.getElementsByClassName('user_rating'); 

    //Længden af arrayet ligges i en variable kaldt len
    var len = ratingButtons.length;

    //Placeholder ofr userRating, som pt. bare er en tom String
    var userRating = "";
    
    /* vi laver et loop og ser efter om rating button er checked med ".checked" keywordet.
     Hvis den er checked, så finder den valuen i den radio button */
    var i = 0;
    
    var validRadio = false;
    for (i=0; i<len; i++) {
        if (ratingButtons[i].checked) {
            userRating = ratingButtons[i].value;
        
            // vi tilføjer at variablen validRadio bliver sand, hvis en userRating er checked. 
            validRadio = true;
        }
    }
    
    
    // Vi slutter funktionen af med at lave en alert besked for at se om alle de varible er blevet hentet ordenligt fra html dokumentet
   alert("Hej " + name         + "\nKøn: " + userRating
         + "\npassword: " + password
         + "\nPhone: " + phone
         + "\nEmail: " + email
         + "\nYour comment: " + comment
         + "\nYour requested date to be contacted: " + contactDate
         + "\nToday's date: " + currentDate);
       
}

//Code til at sende mig videre til main page    

 /*type="text/javascript">
document.getElementById("opret").onclick = function(){
 location.href = "..//Mainpage/mainpage.html";
}*/

/* document.getElementById("main").onclick = function(){
      location.href = "../Mainpage/mainpage.html";
     } */