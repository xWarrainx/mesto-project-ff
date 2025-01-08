(()=>{"use strict";var e=function(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-counter");return a.src=e.link,a.alt=e.name,c.querySelector(".card__title").textContent=e.name,l.textContent=e.likes.length,e.likes.find((function(e){return e._id===r}))&&i.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){t(i,e._id,l)})),a.addEventListener("click",(function(){n(e)})),r===e.owner._id?(console.log("ID совпадает"),c.querySelector(".card__delete-button").addEventListener("click",(function(){o(c,e)}))):c.querySelector(".card__delete-button").remove(),c},t=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("click",r)},n=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");o(t)}},r=function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&o(e.currentTarget)},o=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("click",r)},c=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},a=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},i=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){c(e,n,t)})),r.disabled=!0,r.classList.add(t.inactiveButtonClass)},l=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-29",mestoBaseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-29",headers:{authorization:"2f59518d-2ba3-4808-8cf6-577ad9501b48","Content-Type":"application/json"}},u=function(){return fetch("".concat(s.baseUrl,"/users/me"),{headers:s.headers}).then(l)};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p=document.querySelector(".popup_type_image"),f=document.querySelectorAll(".popup__close"),m=document.querySelector(".popup__image"),_=document.querySelector(".popup__caption"),v=document.querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),S=document.querySelector(".popup"),b=document.querySelectorAll(".popup"),k=document.querySelector(".popup_type_edit"),L=document.querySelector(".popup_type_new-card"),q=document.forms.edit_profile,E=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),C=(document.querySelector(".profile__image"),q.elements.name),A=q.elements.description,x=document.forms.new_place,U=x.elements.place_name,w=x.elements.link,B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},T=null;Promise.all([u(),fetch("".concat(s.mestoBaseUrl,"/cards"),{headers:s.headers}).then(l)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],l=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);l=!0);}catch(e){s=!0,o=e}finally{try{if(!l&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];T=c._id,E.textContent=c.name,g.textContent=c.about,console.log(c,a),a.forEach((function(t){var n=e(t,O,D,T,j);v.append(n)}))})).catch((function(e){console.error("Ошибка загрузки данных:",e)}));var j=function(e,t){e.remove(),function(e){fetch("".concat(s.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:s.headers}).then(l)}(t)},O=function(e,t,n){var r;e.classList.contains("card__like-button_is-active")?(r=t,fetch("".concat(s.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:s.headers}).then(l)).then((function(t){console.log(t),n.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка загрузки данных:",e)})):function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:s.headers,body:JSON.stringify({likes:u})}).then(l)}(t).then((function(t){n.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка загрузки данных:",e)}))};function D(e){m.src=e.link,m.alt=e.name,_.textContent=e.name,t(p)}f.forEach((function(e){e.addEventListener("click",(function(){var t=e.closest(".popup");o(t)}))})),y.addEventListener("click",(function(){C.value=E.textContent,A.value=g.textContent,i(q,B),t(k)})),h.addEventListener("click",(function(){i(x,B),t(L)})),q.addEventListener("submit",(function(e){e.preventDefault(),E.textContent=C.value,g.textContent=A.value,function(e,t){fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:e.value,about:t.value})}).then(l)}(C,A),o(S)})),x.addEventListener("submit",(function(t){var n;t.preventDefault(),(n={name:U.value,link:w.value},fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(l)).then((function(t){var n=e(t,O,D,T,j);v.prepend(n)})).catch((function(e){console.error("Ошибка загрузки данных:",e)})),o(L),t.target.reset()})),b.forEach((function(e){e.classList.add("popup_is-animated")})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);a(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?c(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),a(n,r,t)}))}))}(t,e)}))}(B)})();