
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

let userName = document.getElementById("userName");
    let email = document.getElementById("email");
   // let bio = document.getElementById("bio").value = user.message[0].bio;

function updateKnap() {
     
   try {
       axios.put("http://localhost:3000/user/" + user.message[0]._id, {
        userName: userName.value,
        email: email.value 
        })

        console.log(res.data);
    } catch (err) {
        console.error(err)
    }
   };



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

