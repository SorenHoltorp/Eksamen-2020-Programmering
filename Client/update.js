
let user = JSON.parse(localStorage.getItem("activeUser"));

document.getElementById("userName").value = user.message[0].userName
document.getElementById("email").value = user.message[0].email
document.getElementById("user_birthday").value = user.message[0].birthday
//const radio = document.querySelector('input[name="gender"]:checked').value = user.message[0].gender
document.getElementById("bio").value = user.message[0].bio


let button = document.getElementById("submit")
button.addEventListener("click", (event) => {
event.preventDefault()
updateKnap()

} );

   // let bio = document.getElementById("bio").value = user.message[0].bio;

function updateKnap()  {
let userName = document.getElementById("userName");
let email = document.getElementById("email");
let user = JSON.parse(localStorage.getItem("activeUser"));


       axios({
       method: "patch",
       url: "http://localhost:3000/user/"+ user.message[0]._id,
        data: {
        userName: userName.value,
        email: email.value,
        }
    })
    .then(response => {
    console.log('34')
    localStorage.setItem("activeUser"),JSON.stringify(response)
        console.log(response)
     window.location = 'mainpage.html';

    })
}
    


    /*
    .then(response=>{
            console.log(response)
            window.location = 'mainpage.html';
        })
        


/*
document.getElementById("submit").onclick = function(){
  location.href = "mainpage.html";
}

*/




document.getElementById("tilbage").onclick = function(){
    location.href = "mainpage.html";
  }

