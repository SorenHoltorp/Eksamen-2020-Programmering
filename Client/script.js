window.onload = function() {
    showUser();
}

function showUser() {
        let userName = document.getElementById("userName");
        let gender = document.getElementById('gender');
        let email = document.getElementById('email');
        let birthday = document.getElementById('birthday');
        

        let User = JSON.parse(localStorage.getItem("activeUser"));
        userName.innerHTML=User.message[0].userName
        gender.innerHTML=User.message[0].gender
        email.innerHTML=User.message[0].email
        birthday.innerHTML=User.message[0].birthday
        console.log(User)
}

/*
let button = document.getElementById('deletebtn');
button.addEventListener('click', (event) => {
event.preventDefault()  
    deleteButton()  
});

function deleteButton() {
    let user = showUser;
    axios.delete('http://localhost:3000/user/delete/', { user: user, id: _id })
    .then(response => {
        console.log(response)
        window.location = 'frontpage.html';
    })
}

*/

document.getElementById("tilbagetilforside").onclick = function(){
    location.href = "frontpage.html";
}