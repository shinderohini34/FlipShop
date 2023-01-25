
const loginCheck = () => {
    //try get the token from js
    const token = JSON.parse(localStorage.getItem("token"));

    //null
    //true
    if(token)
    {
        //do something
        return true
    }
    else
    {
        //do something
        return false
    }
}

export default loginCheck;