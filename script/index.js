
import loginCheck from "../utils/loginCheck.js";
const status = loginCheck();
if(!status)
{
    window.location.href = "login.html"
    console.log(status)
}

import {navbar} from "../component/navbar.js"
let container = document.getElementById("nav");
container.innerHTML = navbar();


const getData = async () => {
    try{
        let res = await fetch(`https://fakestoreapi.com/products`);
        let data = await res.json();
        console.log(data);
        //lets remove the loading indicator
        const cont = document.getElementById("loading_div");
        cont.innerHTML = null;

        appendData(data);
    }
    catch(err)
    {
        console.log(err);

        const cont = document.getElementById("loading_div");
        cont.innerHTML = null;

        const img = document.createElement("img");
        img.src = "https://freefrontend.com/assets/img/html-funny-404-pages/Robo-404-Page.gif";
        img.style.width = "500px"
        img.style.height = "300px"
        img.style.borderRadius = "10px"

        cont.append(img);
    }
}
getData();

const appendData = (data) =>{

    let container = document.querySelector("#container");
    container.innerHTML= null;
    
    data.map((el)=>{
        
        let div = document.createElement("div");

        let image = document.createElement("img");
        image.src = el.image;

        let title = document.createElement("p");
        title.innerText = el.title;
        title.style.height = "80px"

        let price = document.createElement("h6");
        price.innerText = "Rs. "+el.price
        price.style.height = "10px"

        let div2 = document.createElement("p");
        div2.setAttribute("class","addAndBuyDiv")

        let buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        buyButton.style.marginBottom = "15px"
        buyButton.id = "buybtn";

        let addToCartButton = document.createElement("button");
        addToCartButton.innerText = "Add to Cart";
        addToCartButton.id = "addtocartbtn"
        addToCartButton.style.marginBottom = "15px"
        addToCartButton.addEventListener("click",()=>{
            addToCart(el);
        })

        div.append(image,title,price,div2);
        div2.append(addToCartButton)
        container.append(div);
    });
}

const addToCart = (el) =>
{
    //We need a data structure for cart -> [];
    //First check if something there already in ls.
    let cartArr = JSON.parse(localStorage.getItem("cart")) || [ ];

    //before pushing we have to check if data is already present or not
    let flag = false;
    cartArr.map((element) =>{
        if(element.id === el.id)
        {
            flag = true;
        }
    })
    //If flag comes as true
    //We can say data already present
    if(flag)
    {
        alert("This product is already present");
        return;
    }

    //Add the default quantity to the obj
    el.qty = 1;

    //add the el to cart
    cartArr.push(el)

    //store it on local storage
    localStorage.setItem("cart",JSON.stringify(cartArr));

    container.innerHTML = navbar();
    alert("Product is added to cart sucessfully");
    
    /*let x = JSON.parse(localStorage.getItem("cart"));

    document.querySelector("#count").innerText = x.length;*/
}

const renderLoadingIndicator = () =>
{
    //cont
    const cont = document.getElementById("loading_div");

    const img = document.createElement("img");
    img.src = "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif";

    cont.append(img);
}
renderLoadingIndicator();

