const navbar = () => {
  let length;
  //if user is logged or not

  const status = JSON.parse(localStorage.getItem("token"));
  //if user logged in => show the count
  if(!status)
  {
    length = null;
  }
  else
  {
    //user logged in
    const cartArr = JSON.parse(localStorage.getItem("cart"));
    if(!cartArr)
    {
      length = null;
    }
    else
    {
      length = cartArr.length;
    }
    
  }
  console.log(length)
  //evaluating cart data from LS

    return `<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
<a class="navbar-brand" href="#">FlipShop</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
  <div class="navbar-nav">
    <a class="nav-link active" href="index.html">Home <span class="sr-only">(current)</span></a>
    <a class="nav-link active" href="index.html">Products</a>
  </div>
  <div class="navbar-nav">
    <a class="nav-link active" href="login.html">Login</a>
    <a class="nav-link active" href="cart.html">Cart</a>
    <a class="nav-link active" id="count" href="#">${length ? `${length}` :""}</a>
  </div>
</div>
</nav>`

}
export {navbar}
