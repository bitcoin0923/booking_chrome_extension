var filecontent;
var filename;
var filetype;

$(document).ready(function () {
  chrome.storage.local.get(["email", "password", "passport", "minor", "surname", "filename", "filetype", "filecontent", "power"], (result) => {
    console.log('Retrieved email, password: ' + result.email + ', ' + result.password);
    $('#InputEmail').val(result.email);
    $('#InputPassword').val(result.password);
    $('#InputPassport').val(result.passport);
    $('#SelectMinorChildren').val(result.minor);
    $('#SelectPower').val(result.power);
    $('#InputSurname').val(result.surname);
    const fileInput = document.getElementById('InputFile');
    const myFile = new File([result.filecontent], result.filename, {
      type: result.filetype,
      lastModified: new Date(),
    });

    // Now let's create a DataTransfer to get a FileList
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myFile);
    fileInput.files = dataTransfer.files;
  });

  $('#InputFile').change( function(event) {
     inputfile =event.target.files[0];
    const reader = new FileReader();
    filename = inputfile.name
    filetype = inputfile.type
    reader.addEventListener('load', (event) => {
      filecontent = event.target.result;
    });
    reader.readAsDataURL(inputfile);
    console.log("file: ", inputfile.toString())
  })
  $('#submit_btn').on('click', function() {
    
    var email = $('#InputEmail').val()
    var password = $('#InputPassword').val()
    var passport = $('#InputPassport').val()
    var minor = $('#SelectMinorChildren').val()
    var power = $('#SelectPower').val()
    var surname = $('#InputSurname').val()
    var bookType = $('input[name=flexRadio]:checked').val()
    
    chrome.storage.local.set({ 
      email,
      password,
      passport,
      minor,
      surname,
      filecontent,
      filename,
      filetype,
      power,
      bookType
    }, function(){
      console.log('Stored : ' + email);
    });

    if(!email || !password) {
      
      return false
    }
    chrome.tabs.create({ url: 'https://prenotami.esteri.it/Home' }, (tab) => {
      chrome.runtime.sendMessage({ message: "login", tabId: tab.id, email, password, bookType })
    });
  })
})
