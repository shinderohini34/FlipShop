import { navbar } from "../component/navbar.js";
document.getElementById("nav").innerHTML = navbar();

const renderTotalPrice = () => {
    //get the data from LS
    const data = JSON.parse(localStorage.getItem("addressPageData"));
    console.log(data)

    //data
    const { totalPrice } = data;
    console.log(totalPrice);

    //append the data
    //where = span
    const span = document.getElementById("totalPrice_span");
    span.innerText = "Rs."+totalPrice;
}
renderTotalPrice();


const one = document.getElementById("one")
const two = document.getElementById("two")
const three = document.getElementById("three")
const four = document.getElementById("four")

const handleInputOne = () =>{
    //value for first input
    const oneValue = one.value;

    if(oneValue.length === 1)
    {
        two.focus();
    }
}


const handleInputTwo = () =>{
    // value for second input
    if(!one.value)
    {
        //remove the value;
        two.value = null;
        one.focus();
        return;
    }
    const twoValue = two.value;

    if(twoValue.length === 1)
    {
        three.focus();
    }
    if(twoValue.length === 0)
    {
        one.focus();
    }
    
}

const handleInputThree = () =>{
    // value for three input
    if(!one.value || !two.value)
    {
        //remove the value;
        three.value = null;
        one.focus();
        return;
    }
    const threeValue = three.value;

    if(threeValue.length === 1)
    {
        four.focus();
    }
    if(threeValue.length === 0)
    {
        two.focus();
    }
    
}

const handleInputFour = () =>{
    // value for four input
    if(!one.value || !two.value || !three.value)
    {
        four.value = null;
        one.focus();
        return;
    }
    const fourValue = four.value;

    if(fourValue.length === 0)
    {
        three.focus();
    }
    if(fourValue.length > 1)
    {
        four.value = fourValue[0];
        return;
    }
}

one.addEventListener("input",handleInputOne)
two.addEventListener("input",handleInputTwo)
three.addEventListener("input",handleInputThree)
four.addEventListener("input",handleInputFour)

const handleSubmit = () =>{
    const otp = one.value + two.value + three.value + four.value;

    //validation
    if(otp!=="1234")
    {
        alert("Incorrect Details");
        return;
    }
    //user give correct otp
    const cont = document.getElementById("otp_div");
    cont.innerHTML = null;

    //What element I need to inject  
    const h3 = document.createElement("h3");
    h3.innerText = "Order Successfully Placed! Thanks you for shopping!";
    h3.style.color = "green";
    h3.style.textAlign = "center"
    h3.style.marginTop = "100px"

    //append
    cont.append(h3);

    setTimeout((h3)=>{
        //remove cart value from LS;
        localStorage.removeItem("cart");
        //Redirect to home page.
        window.location.href = "index.html"
    },3000);

}

const button = document.getElementById("submit");
button.addEventListener("click",handleSubmit);