(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var n=function(){function n(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),t(this,"_api_prefix",void 0),t(this,"_mandatory_headers",void 0),this._api_prefix=e.url,this._mandatory_headers=e.headers}var r,o,i;return r=n,i=[{key:"_checkRes",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}}],(o=[{key:"getUserData",value:function(){return fetch("".concat(this._api_prefix,"/users/me"),{method:"GET",headers:this._mandatory_headers}).then(n._checkRes)}},{key:"getCards",value:function(){return fetch("".concat(this._api_prefix,"/cards"),{method:"GET",headers:this._mandatory_headers}).then(n._checkRes)}},{key:"setUserAvatar",value:function(e){return fetch("".concat(this._api_prefix,"/users/me/avatar"),{method:"PATCH",headers:this._mandatory_headers,body:JSON.stringify({avatar:e})}).then(n._checkRes)}},{key:"setProfileInfo",value:function(e,t){return fetch("".concat(this._api_prefix,"/users/me"),{method:"PATCH",headers:this._mandatory_headers,body:JSON.stringify({name:e,about:t})}).then(n._checkRes)}},{key:"addCard",value:function(e,t){return fetch("".concat(this._api_prefix,"/cards"),{method:"POST",headers:this._mandatory_headers,body:JSON.stringify({name:e,link:t})}).then(n._checkRes)}},{key:"likeCard",value:function(e){return fetch("".concat(this._api_prefix,"/cards/likes/").concat(e),{method:"PUT",headers:this._mandatory_headers}).then(n._checkRes)}},{key:"removeLikeFromCard",value:function(e){return fetch("".concat(this._api_prefix,"/cards/likes/").concat(e),{method:"DELETE",headers:this._mandatory_headers}).then(n._checkRes)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._api_prefix,"/cards/").concat(e),{method:"DELETE",headers:this._mandatory_headers}).then(n._checkRes)}}])&&e(r.prototype,o),i&&e(r,i),n}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o(this,"_selectorConfig",void 0),o(this,"_formElement",void 0),o(this,"_inputList",void 0),o(this,"_buttonElement",void 0),this._formElement=t,this._selectorConfig=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._selectorConfig.inputSelector)),this._buttonElement=this._formElement.querySelector(this._selectorConfig.buttonSelector)}var t,n,i;return t=e,i=[{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}}],(n=[{key:"_showInputError",value:function(e,t){e.classList.add(this._selectorConfig.inputErrorMode);var n=this._formElement.querySelector("#".concat(e.id,"-error"));n.textContent=t,n.classList.add(this._selectorConfig.errorMode)}},{key:"_hideInputError",value:function(e){e.classList.remove(this._selectorConfig.inputErrorMode);var t=this._formElement.querySelector("#".concat(e.id,"-error"));t.classList.remove(this._selectorConfig.inputErrorMode),t.classList.remove(this._selectorConfig.errorMode)}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_toggleButtonMode",value:function(){e._hasInvalidInput(this._inputList)?this.disableSubmitButton():(this._buttonElement.disabled=!1,this._buttonElement.classList.remove(this._selectorConfig.buttonMode))}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonMode(),this._inputList.forEach((function(t){t.addEventListener("input",(function(n){n.preventDefault(),e._checkInputValidity(t),e._toggleButtonMode()}))}))}},{key:"disableSubmitButton",value:function(){this._buttonElement.disabled=!0,this._buttonElement.classList.add(this._selectorConfig.buttonMode)}},{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"cleanFormValidation",value:function(){this._inputList.forEach(this._hideInputError.bind(this)),this.disableSubmitButton(),this._formElement.reset()}}])&&r(t.prototype,n),i&&r(t,i),e}(),a="card__like-button_active",u=(document.querySelector(".overlay__form[name = overlay-form-card]"),"#image-overlay"),c={formSelector:".overlay__form",inputSelector:".overlay__form-input",buttonSelector:".overlay__save-button",buttonMode:".overlay__save-button",inputErrorMode:"overlay__form-input_set",errorMode:"overlay__form-error_visible"},l={popupSelector:"#overlay-avatar",formAvatar:document.querySelector(".overlay__form[name = form-avatar]"),urlInput:document.querySelector(".overlay__form-input[name = input-avatar]")},s={profileOverlaySelector:"#change-profile-overlay",profileForm:document.querySelector(".overlay__form[name = overlay-form-profile]"),userNameInput:document.querySelector(".overlay__form-input[name = input-name-profile]"),userAboutInput:document.querySelector(".overlay__form-input[name = input-description-profile]")},f=document.querySelector(".profile__avatar-container"),d=document.querySelector(".profile__change-button"),h=document.querySelector(".profile__add-button");function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(){function e(t,n,r,o,i){var a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),v(this,"_authUserID",void 0),v(this,"_cardClickHandler",void 0),v(this,"_cardDeleteHandler",void 0),v(this,"_cardLikeHandler",void 0),v(this,"_domNode",void 0),v(this,"_id",void 0),v(this,"_likeButton",void 0),v(this,"_likes",void 0),v(this,"_link",void 0),v(this,"_name",void 0),v(this,"_owner",void 0),v(this,"_cardImageClickListener",(function(){var e={alt:a._name,caption:a._name,link:a._link};a._cardClickHandler(e)})),v(this,"_cardLikeButtonClickListener",(function(){var e=a._likeButton.classList.contains("card__like-button_active");a._cardLikeHandler(a,e)})),v(this,"_cardRemoveListener",(function(){a._cardDeleteHandler(a)})),v(this,"_setEventListeners",(function(e,t){e.addEventListener("click",a._cardImageClickListener),t.addEventListener("click",a._cardRemoveListener),a._likeButton.addEventListener("click",a._cardLikeButtonClickListener)})),v(this,"updateLikes",(function(e){a._likes=e,a._renderLikesElement()})),v(this,"delete",(function(){a._domNode.remove()})),v(this,"make",(function(){var e=a._domNode.querySelector(".card__image");e.src=a._link,e.alt=a._name,a._likeButton=a._domNode.querySelector(".card__like-button"),a._domNode.querySelector(".card__description-title").textContent=a._name;var t=a._domNode.querySelector(".card__delete-button");return a._showBin(t),a._renderLikesElement(),a._setEventListeners(e,t),a._domNode}));this._domNode=document.querySelector(n).content.querySelector(".card__item").cloneNode(!0),this._authUserID=t.authUserID,this._id=t._id,this._name=t.name,this._link=t.link,this._owner=t.owner,this._likes=t.likes,this._cardClickHandler=r,this._cardLikeHandler=o,this._cardDeleteHandler=i}var t,n;return t=e,(n=[{key:"id",get:function(){return this._id}},{key:"_showBin",value:function(e){this._owner._id!==this._authUserID&&e.remove()}},{key:"_renderLikesElement",value:function(){var e=this,t=a;this._counter=this._domNode.querySelector(".card__like-counter"),this._counter.textContent=this._likes.length,this._likeButton.classList.remove(t),this._likes.forEach((function(n){n._id===e._authUserID&&e._likeButton.classList.add(t)}))}}])&&_(t.prototype,n),e}();function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),y(this,"_id",void 0),y(this,"_items",void 0),y(this,"_renderer",void 0),y(this,"_containerSelector",void 0),this._items=r,this._renderer=o,this._containerSelector=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e,t){t?this._containerSelector.prepend(e):this._containerSelector.append(e)}},{key:"render",value:function(){var e=this;this._items.forEach((function(t){e._renderer({name:t.name,link:t.link,_id:t._id,owner:t.owner,likes:t.likes})}))}}])&&p(t.prototype,n),e}();function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),g(this,"_overlay",void 0),g(this,"_openedClass",void 0),g(this,"_closeButton",void 0);this._overlay=document.querySelector(t),this._openedClass="overlay_open",this._closeButton=this._overlay.querySelector(".overlay__close-button"),this._handleEscClose=this._handleEscClose.bind(this),this.setEventListeners()}var t,n;return t=e,(n=[{key:"overlay",get:function(){return this._overlay}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target===e.currentTarget&&this.close()}},{key:"open",value:function(){document.addEventListener("keyup",this._handleEscClose),this._overlay.classList.add(this._openedClass)}},{key:"close",value:function(){document.removeEventListener("keyup",this._handleEscClose),this._overlay.classList.remove(this._openedClass)}},{key:"setEventListeners",value:function(){var e=this;this._closeButton.addEventListener("click",(function(){return e.close()})),this._overlay.addEventListener("mousedown",(function(t){return e._handleOverlayClose(t)}))}}])&&k(t.prototype,n),e}();function S(e){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(e,t){return!t||"object"!==S(t)&&"function"!=typeof t?O(e):t}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e,t,n){return(I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=j(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=j(r);if(o){var n=j(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function a(e){var t,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),P(O(r=i.call(this,e)),"_image",void 0),P(O(r),"_caption",void 0);return r._image=I((t=O(r),j(a.prototype)),"overlay",t).querySelector(".overlay__image"),r._caption=I((n=O(r),j(a.prototype)),"overlay",n).querySelector(".overlay__image-caption"),r}return t=a,(n=[{key:"open",value:function(e){this._image.src=e.link,this._image.alt=e.alt,this._caption.textContent=e.caption,I(j(a.prototype),"open",this).call(this)}}])&&w(t.prototype,n),a}(E);function R(e){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function B(e,t){return(B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function x(e,t){return!t||"object"!==R(t)&&"function"!=typeof t?N(e):t}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function T(e,t,n){return(T="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=U(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function U(e){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function H(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var D=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=U(r);if(o){var n=U(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return x(this,e)});function a(e,t){var n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),H(N(r=i.call(this,e)),"_form",void 0),H(N(r),"_formValues",void 0),H(N(r),"_submitButton",void 0),H(N(r),"_inputList",void 0),H(N(r),"_submitHandler",void 0);var o=c.formSelector,u=c.inputSelector,l=c.buttonSelector;return r._form=T((n=N(r),U(a.prototype)),"overlay",n).querySelector(o),r._inputList=r._form.querySelectorAll(u),r._submitButton=r._form.querySelector(l),r._submitHandler=t,r._formValues={},r._setEventListeners(),r}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"_formSubmitHandler",value:function(e){e.preventDefault(),this._submitHandler(this._getInputValues())}},{key:"_setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){return e._formSubmitHandler(t)}))}},{key:"setSubmitHandler",value:function(e){this._submitHandler=e}},{key:"renderLoading",value:function(e){this._submitButton.textContent=e?"Сохранение...":"Сохранить"}},{key:"close",value:function(){T(U(a.prototype),"close",this).call(this),this._form.reset()}}])&&A(t.prototype,n),a}(E);function M(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function V(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var F=function(){function e(t){var n=t.userNameSelector,r=t.userCaptionSelector,o=t.userAvatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),V(this,"_userNameElement",void 0),V(this,"_userCaptionElement",void 0),V(this,"_userAvatarElement",void 0),V(this,"_userId",void 0),this._userNameElement=document.querySelector(n),this._userCaptionElement=document.querySelector(r),this._userAvatarElement=document.querySelector(o),this._userId=null}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userNameElement.textContent,caption:this._userCaptionElement.textContent,avatar:this._userAvatarElement.src,id:this._userId}}},{key:"setUserInfo",value:function(e){this._userNameElement.textContent=e.name,this._userCaptionElement.textContent=e.about,this._userAvatarElement.src=e.avatar,this._userId=e._id}}])&&M(t.prototype,n),e}();function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var G,z=new n({url:"https://mesto.nomoreparties.co/v1/cohort-25",headers:{authorization:"8e17de69-5c22-4aaf-b9e8-673eda086f85","Content-Type":"application/json"}}),$={},K=new F({userNameSelector:".profile__name",userCaptionSelector:".profile__description",userAvatarSelector:".profile__image"}),Q=new D("#overlay-with-submit"),W=new q(u),X=function(e){return e.authUserID=K.getUserInfo().id,new m(e,"#card-template",(function(e){return W.open(e)}),(function(e,t){(t?z.removeLikeFromCard(e.id):z.likeCard(e.id)).then((function(t){e.updateLikes(t.likes)})).catch((function(e){return console.error(e)}))}),(function(e){Q.setSubmitHandler((function(){return z.deleteCard(e.id).then((function(){e.delete(),Q.close()})).catch((function(e){console.error(e)}))})),Q.open()})).make()};Promise.all([z.getUserData(),z.getCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return J(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];K.setUserInfo(o),(G=new b({items:i,renderer:function(e){var t=X(e);G.addItem(t)}},".card__list")).render()})).catch((function(e){return console.error(e)}));var Y=new D(l.popupSelector,(function(e){Y.renderLoading(!0),z.setUserAvatar(e["input-avatar"]).then((function(e){K.setUserInfo(e),Y.close(),Y.renderLoading(!1)})).catch((function(e){return console.error(e)}))})),Z=new D(s.profileOverlaySelector,(function(e){Z.renderLoading(!0),z.setProfileInfo(e["input-name-profile"],e["input-description-profile"]).then((function(e){K.setUserInfo(e),Z.close(),Z.renderLoading(!1)})).catch((function(e){return console.error(e)}))})),ee=new D("#new-card-overlay",(function(e){z.addCard(e["input-name-card"],e["input-image-url"]).then((function(e){G.addItem(X(e),!0),ee.close()})).catch((function(e){return console.error(e)}))}));document.querySelectorAll(c.formSelector).forEach((function(e){$[e.name]=new i(e,c),$[e.name].enableValidation()})),f.addEventListener("click",(function(){var e=K.getUserInfo().avatar;l.urlInput.setAttribute("value",e),$["form-avatar"].cleanFormValidation(),Y.open()})),d.addEventListener("click",(function(){var e=K.getUserInfo(),t=e.name,n=e.caption,r=s.userAboutInput;s.userNameInput.setAttribute("value",t),r.setAttribute("value",n),$["overlay-form-profile"].cleanFormValidation(),Z.open()})),h.addEventListener("click",(function(){$["overlay-form-card"].cleanFormValidation(),ee.open()}))})();