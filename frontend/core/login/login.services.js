async function login(value) {
    let returned = await fetch('http://localhost:3000/' + JSON.stringify(value.username).substring(1, value.username.length + 1) + "/" + JSON.stringify(value.password).substring(1, value.password.length + 1) + "/" + "login");
    let jsonreturn = await returned.json()
    if (jsonreturn != "Error") {
        localStorage.setItem("token", btoa(jsonreturn));
        location.href = "../snake/snake.html";
    }
    else {
        $('.error_usr_l').html('El usuario y la contraseña no coinciden');
    }
}

async function register(value) {
    let returned = await fetch('http://localhost:3000/' + JSON.stringify(value.username).substring(1, value.username.length + 1) + "/" + JSON.stringify(value.password).substring(1, value.password.length + 1) + "/" + "register");
    let jsonreturn = await returned.json()
    if (jsonreturn != "Error") {
        localStorage.setItem("token", btoa(jsonreturn));
        location.href = "../snake/snake.html";
    }
    else {
        $('.error_usr').html('Usuario ya creado');
    }
}