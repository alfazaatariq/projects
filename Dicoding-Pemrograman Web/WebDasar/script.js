function changeName() {
  let inputUsername = document.querySelector("#inputUsername").value;
  let inputEmail = document.querySelector("#inputEmail").value;

  sessionStorage.setItem("username", inputUsername);
  sessionStorage.setItem("email", inputEmail);

  let personUsername = sessionStorage.getItem("username");
  let personEmail = sessionStorage.getItem("email");
  document.querySelector("#showName").innerHTML = "Halo, " + personUsername + "!";
  document.querySelector("#username").innerHTML = personUsername;
  document.querySelector("#email").innerHTML = personEmail;
}

if(sessionStorage.getItem("username") && sessionStorage.getItem("email")){
  let personUsername = sessionStorage.getItem("username");
  let personEmail = sessionStorage.getItem("email");
  
  document.querySelector("#showName").innerHTML = "Halo, " + personUsername + "!";
  document.querySelector("#username").innerHTML = personUsername;
  document.querySelector("#email").innerHTML = personEmail;
} else{
  document.querySelector("#showName").innerHTML = "Halo, " + "Al Faza" + "!";
}
