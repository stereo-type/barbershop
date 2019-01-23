var linkLogin = document.querySelector(".login-link");
var linkMap = document.querySelector(".js-modal-map");
var popupLogin = document.querySelector(".modal-login");
var popupMap = document.querySelector(".modal-map");
var popupOverlay = document.querySelector(".modal-overlay");
var buttonClose = document.querySelectorAll(".modal-close")
var formPopup = popupLogin.querySelector("form");
var fieldLogin = formPopup.querySelector("[name=login]");
var fieldPassword = formPopup.querySelector("[name=password]");

var isStorageSupport = true;
var storage = ""; 


// Попытка запроса доступа к локальному хранилищу
try {
  storage  = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}


//Клик на ссылке входа - отображение попапа входа
linkLogin.addEventListener("click", function(evt){
  evt.preventDefault();
  popupLogin.classList.add("modal-show");
  popupOverlay.classList.add("overlay-show");
  
  if (storage) {
    fieldLogin.value = storage;
    fieldPassword.focus();
  } else {
    fieldLogin.focus();
  }
})

// Открытие карты

linkMap.addEventListener("click", function(evt) {
  evt.preventDefault();
  popupMap.classList.add("modal-show");
  popupOverlay.classList.add("overlay-show")
})

// Закрытие попапа кликом на оверлей
popupOverlay.addEventListener("click" , function() {
  popupLogin.classList.remove("modal-show");
  popupLogin.classList.remove("modal-error");
  popupMap.classList.remove("modal-show");
  popupOverlay.classList.remove("overlay-show");
  
})


// Закрытие попапа кликом на крестик

for(var i = 0; i < buttonClose.length; i++) {
  buttonClose[i].addEventListener("click", function(evt) {
    evt.preventDefault();
    popupLogin.classList.remove("modal-show");
    popupLogin.classList.remove("modal-error");
    popupMap.classList.remove("modal-show");
    popupOverlay.classList.remove("overlay-show");
  })
}


// Закрытие попапа клавишей ESC
window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (popupLogin.classList.contains("modal-show") || popupMap.classList.contains("modal-show")) {
      evt.preventDefault();
      popupLogin.classList.remove("modal-show");
      popupLogin.classList.remove("modal-error");
      popupMap.classList.remove("modal-show");
      popupOverlay.classList.remove("overlay-show");
    }
  }
})


// Обработка полей ввода попапа входа
formPopup.addEventListener("submit", function(evt) {
  popupLogin.classList.remove("modal-error");
  fieldLogin.classList.remove("form-input-error");
  fieldPassword.classList.remove("form-input-error");
  popupLogin.offsetWidth = popupLogin.offsetWidth;
  if(!fieldLogin.value) {
      evt.preventDefault();
      fieldLogin.classList.add("form-input-error");
      popupLogin.classList.add("modal-error");
    } else if (!fieldPassword.value) {
        evt.preventDefault();
        fieldPassword.classList.add("form-input-error");
        popupLogin.classList.add("modal-error");
      } else {
    if (isStorageSupport) {
      localStorage.setItem("login", fieldLogin.value);
    }
  }
})
