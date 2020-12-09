
function getnew()  {
    let userName = document.getElementById("userName");
    let birthday = document.getElementById("user_birthday");
    let gender = document.querySelector('input[name="gender"]:checked')
    
           axios.get("http://localhost:3000/user/" + user.message[0]._id, 
           { 
            userName: userName.value,
            gender: gender.value,
            birthday: birthday.value
            })

        .then(response => {
        console.log('34')
        userName.innerHTML=user.message[0].userName;
        gender.innerHTML=user.message[0].gender;
        birthday.innerHTML=user.message[0].birthday;
            console.log(response)
        })
    }

    //Nyt match knap 
    let button = document.querySelector("nyt");
    if(button){
        button.addEventListener("click",swapper, false);() =>{
            event.preventDefault()  
            getnew()
        }
    }
    document.getElementById("tilbage").onclick = function(){
        location.href = "mainpage.html";}



let randomMatch = Math.floor(Math.random()*newuser.length)
axios.get("http://localhost:3000/user/" + user[randomMatch])
.then(function(response)
{
    let newuser = new User
    response.data.userName
    response.data.gender
    response.data.birthday
})




/*

window.onload = function() {
    showMatch();
}

function showMatch() {
    let matchName = document.getElementById("matchName");
    let matchGender = document.getElementById('matchGender');
    let matchAlder = document.getElementById('matchAlder');

    let match = JSON.parse(localStorage.getItem("activeMatch"));
    matchName.innerHTML=match.message[0].matchName;
    matchGender.innerHTML=match.message[0].matchGender;
    matchAlder.innerHTML=match.message[0].matchAlder;
    

    console.log(showMatch)
}
let match = JSON.parse(localStorage.getItem("activeMatch"));
//Nyt match knap 
    let button = document.querySelector("nyt");
    button.addEventListener("click",() =>{
        event.preventDefault()  
        getnew()
    })
 

function getnew (){
    let matchName = document.getElementById("matchName");
    let matchGender = document.getElementById('matchGender');
    let matchAlder = document.getElementById('matchAlder');
    let match = JSON.parse(localStorage.getItem("activeMatch"));
    axios.get('http://localhost:3000/match/' + match.message[0]._id,{
        matchName: matchName.value,
        matchGender: matchGender.value,
        matchAlder: matchAlder.value,
    })
    .then(response => {
        console.log('34')
        localStorage.setItem("activeUser", JSON.stringify(response.data))
            console.log(response)
        })
}


 





let likebtn = document.querySelector("likebtn");
likebtn.addEventListener("click",() =>{
    event.preventDefault()  
    likef()

})
let dislikebtn = document.querySelector("dislikebtn");
dislikebtn.addEventListener("click",() =>{
    event.preventDefault()  
    dislikef()
})


function likef (){
    let likebtn = document.querySelector("likebtn") 
    const likebtn = (id)=>{
        axios.put('http://localhost:3000/match/'+ match.message[0]._id,{
            body:JSON.stringify({
                matchId:id
            })
        }).then(res=>res.json())
        .then(result=>{
                 //   console.log(result)
          const newData = data.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  } 
    
}

function dislikef (){
    let dislikebtn = document.querySelector("dislikebtn");

   const dislikebtn = (id)=>{
    axios.put('http://localhost:3000/match/'+ match.message[0]._id,{
        body:JSON.stringify({
            matchId:id
        })
    }).then(res=>res.json())
    .then(result=>{
             //   console.log(result)
      const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
      })
      setData(newData)
    }).catch(err=>{
        console.log(err)
    })
} 

}

    let match = JSON.parse(localStorage.getItem("activeUser"));
    axios.delete('http://localhost:3000/user/' + user.message[0]._id)

    */