$(document).ready(function() {
    window.localStorage.setItem('bookType', bookType)
    window.localStorage.setItem('email', email)
    window.localStorage.setItem('password', password)
    $('#login-email').val(email)
    $('#login-password').val(password)
    $('#login-form > button[type=submit]').trigger('click')
    
    //window.location.href = "https://prenotami.esteri.it/Services"
})