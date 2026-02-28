function signup(){
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(!user || !pass){
    alert("Enter username & password");
    return;
  }

  localStorage.setItem("user_"+user, JSON.stringify({user, pass}));
  alert("Signup successful");
}

function login(){
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const stored = JSON.parse(localStorage.getItem("user_"+user));

  if(stored && stored.pass===pass){
    localStorage.setItem("loggedInUser", user);
    window.location="index.html";
  }else{
    alert("Invalid credentials");
  }
}