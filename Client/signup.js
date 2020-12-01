let button = document.getElementById("submitknap");
button.addEventListener("click", () => opretKnap())


     function opretKnap() {
        let name = document.getElementById('userName').value;
        let psw = document.getElementById('password').value;
        let email = document.getElementById('email').value;
        let birthday = document.getElementById('user_birthday').value;
        let radio = document.querySelector('input[name="gender"]:checked').value
        axios.post("http://localhost:3000/user/signup/", {name: name.value, password: psw.value,
    email: email.value, birthday: birthday.value, gender: radio.value})
          .then(response=>{
              console.log(response)
              window.location = "mainpage.html"
          })
     }