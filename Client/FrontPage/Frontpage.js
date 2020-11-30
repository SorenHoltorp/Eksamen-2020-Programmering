document.getElementById("create").onclick = function(){
        location.href = "../Createacc/Createacc.html";
    }
    /* Ændre 0 til local storage username
    document.getElementById("login").onclick = function(){
        if (username.value.length !== 0 && password.value.length !== 0 ){
            location.href = "../Mainpage/mainpage.html";
        }else{
                alert ("fill out login");
            }
        }
        */
 let button = document.getElementById("login")
 button.addEventListener("click", (event) => {
    loginknap()
    event.preventDefault()
   } );
 

      function loginknap(){
          let username = document.getElementById("idUsername")
          let psw = document.getElementById("idPsw")
          axios.post("http://localhost:3000/user/Client/FrontPage/frontpage.html", {user:username.value, password: psw.value})
          .then(response=>{
              console.log(response)
              window.location.href = "..//Mainpage/mainpage.html";
            localStorage.setItem("activeUser",toString(response.data))
          })
      }
