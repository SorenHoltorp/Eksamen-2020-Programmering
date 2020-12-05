/*
Det vi gerne vil er at acces en tilfældig user i vores MongoDB database ud fra findUserByIdAndUpdate
med et get request fra Axios. Dette skulle gøres ved at sætte en function op på en button, som 
ved hvad gang den blev kørt igennem skulle generer en ny user fra databasen. Om man kunne bruge 
Math.floor(Math.random() til at gøre det tilfældigt ved jeg ikke, ihvertfald kunne man bare tage fra start til ende.

Hernæst skulle man bruge MongoDB metoden push/pull til at pushe et id ind i vores mongoose schema på like eller dislike 
user pladsen. Ved at gøre dette så hver gang man trykke like, planter den, den aktive users id i et array som dernæst kan tilgåes til at 
få et overblik over hvem brugeren har matche med, og i sidste ende ville man såfremt bare kunne brug User.remove/Delete user_id i arrayet og så er man ikke 
længere et match. Man ville også kunne bruge pull metoden muligvis til blot at fetche id'et igen uden at delete det. Man ville skulle bruge
push i både like og dislike tilfælde.

Vi benytter altså kun et schema, user ved at push eller pull id'er i objecterne alt afhængig af hvad man trykker på knappen. 
Ved at gøre dette har vi nu mulighed for 

*/

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