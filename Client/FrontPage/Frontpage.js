document.getElementById("create").onclick = function(){
        location.href = "../Createacc/Createacc.html";
    }

    // Ændre 0 til local storage username
    document.getElementById("login").onclick = function(){
        if (username.value.length !== 0 && password.value.length !== 0 ){
            location.href = "../Mainpage/mainpage.html";
        }else{
                alert ("fill out login");
            }
        }
    
        let apiButton = document.getElementById("apiButton");
    apiButton.addEventListener("click", function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                alert(xhttp.responseText);
            }
        };
        xhttp.open("GET", "http://localhost:3000/Client/FrontPage/frontpage.html", true);
        xhttp.send();
      });