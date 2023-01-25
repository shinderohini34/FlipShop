import {navbar} from "../component/navbar.js"
let container = document.querySelector("#nav");
container.innerHTML = navbar();

const form = document.querySelector("#login_form");

const handleFormSubmit = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if(!email && !password)
    {
        document.getElementById("emailVal").innerText = "Please enter email address."
        return;
    }
    if(!password || !email)
    {
        document.getElementById("passwordVal").innerText = "Please enter password."
        return;
    }

    const payload = {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
    }

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
        const response = await fetch("https://reqres.in/api/login",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        //You are authenticate
        alert("Login Successfull !")

        //You have the token you can store in js
        localStorage.setItem("token",JSON.stringify(data));

        //What are you want to do after login you can write here
        window.location.href = "index.html";

    }
    catch(err){
        console.log("Server Error",err);

    }
}

form.addEventListener("submit",handleFormSubmit)