window.onload = function() {
    showUser();
}

function showUser() {
        let userName = document.getElementById("name");
        let gender = document.getElementById('gender');
        let email = document.getElementById('email');
        let birthday = document.getElementById('birthday');
        

        let user = JSON.parse(localStorage.getItem("activeUser"));
        userName.innerHTML=user.message[0].userName
        gender.innerHTML=user.message[0].gender
        email.innerHTML=user.message[0].email
        birthday.innerHTML=user.message[0].birthday
        console.log(user)
}

/*let button = document.getElementById('deletebtn');
button.addEventListener('click', (event) => {
event.preventDefault()  
    deleteButton()  
});

function deleteButton() {
    let user = showUser;
    axios.delete('http://localhost:3000/userSign/delete/', { user: user, id: _id })
    .then(response => {
        console.log(response)
        window.location = 'frontpage.html';
    })
}*/
