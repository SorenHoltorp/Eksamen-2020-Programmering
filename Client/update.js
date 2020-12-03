let user = JSON.parse(localStorage.getItem("activeUser"))

document.getElementById("userName").value = user.message[0].userName
document.getElementById("email").value = user.message[0].email
document.getElementById("user_birthday").value = user.message[0].birthday
const radio = document.querySelector('input[name="gender"]:checked').value = user.message[0].gender
document.getElementById("bio").value = user.message[0].bio


function updateKnap() {
    let userName = document.getElementById("userName")

    axios({
        method: "put",
        url: "http://localhost:3000/newuserId/update",
        data:
        {userName: userName.value, 
            email: email.value, 
            birthday: birthday.value, 
            gender: gender.value, 
            bio: bio.value
        }
    .then(response => {
        console.log(response)
        localStorage.setItem('activeUser', JSON.stringify(response.data))
        window.location.href = 'mainpage.html';
    })
})
}


document.getElementById("submit").onclick = function(){
  location.href = "mainpage.html";
}
let button = document.getElementById("submit")
button.addEventListener("click", (event) => {
event.preventDefault()
updateKnap()

} );