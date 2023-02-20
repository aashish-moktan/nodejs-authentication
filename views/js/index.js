function handleLogout() {
    const xhttp = new XMLHttpRequest()
    xhttp.open("GET", "/logout", true)
    xhttp.send()
    xhttp.onload = function() {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            location.href = "/";
        } 
    }
}