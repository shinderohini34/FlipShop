
import loginCheck from "../utils/loginCheck.js";
const status = loginCheck();
if(!status)
{
    window.location.href = "login.html"
}

import {navbar} from "../component/navbar.js"
let container = document.getElementById("nav");
container.innerHTML = navbar();

let cartArr = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cartArr);

const append = (cartArr) => {

    let container = document.querySelector("#container");
    container.innerHTML= null;
    
    cartArr.map ((el,index)=>{
        
        let div = document.createElement("div");

        let image = document.createElement("img");
        image.src = el.image;

        let title = document.createElement("p");
        title.innerText = el.title;
        title.style.height = "80px"

        let price = document.createElement("h6");
        price.innerText = "Rs. "+el.price
        price.style.height = "10px"

        let btn = document.createElement("button");
        btn.innerText = "Remove";
        btn.style.marginBottom = "15px"
        btn.style.color = "white";
        btn.addEventListener("click", ()=>{
            removeProduct(el,index);
        })

        let quantityDiv = document.createElement("p");
        quantityDiv.id = "quantity"

        let increseQuan = document.createElement("span");
        increseQuan.innerText = "+"
        increseQuan.style.textAlign = "center"
        increseQuan.id = "incre"

        increseQuan.addEventListener("click",()=>{
            handleQuantity(el,"+");
        })

        let decreseQuan = document.createElement("span");
        decreseQuan.innerText = "-";
        decreseQuan.id = "decre"

        decreseQuan.addEventListener("click",()=>{
            handleQuantity(el,"-");
        })
        
        let quantity = document.createElement("span");
        quantity.innerText = `${el.qty}`;
        quantity.id = "quantity1";

        div.append(image,title,price,btn,quantityDiv);
        quantityDiv.append(decreseQuan,quantity,increseQuan);
        container.append(div);
    });
    JSON.parse(localStorage.getItem("cart"));
         
    /*document.querySelector("#count").innerText = x.length;*/
}
append(cartArr);

const removeProduct = (el,index) =>{
    cartArr.splice(index,1)

    localStorage.setItem("cart",JSON.stringify(cartArr));
    append(cartArr);
    handleTotalAmount();
}
const handleTotalAmount = () =>{
    const cartArr = JSON.parse(localStorage.getItem("cart"));
    let sum = 0;
    cartArr.map((el) =>{
        sum = sum + el.price * el.qty;

    })
    sum = Math.round(sum);

    console.log(sum);
    
    //Show that value
    //where to display
    document.getElementById("total_amount").innerText = sum;
    localStorage.setItem("totalPrice",JSON.stringify(sum));
} 
handleTotalAmount(cartArr);

const handleQuantity = (el,type) =>{
    //We can identify which data I need to update.
    if(type === "-" && el.qty ===1)
    {
        alert("Can not reduce quantity")
        return
    }
    //{} -> where we need to update the quantity
    //[{},{},{},{},{},{}]
    let cartArr = JSON.parse(localStorage.getItem("cart"));

    if(type === "+")
    {
        //increment
        //identify the object
        cartArr = cartArr.map((element)=>{
            if(element.id === el.id)
            {
                //we identify
                return {...element, qty:element.qty + 1}
            }
            else
            {
                return element;
            }
        })
        localStorage.setItem("cart",JSON.stringify(cartArr));
        append(cartArr);
        handleTotalAmount(cartArr);
        
    }
    else
    {
        //decrement
        cartArr = cartArr.map((element)=>{
            if(element.id === el.id)
            {
                //we identify
                return {...element, qty: element.qty - 1}
            }
            else
            {
                return element;
            }
        })
        localStorage.setItem("cart",JSON.stringify(cartArr))
        append(cartArr);
        handleTotalAmount();
        
    }
}

document.getElementById("address_button").addEventListener("click",()=>{
    //check cart data
    const cartArr = JSON.parse(localStorage.getItem("cart"));
    if(!cartArr || cartArr.length === 0)
    {
        alert("Nothing in cart")
        return; 
    }
    window.location.href = "address.html";
})