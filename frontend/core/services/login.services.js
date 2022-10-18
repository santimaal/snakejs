async function login(value) {
    await fetch('http://localhost:3000/' + JSON.stringify(value.username).substring(1, value.username.length + 1) + "/" + JSON.stringify(value.password).substring(1, value.password.length + 1));
}

async function register(value) {
    let returned = await fetch('http://localhost:3000/' + JSON.stringify(value.username).substring(1, value.username.length + 1) + "/" + JSON.stringify(value.password).substring(1, value.password.length + 1) + "/" + "register");
    let jsonreturn = await returned.json()
}