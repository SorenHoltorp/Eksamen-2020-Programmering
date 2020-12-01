
 let button = document.getElementById("login")
 button.addEventListener("click", (event) => {
    event.preventDefault()
    loginknap()

   } );
 
      function loginknap() {
          let username = document.getElementById("idUsername")
          let psw = document.getElementById("idPsw")
          axios.post("http://localhost:3000/user/login", {user: username.value, password: psw.value})
          .then(response => {
              console.log(response)
              localStorage.setItem('activeUser', JSON.stringify(response.data))
              window.location.href = 'mainpage.html';
          })
      }


      document.getElementById("create").onclick = function(){
        location.href = "Createacc.html";
    }