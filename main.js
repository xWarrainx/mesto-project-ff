(()=>{"use strict";var e=function(e,t,n,o){var r=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=r.querySelector(".card__image"),a=r.querySelector(".card__like-button");return c.src=e.link,c.alt=e.name,r.querySelector(".card__title").textContent=e.name,a.addEventListener("click",(function(){t(a)})),c.addEventListener("click",(function(){n(e)})),r.querySelector(".card__delete-button").addEventListener("click",(function(){o(r)})),r},t=function(e){return e.remove()},n=function(e){return e.classList.toggle("card__like-button_is-active")},o=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r),e.addEventListener("click",c)},r=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");a(t)}},c=function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&a(e.currentTarget)},a=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r),e.removeEventListener("click",c)},p=document.querySelector(".popup_type_image"),i=document.querySelectorAll(".popup__close"),u=document.querySelector(".popup__image"),d=document.querySelector(".popup__caption"),s=document.querySelector(".places__list"),l=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),_=document.querySelector(".popup"),v=document.querySelectorAll(".popup"),f=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),k=document.forms.edit_profile,q=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),L=k.elements.name,g=k.elements.description,E=document.forms.new_place,h=E.elements.place_name,x=E.elements.link,b=[{name:"",link:""}];function j(e){u.src=e.link,u.alt=e.name,d.textContent=e.name,o(p)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){var r=e(o,n,j,t);s.append(r)})),i.forEach((function(e){e.addEventListener("click",(function(){var t=e.closest(".popup");a(t)}))})),l.addEventListener("click",(function(){L.value=q.textContent,g.value=S.textContent,o(f)})),m.addEventListener("click",(function(){o(y)})),k.addEventListener("submit",(function(e){e.preventDefault(),q.textContent=L.value,S.textContent=g.value,a(_)})),E.addEventListener("submit",(function(o){o.preventDefault(),b.name=h.value,b.link=x.value;var r=e(b,n,j,t);s.prepend(r),a(y),o.target.reset()})),v.forEach((function(e){e.classList.add("popup_is-animated")}))})();