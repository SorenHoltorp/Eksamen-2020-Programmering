window.onload = function() {
    showUser();
}

function showUser() {
        let userName = document.getElementById("userName");
        let gender = document.getElementById('gender');
        let email = document.getElementById('email');
        let birthday = document.getElementById('birthday');
        // let bio = document.getElementById('bio');


        let user = JSON.parse(localStorage.getItem("activeUser"));
        userName.innerHTML=user.message[0].userName;
        gender.innerHTML=user.message[0].gender;
        email.innerHTML=user.message[0].email;
        birthday.innerHTML=user.message[0].birthday;
        // bio.innerHTML = user.message[0].bio;

        console.log(showUser)
}

/*
let button = document.getElementById('sletbtn');
button.addEventListener('click', (event) => {
event.preventDefault()  
    sletKnap()  
});

function sletKnap() {
    let user = showUser;
    axios.delete('http://localhost:3000/user/userId/', { user: user, id: _id })
    .then(response => {
        console.log(response)
        window.location = 'frontpage.html';
    })
}
*/


document.getElementById("tilbagetilforside").onclick = function(){
    location.href = "frontpage.html";
}