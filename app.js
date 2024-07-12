import { auth , 
  onAuthStateChanged ,
  signOut ,
  doc ,
  getDoc ,
  db
 } from "./Utils/utils.js";

const user_logout = document.getElementById("user_logout");
const userName = document.getElementById("userName");
const userDp = document.getElementById("userDp");

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid)
      getUserInfo(uid)
      // ...
    } else {
        console.log("User is signed out")
       window.location.href = "/User Login And Signup/Login/index.html";
      // User is signed out
      // ...
    }
})

user_logout.addEventListener("click" , () => {
  signOut(auth).then(() => {
    console.log("Sign-out successful.")
    // Sign-out successful.
  }).catch((error) => {
    console.log(error)
    // An error happened.
  });
})

function getUserInfo(uid){
  const docRef = doc(db , "users" , uid);
  getDoc(docRef).then((data)=>{
    console.log(data.data())
    userDp.src = data.data().user_dp_input;
    const firstName = data.data().user_first_name;
    const lastName = data.data().user_last_name;
    userName.innerText = firstName + " " + lastName
  })
}