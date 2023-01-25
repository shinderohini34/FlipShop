import {navbar} from "../component/navbar.js"
let container = document.querySelector("#nav");
container.innerHTML = navbar();

const form = document.querySelector("#registration_form");


const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirm_password = document.querySelector("#confirm_password").value;

    if(!name)
    {
        document.getElementById("nameVal").innerText = "Please enter name"
        return
    }
    if(!email)
    {
        document.getElementById("emailVal").innerText = "Please enter email address."
        return
    }
    if(!password)
    {
        document.getElementById("passwordVal").innerText = "Please enter password."
        return;
    }
    if(!confirm_password)
    {
        document.getElementById("confirm_passVal").innerText = "Please confirm your password"
        return;
    }


    const payload = {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
    }
    console.log(payload)

    //We need some server --> Fake server --> For Post request
    //Link --> https://reqres.in/

    //Two ways to make API request
    //1. async wait
    //2. .then and .catch

    //1. You need to make the async
    //2. Start API request with fetch

    //Post
    //1. method
    //2. headers
    //3. body

    try{
        const response = await fetch("https://reqres.in/api/register",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        //You are authenticate
        alert("Registration Successfull !")

        //You have the token you can store in js
        //localStorage.setItem("token",JSON.stringify(data));

        //What are you want to do after login you can write here
        window.location.href = "login.html";

    }
    catch(err){
        console.log("Server Error",err);

    }
}

form.addEventListener("submit",handleFormSubmit)