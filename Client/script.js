window.onload = function() {
    showUser();
}

function showUser() {
        let name = document.getElementById("name");
        let gender = document.getElementById('gender');
        let email = document.getElementById('email');
        let birthday = document.getElementById('birthday');

        let user = JSON.parse(localStorage.getItem("activeUser"));
        name.innerHTML=user.message[0].userName
        gender.innerHTML=user.message[0].gender
        email.innerHTML=user.message[0].email
        birthday.innerHTML=user.message[0].birthday

        console.log(showUser)



}
