(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _iosVhFix = require("./utils/ios-vh-fix");
var _form = require("./modules/form-validate/form");
var _initVideoPlayer = require("./modules/init-video-player");
var _initTabs = require("./modules/tabs/init-tabs");
var _initSliderCoaches = require("./modules/sliders/init-slider-coaches");
var _getSlidesTabs = require("./modules/sliders/get-slides-tabs");
var _initSliderReviews = require("./modules/sliders/init-slider-reviews");
// ---------------------------------

window.addEventListener('DOMContentLoaded', function () {
  // Utils
  // ---------------------------------

  (0, _iosVhFix.iosVhFix)();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', function () {
    var form = new _form.Form();
    window.form = form;
    (0, _initVideoPlayer.initVideoPlayer)();
    (0, _initTabs.initTabs)();
    (0, _getSlidesTabs.getSlidesTabs)();
    (0, _initSliderCoaches.initSliderCoaches)();
    (0, _initSliderReviews.initSliderReviews)();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

},{"./modules/form-validate/form":3,"./modules/init-video-player":9,"./modules/sliders/get-slides-tabs":10,"./modules/sliders/init-slider-coaches":11,"./modules/sliders/init-slider-reviews":12,"./modules/tabs/init-tabs":13,"./utils/ios-vh-fix":16}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callbacks = void 0;
var baseSuccessCallback = function baseSuccessCallback(event) {
  event.preventDefault();
  // В данном колбеке бэкендер, либо разработчик при необходимости будет писать запрос на отправку формы на сервер и обрабатывать возможные ошибки или успешную отправку формы на сервер
};

var baseErrorCallback = function baseErrorCallback(event) {
  event.preventDefault();
  // Данный коллбек используется при необходимости выполнить какое-либо действие помимо показа ошибок при попытке отправить неккорректные данные, он не связан с запросами на сервер
};

var callbacks = {
  base: {
    // Сбросс формы
    reset: true,
    // Таймаут сброса формы
    resetTimeout: 500,
    successCallback: baseSuccessCallback,
    errorCallback: baseErrorCallback
  }
};
exports.callbacks = callbacks;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;
var _validator = require("./validator");
var _callback = require("./callback");
var _initPhoneInput = require("./init-phone-input");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Form = /*#__PURE__*/function () {
  function Form() {
    _classCallCheck(this, Form);
    this._validator = new _validator.Validator();
    this._initPhoneInput = _initPhoneInput.initPhoneInput;
    this._callbacks = _callback.callbacks;
  }
  _createClass(Form, [{
    key: "_resetSelect",
    value: function _resetSelect(select) {
      var nativeSelect = select.querySelector('select');
      var activeIndex = nativeSelect.options.selectedIndex;
      var selectedOption = nativeSelect.options[activeIndex];
      var buttonText = select.querySelector('.custom-select__text');
      var selectItems = select.querySelectorAll('.custom-select__item');
      buttonText.textContent = selectedOption.textContent;
      selectItems.forEach(function (item, index) {
        if (index === activeIndex - 1) {
          item.setAttribute('aria-selected', 'true');
          return;
        }
        item.setAttribute('aria-selected', 'false');
      });
      if (!nativeSelect.value) {
        select.classList.remove('not-empty');
        select.classList.remove('is-valid');
      }
    }
  }, {
    key: "_resetSelects",
    value: function _resetSelects(form) {
      var _this = this;
      var selects = form.querySelectorAll('[data-select]');
      selects.forEach(function (select) {
        _this._resetSelect(select);
      });
    }
  }, {
    key: "reset",
    value: function reset(form) {
      var _this2 = this;
      form.reset();
      form.querySelectorAll('.is-invalid').forEach(function (item) {
        return item.classList.remove('is-invalid');
      });
      form.querySelectorAll('.is-valid').forEach(function (item) {
        return item.classList.remove('is-valid');
      });
      form.querySelectorAll('.input-message').forEach(function (item) {
        return item.remove();
      });
      setTimeout(function () {
        _this2._resetSelects(form);
      });
    }
  }, {
    key: "initPhoneInput",
    value: function initPhoneInput(parent) {
      this._initPhoneInput(parent);
    }
  }, {
    key: "validateForm",
    value: function validateForm(form) {
      return this._validator.validateForm(form);
    }
  }, {
    key: "validateFormElement",
    value: function validateFormElement(item) {
      return this._validator.validateFormElement(item);
    }
  }, {
    key: "_onFormSubmit",
    value: function _onFormSubmit(event) {
      var _this3 = this;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (this.validateForm(event.target) && callback) {
        this._callbacks[callback].successCallback(event);
        if (this._callbacks[callback].reset) {
          setTimeout(function () {
            _this3.reset(event.target);
          }, this._callbacks[callback].resetTimeout ? this._callbacks[callback].resetTimeout : 500);
        }
        return;
      }
      if (!this.validateForm(event.target) && callback) {
        this._callbacks[callback].errorCallback(event);
        return;
      }
    }
  }, {
    key: "_onFormInput",
    value: function _onFormInput(item) {
      this.validateFormElement(item);
    }
  }, {
    key: "_initValidate",
    value: function _initValidate(parent) {
      var _this4 = this;
      var form = parent.querySelector('form');
      if (!form) {
        return;
      }
      var phoneParents = form.querySelectorAll('[data-validate-type="phone"]');
      phoneParents.forEach(function (item) {
        return _this4._initPhoneInput(item);
      });
      var callback = parent.dataset.callback;
      form.noValidate = true;
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        _this4._onFormSubmit(event, callback);
      });
      form.addEventListener('input', function (event) {
        _this4._onFormInput(event.target);
      });
      form.addEventListener('reset', function (event) {
        _this4.reset(event.target);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this5 = this;
      this._validateParent = document.querySelectorAll('[data-form-validate]');
      if (!this._validateParent.length) {
        return;
      }
      this._validateParent.forEach(function (parent) {
        return _this5._initValidate(parent);
      });
    }
  }]);
  return Form;
}();
exports.Form = Form;

},{"./callback":2,"./init-phone-input":4,"./validator":8}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPhoneInput = void 0;
var baseCountryCode = '+7';
var baseMatrix = ' (___) ___ __ __';
var phoneLength = baseCountryCode.length + baseMatrix.length;
var onPhoneInputInput = function onPhoneInputInput(e) {
  var matrix = "".concat(baseCountryCode).concat(baseMatrix);
  var def = matrix.replace(/\D/g, '');
  var i = 0;
  var val = e.target.value.replace(/\D/g, '');
  if (def.length >= val.length) {
    val = def;
  }
  e.target.value = matrix.replace(/./g, function (a) {
    if (/[_\d]/.test(a) && i < val.length) {
      return val.charAt(i++);
    } else if (i >= val.length) {
      return '';
    } else {
      return a;
    }
  });
};
var onPhoneInputFocus = function onPhoneInputFocus(_ref) {
  var target = _ref.target;
  if (!target.value) {
    target.value = baseCountryCode;
  }
  target.addEventListener('input', onPhoneInputInput);
  target.addEventListener('blur', onPhoneInputBlur);
  target.addEventListener('keydown', onPhoneInputKeydown);
  target.addEventListener('paste', onPhoneInputPaste);
  target.addEventListener('click', onPhoneInputClick);
};
var onPhoneInputClick = function onPhoneInputClick(e) {
  if (e.target.selectionStart < 4) {
    e.preventDefault();
    e.target.setSelectionRange(3, 3);
  }
};
var onPhoneInputPaste = function onPhoneInputPaste(e) {
  e.target.setSelectionRange(0, 0);
  if (!e.target.selectionStart) {
    setTimeout(function () {
      if (e.target.value.startsWith('+7')) {
        return;
      }
      if (e.target.value.startsWith('+8')) {
        e.target.value = "+7 ".concat(e.target.value.slice(3));
        return;
      }
      e.target.value = '';
    });
  }
};
var onPhoneInputKeydown = function onPhoneInputKeydown(e) {
  if (e.target.selectionStart < 4 && (e.keyCode === 37 || e.keyCode === 13)) {
    e.preventDefault();
    e.target.setSelectionRange(3, 3);
  }
};
var onPhoneInputBlur = function onPhoneInputBlur(_ref2) {
  var target = _ref2.target;
  if (target.value === baseCountryCode) {
    var parent = target.closest('[data-validate-type="phone"]');
    target.value = '';
    if (!parent.hasAttribute('data-required')) {
      parent.classList.remove('is-valid');
      parent.classList.remove('is-invalid');
      var parentMessage = parent.querySelector('.input-message');
      if (parentMessage) {
        parentMessage.remove();
      }
    }
    parent.classList.remove('not-empty');
    target.removeEventListener('input', onPhoneInputInput);
    target.removeEventListener('blur', onPhoneInputBlur);
    target.removeEventListener('keydown', onPhoneInputKeydown);
    target.removeEventListener('paste', onPhoneInputPaste);
    target.removeEventListener('click', onPhoneInputClick);
  }
};
var initPhoneInput = function initPhoneInput(parent) {
  var input = parent.querySelector('input');
  parent.dataset.phoneLength = phoneLength;
  input.addEventListener('focus', onPhoneInputFocus);
};
exports.initPhoneInput = initPhoneInput;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matrixReplace = void 0;
var matrixReplace = function matrixReplace(item, matrix, RegEx) {
  if (!matrix) {
    // eslint-disable-next-line no-console
    console.error('При валидации по матрице обязательно указывать формат матрицы: data-matrix=""');
    item.value = '';
    return;
  }
  if (!RegEx) {
    // eslint-disable-next-line no-console
    console.error('При валидации по матрице обязательно указывать формат ограничений: data-matrix-limitations=""');
    item.value = '';
    return;
  }
  var def = matrix.replace(RegEx, '');
  var val = item.value.replace(RegEx, '');
  var i = 0;
  if (def.length >= val.length) {
    val = def;
  }
  item.value = matrix.replace(/./g, function (a) {
    if (/[_\^]/.test(a) && i < val.length) {
      return val.charAt(i++);
    } else if (i >= val.length) {
      return '';
    } else {
      return a;
    }
  });
};
exports.matrixReplace = matrixReplace;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatrixLimitationsRegEx = exports.getMailRegEx = exports.getLimitationsRegEx = void 0;
var setLimitationError = function setLimitationError(limitation) {
  // eslint-disable-next-line no-console
  console.error("\u041F\u0435\u0440\u0435\u0434\u0430\u043D\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F(data-limitation=\"".concat(limitation, "\") - \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0441\u0442\u044C \u0432\u0432\u0435\u0434\u0451\u043D\u043D\u044B\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439."));
};
var getLimitationsRegEx = function getLimitationsRegEx(limitation) {
  switch (limitation) {
    case 'digit':
      return /[^\d]/g;
    case 'name':
      return /[^a-zA-Zа-яёА-ЯЁ\-\s]/g;
    case 'letters':
      return /[^a-zA-Zа-яёА-ЯЁ\s]/g;
    case 'letters-and-digit':
      return /[^a-zA-Zа-яёА-ЯЁ\s\d]/g;
    case 'cyrillic':
      return /[^а-яёА-ЯЁ\s]/g;
    case 'latin':
      return /[^a-zA-Z\s]/g;
    default:
      return setLimitationError(limitation);
  }
};
exports.getLimitationsRegEx = getLimitationsRegEx;
var getMatrixLimitationsRegEx = function getMatrixLimitationsRegEx(matrix) {
  switch (matrix) {
    case 'digit':
      return /[^\d]/g;
    case 'name':
      return /[^\а-яё\А-ЯЁ\a-z\A-Z\-]]/g;
    case 'letters':
      return /[^\а-яё\А-ЯЁ\a-z\A-Z]/g;
    case 'letters-and-digit':
      return /[^\а-яё\А-ЯЁ\a-z\A-Z\d]/g;
    case 'cyrillic':
      return /[^\а-яё\А-ЯЁ]/g;
    case 'latin':
      return /[^\a-z\A-Z]/g;
    default:
      return false;
  }
};
exports.getMatrixLimitationsRegEx = getMatrixLimitationsRegEx;
var getMailRegEx = function getMailRegEx() {
  return /[a-zA-Zа-яёА-ЯЁ0-9]{1}([a-zA-Zа-яёА-ЯЁ0-9\-_\.]{1,})?@[a-zA-Zа-яёА-ЯЁ0-9\-]{1}([a-zA-Zа-яёА-ЯЁ0-9.\-]{1,})?[a-zA-Zа-яёА-ЯЁ0-9\-]{1}\.[a-zA-Zа-яёА-ЯЁ]{2,6}/;
};
exports.getMailRegEx = getMailRegEx;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Message = /*#__PURE__*/function () {
  function Message() {
    _classCallCheck(this, Message);
    this._baseErrorText = 'Это поле является обязательным';
  }
  _createClass(Message, [{
    key: "_messageTemplate",
    value: function _messageTemplate(message, state) {
      var cssClass = state === 'valid' ? 'is-valid' : 'is-invalid';
      return "<span class=\"input-message ".concat(cssClass, "\">").concat(message, "</span>");
    }
  }, {
    key: "removeMessage",
    value: function removeMessage(parent) {
      var parentMessage = parent.querySelector('.input-message');
      if (parentMessage) {
        parentMessage.remove();
      }
    }
  }, {
    key: "renderMessage",
    value: function renderMessage(parent, message, state) {
      this.removeMessage(parent);
      parent.insertAdjacentHTML('beforeend', this._messageTemplate(message, state));
    }
  }]);
  return Message;
}();
exports.Message = Message;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validator = void 0;
var _regularExpression = require("./regular-expression");
var _matrix = require("./matrix");
var _renderMessage2 = require("./render-message");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);
    this._getLimitationsRegEx = _regularExpression.getLimitationsRegEx;
    this._getMatrixLimitationsRegEx = _regularExpression.getMatrixLimitationsRegEx;
    this._getMailRegEx = _regularExpression.getMailRegEx;
    this._matrixReplace = _matrix.matrixReplace;
    this._message = new _renderMessage2.Message();
  }
  _createClass(Validator, [{
    key: "_renderMessage",
    value: function _renderMessage(trigger, parent, input) {
      if (!parent.hasAttribute('data-required') && !input.value) {
        return;
      }
      if (!trigger) {
        parent.classList.add('is-invalid');
        if (parent.hasAttribute('data-message-base') && !input.value) {
          this._message.renderMessage(parent, parent.dataset.messageBase, 'invalid');
        } else if (parent.hasAttribute('data-message-extra') && input.value) {
          this._message.renderMessage(parent, parent.dataset.messageExtra, 'invalid');
        } else if (!parent.hasAttribute('data-message-extra') && parent.hasAttribute('data-message-base') && input.value) {
          this._message.renderMessage(parent, parent.dataset.messageBase, 'invalid');
        } else {
          this._message.removeMessage(parent);
        }
      } else {
        if (parent.hasAttribute('data-message-success')) {
          this._message.renderMessage(parent, parent.dataset.messageSuccess, 'valid');
        } else {
          this._message.removeMessage(parent);
        }
      }
    }
  }, {
    key: "_setItemValidState",
    value: function _setItemValidState(parent, input) {
      if (!parent.hasAttribute('data-required') && !input.value) {
        return;
      }
      parent.classList.add('is-valid');
      parent.classList.remove('is-invalid');
      input.setAttribute('aria-invalid', 'false');
      this._message.removeMessage(parent);
    }
  }, {
    key: "_setItemInvalidState",
    value: function _setItemInvalidState(parent, input) {
      if (!parent.hasAttribute('data-required') && !input.value) {
        return;
      }
      parent.classList.remove('is-valid');
      input.setAttribute('aria-invalid', 'true');
    }
  }, {
    key: "_simpleLimitation",
    value: function _simpleLimitation(item, limitation) {
      item.value = item.value.replace(this._getLimitationsRegEx(limitation), '');
    }
  }, {
    key: "_matrixLimitation",
    value: function _matrixLimitation(item, matrix, limitation) {
      this._matrixReplace(item, matrix, limitation);
    }
  }, {
    key: "_validateTextInput",
    value: function _validateTextInput(parent, input) {
      var flag = true;
      if (input.value.length >= (+input.getAttribute('minlength') || 1)) {
        this._setItemValidState(parent, input);
      } else {
        this._setItemInvalidState(parent, input);
        flag = false;
      }
      return flag;
    }
  }, {
    key: "_validateMatrixInput",
    value: function _validateMatrixInput(parent, input) {
      var flag = true;
      if (input.value.length === input.closest('[data-matrix]').dataset.matrix.length) {
        this._setItemValidState(parent, input);
      } else {
        this._setItemInvalidState(parent, input);
        flag = false;
      }
      return flag;
    }
  }, {
    key: "_validateEmailInput",
    value: function _validateEmailInput(parent, input) {
      var flag = true;
      if (new RegExp(this._getMailRegEx(), '').test(input.value)) {
        this._setItemValidState(parent, input);
      } else {
        this._setItemInvalidState(parent, input);
        flag = false;
      }
      return flag;
    }
  }, {
    key: "_validatePhoneInput",
    value: function _validatePhoneInput(parent, input) {
      var flag = true;
      if (input.value.length >= +parent.dataset.phoneLength) {
        this._setItemValidState(parent, input);
      } else {
        this._setItemInvalidState(parent, input);
        flag = false;
      }
      return flag;
    }
  }, {
    key: "_validateCheckbox",
    value: function _validateCheckbox(parent, input) {
      var flag = true;
      if (input.checked) {
        this._setItemValidState(parent, input);
      } else {
        this._setItemInvalidState(parent, input);
        flag = false;
      }
      return flag;
    }
  }, {
    key: "_findSelectedOption",
    value: function _findSelectedOption(options) {
      var flag = false;
      options.forEach(function (option) {
        if (option.value && option.selected) {
          flag = true;
        }
      });
      return flag;
    }
  }, {
    key: "_validateSelect",
    value: function _validateSelect(parent, input) {
      var options = input.querySelectorAll('option');
      var customSelectText = parent.querySelector('.custom-select__text');
      input.setAttribute('aria-invalid', 'false');
      var flag = true;
      if (this._findSelectedOption(options)) {
        this._setItemValidState(parent, input);
      } else {
        this._setItemInvalidState(parent, input);
        parent.classList.remove('not-empty');
        customSelectText.innerHTML = '';
        flag = false;
      }
      return flag;
    }
  }, {
    key: "_returnCheckedElements",
    value: function _returnCheckedElements(inputs) {
      var flag = false;
      inputs.forEach(function (input) {
        if (input.checked) {
          flag = true;
        }
      });
      return flag;
    }
  }, {
    key: "_removeGroupAria",
    value: function _removeGroupAria(inputs) {
      inputs.forEach(function (input) {
        if (!input.checked) {
          input.removeAttribute('aria-required');
          input.removeAttribute('aria-invalid');
        } else {
          input.setAttribute('aria-required', true);
          input.setAttribute('aria-invalid', false);
        }
      });
    }
  }, {
    key: "_setGroupAria",
    value: function _setGroupAria(inputs) {
      inputs.forEach(function (input) {
        input.setAttribute('aria-required', true);
        input.setAttribute('aria-invalid', true);
      });
    }
  }, {
    key: "_validateToggleGroup",
    value: function _validateToggleGroup(parent) {
      var formElements = parent.querySelectorAll('input');
      var flag = true;
      if (this._returnCheckedElements(formElements)) {
        this._removeGroupAria(formElements);
        parent.classList.remove('is-invalid');
        parent.classList.add('is-valid');
        this._message.removeMessage(parent);
      } else {
        this._setGroupAria(formElements);
        parent.classList.remove('is-valid');
        flag = false;
      }
      return flag;
    }
  }, {
    key: "_customExample",
    value: function _customExample(parent, input) {
      var flag = true;
      if (!input.value.length) {
        parent.dataset.messageBase = 'Поле обязательно к заполнению';
        this._setItemInvalidState(parent, input);
        flag = false;
      } else if (input.value.length < input.minLength) {
        parent.dataset.messageBase = "\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0432\u0432\u0435\u0441\u0442\u0438 \u0435\u0449\u0451 ".concat(input.minLength - input.value.length, " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432");
        this._setItemInvalidState(parent, input);
        flag = false;
      } else if (input.value.length > input.minLength) {
        parent.dataset.messageBase = "\u0412\u044B \u0432\u0432\u0435\u043B\u0438 ".concat(input.value.length - input.minLength, " \u043B\u0438\u0448\u043D\u0438\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432");
        this._setItemInvalidState(parent, input);
        flag = false;
      } else {
        parent.dataset.messageSuccess = 'Поле заполнено корректно';
        this._setItemValidState(parent, input);
        flag = true;
      }
      return flag;
    }
  }, {
    key: "_validateFile",
    value: function _validateFile(parent, input) {
      var flag = true;
      var sizeTest = parent.dataset.maxSize && input.files[0] ? input.files[0].size < +parent.dataset.maxSize : true;
      if (input.value && sizeTest) {
        this._setItemValidState(parent, input);
      } else {
        this._setItemInvalidState(parent, input);
        flag = false;
      }
      return flag;
    }
  }, {
    key: "_validateInput",
    value: function _validateInput(type, parent, input) {
      switch (type) {
        case 'text':
          return this._validateTextInput(parent, input);
        case 'matrix':
          return this._validateMatrixInput(parent, input);
        case 'email':
          return this._validateEmailInput(parent, input);
        case 'phone':
          return this._validatePhoneInput(parent, input);
        case 'checkbox':
          return this._validateCheckbox(parent, input);
        case 'select':
          return this._validateSelect(parent, input);
        case 'toggle-group':
          return this._validateToggleGroup(parent, input);
        case 'file':
          return this._validateFile(parent, input);
        case 'custom-example':
          return this._customExample(parent, input);
        default:
          return false;
      }
    }
  }, {
    key: "validateFormElement",
    value: function validateFormElement(formElement) {
      var fullValidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var parent = formElement.closest('[data-validate-type]');
      if (!parent) {
        return;
      }
      if (!parent.hasAttribute('data-required')) {
        var removeElement = parent.querySelector('input') || parent.querySelector('select') || parent.querySelector('textarea');
        if (!removeElement.value) {
          parent.classList.remove('is-valid');
          parent.classList.remove('is-invalid');
        }
      }
      var onInputValidate = parent.hasAttribute('data-on-input-validate');
      if (parent.hasAttribute('data-limitation')) {
        this._simpleLimitation(formElement, parent.dataset.limitation);
      }
      if (parent.dataset.validateType === 'matrix') {
        this._matrixLimitation(formElement, parent.dataset.matrix, this._getMatrixLimitationsRegEx(parent.dataset.matrixLimitation));
      }
      var isValid = this._validateInput(parent.dataset.validateType, parent, formElement);
      if (onInputValidate || fullValidate) {
        this._renderMessage(isValid, parent, formElement);
      }
    }
  }, {
    key: "_fullValidate",
    value: function _fullValidate(items) {
      var _this = this;
      var result = true;
      items.forEach(function (item) {
        var formElement = item.querySelector('input') || item.querySelector('select') || item.querySelector('textarea');
        _this.validateFormElement(formElement, true);
        if (item.classList.contains('is-invalid')) {
          result = false;
        }
      });
      return result;
    }
  }, {
    key: "validateForm",
    value: function validateForm(form) {
      var validateItems = form.querySelectorAll('[data-validate-type]');
      var result = this._fullValidate(validateItems);
      return result;
    }
  }]);
  return Validator;
}();
exports.Validator = Validator;

},{"./matrix":5,"./regular-expression":6,"./render-message":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initVideoPlayer = void 0;
var container = document.querySelector('.about__video');
var cover = document.querySelector('.about__video').querySelector('picture');
var button = document.querySelector('.about__video').querySelector('.about__play-button');
var createVideo = function createVideo() {
  var video = document.createElement('iframe');
  video.setAttribute('src', 'https://www.youtube.com/embed/9TZXsZItgdw?autoplay=1');
  video.setAttribute('title', 'YouTube video player');
  video.setAttribute('frameborder', '0');
  video.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  video.setAttribute('allowfullscreen', '');
  video.classList.add('about__video-player');
  container.append(video);
};
var initVideoPlayer = function initVideoPlayer() {
  if (container && cover && button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      cover.style.display = 'none';
      button.style.display = 'none';
      createVideo();
    });
  }
};
exports.initVideoPlayer = initVideoPlayer;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSlidesTabs = void 0;
var slides = document.querySelectorAll('.swiper-slide');
var getSlidesTabs = function getSlidesTabs() {
  var slidesObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.setAttribute('tabindex', '0');
      } else {
        entry.target.removeAttribute('tabindex', '0');
      }
    });
  });
  slides.forEach(function (slide) {
    return slidesObserver.observe(slide);
  });
};
exports.getSlidesTabs = getSlidesTabs;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSliderCoaches = void 0;
var sliderCoaches = document.querySelector('.coaches__swiper');
var buttonNext = document.querySelector('.swiper__button-next');
var buttonPrev = document.querySelector('.swiper__button-prev');
var initSliderCoaches = function initSliderCoaches() {
  if (sliderCoaches) {
    // eslint-disable-next-line
    new Swiper(sliderCoaches, {
      navigation: {
        nextEl: buttonNext,
        prevEl: buttonPrev
      },
      loop: true,
      breakpoints: {
        1200: {
          slidesPerView: 4,
          spaceBetween: 40
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        }
      }
    });
  }
};
exports.initSliderCoaches = initSliderCoaches;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSliderReviews = void 0;
var sliderReviews = document.querySelector('.reviews__swiper');
var buttonNext = document.querySelector('.reviews__button--next');
var buttonPrev = document.querySelector('.reviews__button--prev');
var initSliderReviews = function initSliderReviews() {
  if (sliderReviews) {
    // eslint-disable-next-line
    new Swiper(sliderReviews, {
      navigation: {
        nextEl: buttonNext,
        prevEl: buttonPrev
      },
      slidesPerView: 1,
      spaceBetween: 30
    });
  }
};
exports.initSliderReviews = initSliderReviews;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabs = exports.initTabs = void 0;
var _tabs = require("./tabs");
var tabs;
exports.tabs = tabs;
var initTabs = function initTabs() {
  exports.tabs = tabs = new _tabs.Tabs();
  // Используйте в разработке экспортируемую переменную tabs, window сделан для бэкэнда
  window.tabs = tabs;
};
exports.initTabs = initTabs;

},{"./tabs":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Tabs = /*#__PURE__*/function () {
  function Tabs() {
    _classCallCheck(this, Tabs);
    this._windowWidth = window.innerWidth;
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._init();
  }
  _createClass(Tabs, [{
    key: "_init",
    value: function _init() {
      this._initAllTabs();
      document.addEventListener('click', this._documentClickHandler);
    }
  }, {
    key: "_resizeObserver",
    value: function _resizeObserver() {
      var _this = this;
      return new ResizeObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            if (entry.target.classList.contains('is-active')) {
              _this._updateTabHeight();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    }
  }, {
    key: "_documentClickHandler",
    value: function _documentClickHandler(evt) {
      var target = evt.target;
      if (!target.closest('[data-tabs="control"]')) {
        return;
      }
      evt.preventDefault();
      var control = target.closest('[data-tabs="control"]');
      this.openTab(control);
    }
  }, {
    key: "_initAllTabs",
    value: function _initAllTabs() {
      var _this2 = this;
      var tabs = document.querySelectorAll('[data-tabs="parent"]');
      var forLoadTabs = document.querySelectorAll('[data-tabs="element"].for-load');
      tabs.forEach(function (tab) {
        _this2._initTab(tab);
      });
      forLoadTabs.forEach(function (tab) {
        tab.classList.remove('for-load');
      });
    }
  }, {
    key: "_removeAllActiveClasses",
    value: function _removeAllActiveClasses(tabControlElements, tabElements) {
      tabElements.forEach(function (tab) {
        tab.classList.remove('is-active');
      });
      tabControlElements.forEach(function (element, index) {
        element.classList.remove('is-active');
        element.setAttribute('data-index', index);
      });
    }
  }, {
    key: "_setTabStartState",
    value: function _setTabStartState(tab, dataHeight, tabElements, tabContentElement, tabControlElements, dataDelay) {
      var activeIndex = this._returnActiveIndex(tabControlElements);
      var blockHeight = dataHeight === 'max' ? this._returnMaxHeight(tabElements) : tabElements[activeIndex].offsetHeight;
      this._removeAllActiveClasses(tabControlElements, tabElements);
      tab.classList.add('no-transition');
      tabControlElements[activeIndex].classList.add('is-active');
      tabElements[activeIndex].classList.add('is-active');
      if (dataHeight !== 'unset') {
        tabContentElement.style.height = "".concat(blockHeight, "px");
      }
      setTimeout(function () {
        if (dataDelay) {
          tab.classList.remove('no-transition');
        }
      }, dataDelay);
    }
  }, {
    key: "_returnActiveIndex",
    value: function _returnActiveIndex(tabControlElements) {
      var activeIndex = 0;
      var flag = true;
      tabControlElements.forEach(function (control, index) {
        if (control.classList.contains('is-active') && flag) {
          activeIndex = index;
          flag = false;
        }
      });
      return activeIndex;
    }
  }, {
    key: "_returnMaxHeight",
    value: function _returnMaxHeight(tabElements) {
      var height = [];
      tabElements.forEach(function (element) {
        height.push(element.offsetHeight);
      });
      height.sort(function (a, b) {
        return a - b;
      });
      return height[height.length - 1];
    }
  }, {
    key: "_returnScopeList",
    value: function _returnScopeList(nodeList, parent) {
      var array = [];
      nodeList.forEach(function (element) {
        var elementParent = element.closest('[data-tabs="parent"]');
        if (elementParent === parent) {
          array.push(element);
        }
      });
      return array;
    }
  }, {
    key: "_returnScopeChild",
    value: function _returnScopeChild(nodeList, parent) {
      var currentChild;
      nodeList.forEach(function (element) {
        var elementParent = element.closest('[data-tabs="parent"]');
        if (elementParent === parent) {
          currentChild = element;
        }
      });
      return currentChild;
    }
  }, {
    key: "_updateTabHeight",
    value: function _updateTabHeight() {
      var _this3 = this;
      var activeElements = document.querySelectorAll('[data-tabs="element"].is-active');
      activeElements.forEach(function (element) {
        var transition = false;
        var parent = element.closest('[data-tabs="parent"]');
        if (parent.closest('[data-tabs="element"]')) {
          transition = true;
        }
        _this3._setTabElementHeight(element, transition);
      });
    }
  }, {
    key: "_setTabElementHeight",
    value: function _setTabElementHeight(element, transition) {
      var parentElement = element.closest('[data-tabs="parent"]');
      var dataHeight = parentElement.dataset.height;
      var contentElement = this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="content"]'), parentElement);
      var tabElements = this._returnScopeList(parentElement.querySelectorAll('[data-tabs="element"]'), parentElement);
      if (!transition) {
        parentElement.classList.add('no-transition');
      }
      if (dataHeight === 'max') {
        contentElement.style.height = "".concat(this._returnMaxHeight(tabElements), "px");
      } else if (dataHeight === 'unset') {
        contentElement.style.height = null;
      } else {
        contentElement.style.height = "".concat(this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="element"].is-active'), parentElement).offsetHeight, "px");
      }
      setTimeout(function () {
        return parentElement.classList.remove('no-transition');
      });
    }
  }, {
    key: "_initTab",
    value: function _initTab(tab) {
      var _this4 = this;
      var dataHeight = tab.dataset.height;
      var dataDelay = tab.dataset.delay ? tab.dataset.delay : 0;
      var tabContentElement = tab.querySelector('[data-tabs="content"]');
      var tabControlElements = this._returnScopeList(tab.querySelectorAll('[data-tabs="control"]'), tab);
      var tabElements = this._returnScopeList(tab.querySelectorAll('[data-tabs="element"]'), tab);
      this._setTabStartState(tab, dataHeight, tabElements, tabContentElement, tabControlElements, dataDelay);
      if (dataHeight !== 'unset') {
        tabElements.forEach(function (element) {
          _this4._resizeObserver().observe(element);
        });
      }
      setTimeout(function () {
        tab.classList.remove('no-transition-global');
      });
    }
  }, {
    key: "reInit",
    value: function reInit() {
      this._initAllTabs();
    }
  }, {
    key: "openTab",
    value: function openTab(control) {
      var currentIndex = control.dataset.index;
      var parentElement = control.closest('[data-tabs="parent"]');
      if (control.classList.contains('is-active') || parentElement.classList.contains('no-action')) {
        return;
      }
      var dataDelay = parentElement.dataset.delay ? parentElement.dataset.delay : 0;
      var dataHeight = parentElement.dataset.height;
      var contentElement = parentElement.querySelector('[data-tabs="content"]');
      var tabElements = this._returnScopeList(parentElement.querySelectorAll('[data-tabs="element"]'), parentElement);
      var activeControl = this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="control"].is-active'), parentElement);
      var activeElement = this._returnScopeChild(parentElement.querySelectorAll('[data-tabs="element"].is-active'), parentElement);
      var currentHeight = contentElement.offsetHeight;
      var newHeight = tabElements[currentIndex] && tabElements[currentIndex].offsetHeight || 0;
      var errorMassage = document.querySelector('[data-tabs="error"]');
      parentElement.classList.add('no-action');
      document.activeElement.blur();
      if (activeControl) {
        activeControl.classList.remove('is-active');
      }
      if (activeElement) {
        activeElement.classList.remove('is-active');
      }
      if (errorMassage) {
        errorMassage.classList.remove('is-active');
      }
      if (newHeight !== 0) {
        if (currentHeight > newHeight) {
          setTimeout(function () {
            if (dataHeight !== 'max' && dataHeight !== 'unset') {
              contentElement.style.height = newHeight + 'px';
            }
            control.classList.add('is-active');
            tabElements[currentIndex].classList.add('is-active');
            parentElement.classList.remove('no-action');
          }, dataDelay);
        } else {
          if (dataHeight !== 'max' && dataHeight !== 'unset') {
            contentElement.style.height = newHeight + 'px';
          }
          setTimeout(function () {
            control.classList.add('is-active');
            tabElements[currentIndex].classList.add('is-active');
            parentElement.classList.remove('no-action');
          }, dataDelay);
        }
      } else {
        parentElement.classList.remove('no-action');
        errorMassage.classList.add('is-active');
        control.classList.add('is-unavailable');
      }
    }
  }]);
  return Tabs;
}();
exports.Tabs = Tabs;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iosChecker = void 0;
var iosChecker = function iosChecker() {
  return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
  // iPad on iOS 13 detection
  || navigator.userAgent.includes('Mac') && 'ontouchend' in document;
};
exports.iosChecker = iosChecker;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iosVhFix = void 0;
var _iosChecker = require("./ios-checker");
var iosVhFix = function iosVhFix() {
  if (!(!!window.MSInputMethodContext && !!document.documentMode)) {
    if ((0, _iosChecker.iosChecker)()) {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
      window.addEventListener('resize', function () {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
      });
    }
  }
};
exports.iosVhFix = iosVhFix;

},{"./ios-checker":15}]},{},[1])


//# sourceMappingURL=main.min.js.map