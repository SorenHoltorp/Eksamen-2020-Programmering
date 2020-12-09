
var loggedbruger=JSON.parse(localStorage.getItem("activeUser"));if(loggedbruger===null)
{alert("Du er ikke logget korrekt ind");window.location.href="frontpage.html";}

let user = JSON.parse(localStorage.getItem("activeUser"));

document.getElementById("userName").value = user.message[0].userName
document.getElementById("email").value = user.message[0].email
document.getElementById("user_birthday").value = user.message[0].birthday
const gender = document.querySelector('input[name="gender"]:checked').value = user.message[0].gender
// const bio = document.querySelector('input[id="bio"]');


//Logout

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
        {alert("Din bruger er nu blevet opdateret. Derfor bliver nu ført tilbage tilbage til login")}
        window.location = "frontpage.html"
        
    })
}


//Tilbage til mainpage uden at have opdateret.
let sutsko = document.getElementById('mainpage');
sutsko.addEventListener('click', (event) => {
event.preventDefault()  
        mainpage()
    window.location = "mainpage.html"
});

function mainpage(){
    localStorage.getItem("activeUser")
};
