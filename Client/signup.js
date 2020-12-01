let button = document.getElementById("submit");
button.addEventListener('click', () => opretKnap())


     function opretKnap() {
        let name = document.getElementById('userName');
        let psw = document.getElementById('password');
        let email = document.getElementById('email');
        let birthday = document.getElementById('user_birthday');
        let radio = document.querySelector('input[name="gender"]:checked').value
        console.log(radio)
        axios.post("http://localhost:3000/user/signup/", {name: name.value, password: psw.value,
    email: email.value, birthday: birthday.value, gender: radio.value})
          .then(response=>{
              console.log(response)
              window.location.href = 'mainpage.html';
          })
     }