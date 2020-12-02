let button = document.getElementById("submit");
button.addEventListener('click', () => opretKnap())


     function opretKnap() {
        let userName = document.getElementById('userName');
        let psw = document.getElementById('password');
        let email = document.getElementById('email');
        let birthday = document.getElementById('user_birthday');
        let radio = document.querySelector('input[name="gender"]:checked').value
            //let bio = document.querySelector('input[id="bio"]');
        console.log(opretKnap)
        axios.post("http://localhost:3000/user/signup/", {userName: userName.value, password: psw.value,
    email: email.value, birthday: birthday.value, /*gender: gender.value,*/ gender: radio, /*bio: bio.value*/})
          .then(response=>{
              console.log(response)
              window.location = 'mainpage.html';
          })
     }