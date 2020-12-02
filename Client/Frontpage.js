
  const userName = document.getElementById("idUsername")
  const psw = document.getElementById("idPsw")
  const button = document.getElementById("login")


 
      function loginknap() {
          axios.post("http://localhost:3000/user/login", {
              userName: userName.value, password: psw.value})
          .then(response => {
              console.log(response)
              localStorage.setItem('activeUser', JSON.stringify(response.data))
              window.location.href = 'mainpage.html';
          })
      }

      document.getElementById("create").onclick = function(){
        location.href = "Createacc.html";
    }

 button.addEventListener("click", (event) => {
    event.preventDefault()
    loginknap()

   } );

    //Kan logge ind med so - 1234