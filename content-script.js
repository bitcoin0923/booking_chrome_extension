

$(document).ready(async function () {
    var url = new URL(window.location.href)
    var links = []
    console.log(url.pathname)
    if (url.pathname.includes('Services/Booking')) {
        // document.documentElement.appendChild(disablerScriptElement);
        // disablerScriptElement.parentNode.removeChild(disablerScriptElement);
        // var scripts = $(document).find('script')
        // $(scripts[12]).attr('src', "")
        var sound = new Audio(chrome.runtime.getURL('sound.mp3'));
        sound.play();
        setTimeout(() => {
            chrome.storage.local.get(["email", "passport", "minor", "surname", "filename", "filetype", "filecontent", "power"], (result) => {
                console.log(result);
                email = result.email
                if($('#DatiAddizionaliPrenotante_0___testo')){$('#DatiAddizionaliPrenotante_0___testo').val(result.passport);}
                //$(`#ddls_1 option[value='${result.minor}']`).prop('selected', true);
                if($('#ddls_1')){$('#ddls_1').val(result.minor);}
                if($('#ddls_3')){$('#ddls_3').val(result.power);}
                if($('#DatiAddizionaliPrenotante_2___testo')){$('#DatiAddizionaliPrenotante_2___testo').val(result.surname);}
                const fileInput0 = document.getElementById('File_0');
                const fileInput1 = document.getElementById('File_1');
                const myFile = new File([result.filecontent], result.filename, {
                  type: result.filetype,
                  lastModified: new Date(),
                });
            
                // Now let's create a DataTransfer to get a FileList
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(myFile);
                if(fileInput0){
                    fileInput0.files = dataTransfer.files;
                }
                if(fileInput1){
                    fileInput1.files = dataTransfer.files;
                }
                if ($('#PrivacyCheck')) {
                    $('#PrivacyCheck').trigger('click')
                    window.confirm = s => true
                    $('#btnAvanti').click((e) => {
                        window.confirm = (str) => true;
                    })
                    $("script:last").remove();
                    const overrideConfirmBox=()=>{
                        console.log("replaced");
                        window.confirm = (str) => true;
                        window.confirm("1");
                    }
                    setTimeout(() => {
                        overrideConfirmBox()
                        $('#btnAvanti').trigger('click')
                    }, 1000);
                }
              });
        }, 1000);

    }
    else if (url.pathname.includes('Services')) {
        await setTimeout(async () => {
            if ($('#dataTableServices')) {
                trs = $('#dataTableServices > tbody > tr')
            }
            chrome.storage.local.get(["bookType"], (result) => {
                var bookType = result.bookType
                console.log(+bookType-1)
                var els = $(trs[+bookType-1]).find('button');
                if(els.length){
                    
                    els.trigger('click')
                }else{
                    setTimeout("location.reload(true);", 5000);
                }
            })
            
            // window.location.href = "https://prenotami.esteri.it" + link
            // console.log(window.location.href)
        }, 1000)
    } else if(url.pathname.includes('BookingCalendar')) {
        chrome.storage.local.get(["email"], (result) => {
            email = result.email
        })
        await setTimeout(async () => {
            if ($('.datepicker-days > .table-condensed')) {
                const trySelectDay = () => {
                    var days = $('.datepicker-days > table.table-condensed > tbody > tr > td.availableDay')
                    if(days.length) {
                        $(days[0]).trigger('click')
                        setTimeout(() => {
                            var times = $('li.selected > div:not(.notAvailableFascia)');
                            if(times.length){
                                console.log('times: ', times);
                                $(times[0]).trigger('click')
                                setTimeout(() => {
                                    if($('#btnPrenotaNoOtp')){$('#btnPrenotaNoOtp').trigger('click');}
                                    if($('#btnPrenota')){
                                        $('#btnPrenota').trigger('click');
                                        setTimeout(() => {
                                            $.get('https://getnada.com/api/v1/inboxes/' + email, (data, stat) => {
                                                console.log(data.msgs)
                                                if(data.msgs.length){
                                                    var uid = data.msgs[0].uid;
                                                    $.get('https://getnada.com/api/v1/messages/html/' + uid, (data1, statuss) => {
                                                        var str = 'OTP Code:'
                                                        var otp = data1.substr(data1.indexOf(str) + str.length, 6);
                                                        if($('#idOtp')){
                                                            $('#idOtp').val(otp);
                                                            var sound = new Audio(chrome.runtime.getURL('sound.mp3'));
                                                            sound.play();
                                                            $($('.jconfirm-buttons > button:last-child')[0]).trigger("click")
                                                        }
                                                    }, 'text')
                                                }
                                            }, 'json')
                                        }, 1000)
                                    }
                                    
                                }, 1000)
                            }
                            
                        }, 1500)
                        console.log(days)
                        return true
                    }
                    return false
                }
                const clickNextAndTry = () => {
                    if(!trySelectDay()){
                        var next = $('.datepicker-days > table.table-condensed > thead > tr > th.dtpicker-next')
                        console.log('next: ', next)
                        $(next[0]).trigger('click')
                        setTimeout(clickNextAndTry, 1500)
                    }
                }
                clickNextAndTry()
                              
            }
        }, 1000)
    } else if(url.pathname.includes('UserArea')) {
        window.location.href = "https://prenotami.esteri.it/Services"
    } else if(url.pathname.includes('Home')) {
        chrome.storage.local.get(["bookType", "email", "password"], (result) => {            
            $('#login-email').val(result.email)
            $('#login-password').val(result.password)
            $('#login-form > button[type=submit]').trigger('click')
        })
    } 
})