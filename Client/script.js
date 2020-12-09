var loggedbruger=JSON.parse(localStorage.getItem("activeUser"));if(loggedbruger===null)
{alert("Du er ikke logget korrekt ind");window.location.href="frontpage.html";}

window.onload = function() {
    showUser();
}

function showUser() {
        let userName = document.getElementById("userName");
        let gender = document.getElementById('gender');
        let email = document.getElementById('email');
        let user_birthday = document.getElementById('user_birthday');
       // let bio = document.getElementById('bio');


        let user = JSON.parse(localStorage.getItem("activeUser"));
        userName.innerHTML=user.message[0].userName;
        gender.innerHTML=user.message[0].gender;
        email.innerHTML=user.message[0].email;
        user_birthday.innerHTML=user.message[0].birthday;
       // bio.innerHTML = user.message[0].bio;

        console.log(showUser)
}
//Logout
let logoutknap = document.getElementById('logout');
logoutknap.addEventListener('click', (event) => {
event.preventDefault()  
        logout()
        alert("Du vil nu blive logget ud, tak for nu!")
    window.location = "frontpage.html"
});

function logout(){
    localStorage.removeItem("activeUser")
};



//Update
let updateknap = document.getElementById('editbtn');
updateknap.addEventListener('click', (event) => {
event.preventDefault()  
});

document.getElementById("editbtn").onclick = function(){
    location.href = "update.html";}


//Slet
let button = document.getElementById('sletbtn');
button.addEventListener('click', (event) => {
event.preventDefault()  
    sletKnap() 
    logout() 
});

function sletKnap() {
    let user = JSON.parse(localStorage.getItem("activeUser"));
    axios.delete('http://localhost:3000/user/' + user.message[0]._id)
    .then(response => {
        console.log(response)
        alert("Din bruger er nu slettet")
        window.location = 'frontpage.html';
    })
}



document.getElementById("matchside").onclick = function(){
    location.href = "match.html";}


    
   