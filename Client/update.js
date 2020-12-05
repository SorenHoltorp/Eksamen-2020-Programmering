
let user = JSON.parse(localStorage.getItem("activeUser"));

document.getElementById("userName").value = user.message[0].userName
document.getElementById("email").value = user.message[0].email
document.getElementById("user_birthday").value = user.message[0].birthday
const gender = document.querySelector('input[name="gender"]:checked').value = user.message[0].gender
// const bio = document.querySelector('input[id="bio"]');


//Logout
let logoutknap = document.getElementById('tilbage');
logoutknap.addEventListener('click', (event) => {
event.preventDefault()  
        logout()
    window.location = "frontpage.html"
});

function logout(){
    localStorage.removeItem("activeUser")
};


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
let birthday = document.getElementById("user_birthday");
let gender = document.querySelector('input[name="gender"]:checked')
// let bio = document.querySelector('input[id="bio"]');



       axios.patch("http://localhost:3000/user/" + user.message[0]._id, 
       { 
        userName: userName.value,
        email: email.value,
        gender: gender.value,
       // bio: bio,
        birthday: birthday.value
        })
    .then(response => {
    console.log('34')
    localStorage.setItem("activeUser", JSON.stringify(response.data))
        console.log(response)
    })
}


//set item to 2

let sutsko = document.getElementById('mainpage');
sutsko.addEventListener('click', (event) => {
event.preventDefault()  
        mainpage()
    window.location = "mainpage.html"
});

function mainpage(){
    localStorage.getItem("activeUser")
};
