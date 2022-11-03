localStorage.removeItem("token")
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        }
        else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

$('.tab a').on('click', function (e) {
    $('.error_password').html('');

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});


$('.register').on('click', function (e) {
    if (checkValueRegister() == true) {
        let value = {
            "op": "register",
            "username": document.getElementsByClassName('usr')[0].value,
            "password": document.getElementsByClassName('pass')[0].value
        }
        register(value)
    }


})

$('.login').on('click', function (e) {
    if (checkValueLogin() == true) {
        let value = {
            "op": "login",
            "username": document.getElementsByClassName('usr')[1].value,
            "password": document.getElementsByClassName('pass')[2].value
        }
        login(value)
    }


})

function checkValueRegister() {
    let pass = document.getElementsByClassName('pass');
    let usr = document.getElementsByClassName('usr');
    $('.error_usr').html('');
    if (usr[0].value.length < 5) {
        $('.error_usr').html('+4 caracteres');
        return false;
    } else if (pass[0].value.length < 5 || pass[1].value.length < 5) {
        $('.error_password').html('+4 caracteres');
        return false;
    }

    if (pass[0].value == pass[1].value) {
        $('.error_password').html('');
        return true;
    }
    else {
        $('.error_password').html('No es la misma contraseña');
        return false;
    }
}

function checkValueLogin() {
    try {
        let pass = document.getElementsByClassName('pass');
        let usr = document.getElementsByClassName('usr');
        return true;
    } catch (e) {
        return false;
    }
}