import { navbar } from "../component/navbar.js";
document.getElementById("nav").innerHTML = navbar();

import state_data from "../utils/data.js";


const renderStateDetails = () => {
    //catch the select tag
    const select = document.getElementById("state_Select");

    state_data.map((el)=>{
        //el -> it is string format
        //create html
        const option = document.createElement("option");

        //attributes
        option.innerText = el;
        option.value = el;

        //append
        select.append(option);
    })
}
renderStateDetails(state_data);

const handlePaymentMode = () =>{
    const value = document.getElementById("paymentMode").value;
    if(value === "cod")
    {
        const container = document.getElementById("paymentDetails_div")
        container.innerHTML = null;   
        return;
    }
    else
    {
        //card
        //we need to append 4 html input inside the paymentDetails_div
        const container = document.getElementById("paymentDetails_div")
        
        const html = `
        <div>
            <label>Card Number</label>
            <input type="text" class="form-control" id="cardNumber" aria-describedby="emailHelp">
            <p id="nameVal" style="color: red"></p>
        </div>
        <div>
            <label>CVV</label>
            <input type="text" class="form-control" id="cvv" aria-describedby="emailHelp">
            <p id="nameVal" style="color: red"></p>
        </div>
        <div>
            <label>Expiry Date</label>
            <input type="date" class="form-control" id="expiryDate" aria-describedby="emailHelp">
            <p id="nameVal" style="color: red"></p>
        </div>
        <div>
            <label>Card Holder Name</label>
            <input type="text" class="form-control" id="cardHolderName" aria-describedby="emailHelp">
            <p id="nameVal" style="color: red"></p>
        </div>`

    container.innerHTML = html;
    }
    //alert("Running")

}
document.getElementById("paymentMode").addEventListener("change",handlePaymentMode)

const handleFormSubmit = (event) =>{
    event.preventDefault();
    //catch all the value
    //common value
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const selectState = document.getElementById("state_Select").value
    const pin = document.getElementById("pin").value;
    const paymentMode = document.getElementById("paymentMode").value;

    if(!name || !address || !city || !selectState || !pin || !paymentMode)
    {
        alert("Fill the details")
        return
    }
    let cardNumber;
    let cvvNumber;
    let expiryDate;
    let cardHolderName;
    
    //if user  select card option
    if(paymentMode === "card")
    {
        cardNumber = document.getElementById("cardNumber").value;
        cvvNumber = document.getElementById("cvv").value;
        expiryDate = document.getElementById("expiryDate").value;
        cardHolderName = document.getElementById("cardHolderName").value;

        if(!cardNumber || !cvvNumber || !expiryDate || !cardHolderName)
        {
            alert("Fill the details")
            return;
        }
    }
    
    //payload - nothing but data
    const payload = {
        name,
        address,
        city,
        selectState,
        pin,
        paymentMode
    }
    if(paymentMode === "card")
    {
        payload.cardDetails = {
            cardNumber,
            cvvNumber,
            expiryDate,
            cardHolderName
        }
    }
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
    payload.totalPrice = totalPrice;

    console.log(payload)

    //We need to store in database -> LS
    localStorage.setItem("addressPageData",JSON.stringify(payload));

    //redirect to the otp page
    window.location.href = "otp.html";
}
document.getElementById("address_form").addEventListener("submit",handleFormSubmit)