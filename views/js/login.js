document.getElementById("login-form").onsubmit = (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const xhttp = new XMLHttpRequest()
    xhttp.open("POST", "/login", true)
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ email, password }))
    
    xhttp.onload = function() {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            location.href = "/profile";
        } 
        if(xhttp.readyState === 4 && xhttp.status === 401) {
            alert(JSON.parse(xhttp.response).message)
        }
    }
}
