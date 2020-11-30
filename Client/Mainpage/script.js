window.onload = function(){
    showUser()
}

function showUser(){
        let navn = document.getElementById("navn");
        let køn = document.getElementById('gender');
        let email = document.getElementById('email');
        let alder = document.getElementById('age');
        let info = document.getElementById('additional_info');

        let infoUser = JSON.parse(localStorage.getItem("activeUser"));
        name.innerHTML=user.message.username
        køn.innerHTML=user.message.køn
        email.innerHTML=user.message.email
        alder.innerHTML=user.message.alder
        info.innerHTML=user.message.info

        console.log(showUser)



}
