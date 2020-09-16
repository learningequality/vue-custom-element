/**
  * vue-custom-element v3.2.14
  * (c) 2020 Karol Fabjańczuk
  * @license MIT
  */
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

/**
 * ES6 Object.getPrototypeOf Polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
 */
Object.setPrototypeOf = Object.setPrototypeOf || setPrototypeOf;

function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

var setPrototypeOf_1 = setPrototypeOf.bind(Object);

function isES2015() {
  if (typeof Symbol === 'undefined' || typeof Reflect === 'undefined' || typeof Proxy === 'undefined' || Object.isSealed(Proxy)) return false;
  return true;
}

var isES2015$1 = isES2015();

function registerCustomElement(tag) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof customElements === 'undefined') {
    return;
  }

  function constructorCallback() {
    if (options.shadow === true && HTMLElement.prototype.attachShadow) {
      this.attachShadow({
        mode: 'open'
      });
    }

    typeof options.constructorCallback === 'function' && options.constructorCallback.call(this);
  }

  function connectedCallback() {
    typeof options.connectedCallback === 'function' && options.connectedCallback.call(this);
  }

  function disconnectedCallback() {
    typeof options.disconnectedCallback === 'function' && options.disconnectedCallback.call(this);
  }

  function attributeChangedCallback(name, oldValue, value) {
    typeof options.attributeChangedCallback === 'function' && options.attributeChangedCallback.call(this, name, oldValue, value);
  }

  function define(tagName, CustomElement) {
    var existingCustomElement = customElements.get(tagName);
    var extendsOptions = typeof options["extends"] === 'string' ? {
      "extends": options["extends"]
    } : null;
    return typeof existingCustomElement !== 'undefined' ? existingCustomElement : customElements.define(tagName, CustomElement, extendsOptions);
  }

  if (isES2015$1) {
    var HTMLElementConstructor = HTMLElement;

    if (typeof options["extends"] === 'string') {
      var testElement = document.createElement(options["extends"]);
      HTMLElementConstructor = testElement.constructor || HTMLElementConstructor;
    }

    var CustomElement = function (_HTMLElementConstruct) {
      _inherits(CustomElement, _HTMLElementConstruct);

      var _super = _createSuper(CustomElement);

      function CustomElement(self) {
        var _this;

        _classCallCheck(this, CustomElement);

        _this = _super.call(this);
        var me = self ? HTMLElement.call(self) : _assertThisInitialized(_this);
        constructorCallback.call(me);
        return _possibleConstructorReturn(_this, me);
      }

      _createClass(CustomElement, null, [{
        key: "observedAttributes",
        get: function get() {
          return options.observedAttributes || [];
        }
      }]);

      return CustomElement;
    }(HTMLElementConstructor);

    CustomElement.prototype.connectedCallback = connectedCallback;
    CustomElement.prototype.disconnectedCallback = disconnectedCallback;
    CustomElement.prototype.attributeChangedCallback = attributeChangedCallback;
    define(tag, CustomElement);
    return CustomElement;
  } else {
    var _CustomElement = function _CustomElement(self) {
      var me = self ? HTMLElement.call(self) : this;
      constructorCallback.call(me);
      return me;
    };

    _CustomElement.observedAttributes = options.observedAttributes || [];
    _CustomElement.prototype = Object.create(HTMLElement.prototype, {
      constructor: {
        configurable: true,
        writable: true,
        value: _CustomElement
      }
    });
    _CustomElement.prototype.connectedCallback = connectedCallback;
    _CustomElement.prototype.disconnectedCallback = disconnectedCallback;
    _CustomElement.prototype.attributeChangedCallback = attributeChangedCallback;
    define(tag, _CustomElement);
    return _CustomElement;
  }
}

var camelizeRE = /-(\w)/g;
var camelize = function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
};
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = function hyphenate(str) {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
};
function toArray(list) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}

function convertAttributeValue(value, overrideType) {
  if (value === null || value === undefined) {
    return overrideType === Boolean ? false : undefined;
  }

  var propsValue = value;
  var isBoolean = ['true', 'false'].indexOf(value) > -1;
  var valueParsed = parseFloat(propsValue, 10);
  var isNumber = !isNaN(valueParsed) && isFinite(propsValue) && typeof propsValue === 'string' && !propsValue.match(/^0+[^.]\d*$/g);

  if (overrideType && overrideType !== Boolean && _typeof(propsValue) !== overrideType) {
    propsValue = overrideType(value);
  } else if (isBoolean || overrideType === Boolean) {
    propsValue = propsValue === '' ? true : propsValue === 'true' || propsValue === true;
  } else if (isNumber) {
    propsValue = valueParsed;
  }

  return propsValue;
}

function extractProps(collection, props) {
  if (collection && collection.length) {
    collection.forEach(function (prop) {
      var camelCaseProp = camelize(prop);
      props.camelCase.indexOf(camelCaseProp) === -1 && props.camelCase.push(camelCaseProp);
    });
  } else if (collection && _typeof(collection) === 'object') {
    for (var prop in collection) {
      var camelCaseProp = camelize(prop);
      props.camelCase.indexOf(camelCaseProp) === -1 && props.camelCase.push(camelCaseProp);

      if (collection[camelCaseProp] && collection[camelCaseProp].type) {
        props.types[prop] = [].concat(collection[camelCaseProp].type)[0];
      }
    }
  }
}

function getProps() {
  var componentDefinition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = {
    camelCase: [],
    hyphenate: [],
    types: {}
  };

  if (componentDefinition.mixins) {
    componentDefinition.mixins.forEach(function (mixin) {
      extractProps(mixin.props, props);
    });
  }

  if (componentDefinition["extends"] && componentDefinition["extends"].props) {
    var parentProps = componentDefinition["extends"].props;
    extractProps(parentProps, props);
  }

  extractProps(componentDefinition.props, props);
  props.camelCase.forEach(function (prop) {
    props.hyphenate.push(hyphenate(prop));
  });
  return props;
}
function reactiveProps(element, props) {
  props.camelCase.forEach(function (name, index) {
    Object.defineProperty(element, name, {
      get: function get() {
        return this.__vue_custom_element__[name];
      },
      set: function set(value) {
        if ((_typeof(value) === 'object' || typeof value === 'function') && this.__vue_custom_element__) {
          var propName = props.camelCase[index];
          this.__vue_custom_element__[propName] = value;
        } else {
          var type = props.types[props.camelCase[index]];
          this.setAttribute(props.hyphenate[index], convertAttributeValue(value, type));
        }
      },
      configurable: true
    });
  });
}
function getPropsData(element, componentDefinition, props) {
  var propsData = componentDefinition.propsData || {};
  props.hyphenate.forEach(function (name, index) {
    var propCamelCase = props.camelCase[index];
    var propValue = element.attributes[name] || element[propCamelCase];
    var type = null;

    if (props.types[propCamelCase]) {
      type = props.types[propCamelCase];
    }

    if (propValue instanceof Attr) {
      propsData[propCamelCase] = convertAttributeValue(propValue.value, type);
    } else if (typeof propValue !== 'undefined') {
      propsData[propCamelCase] = propValue;
    }
  });
  return propsData;
}

function getAttributes(children) {
  var attributes = {};
  toArray(children.attributes).forEach(function (attribute) {
    attributes[attribute.nodeName === 'vue-slot' ? 'slot' : attribute.nodeName] = attribute.nodeValue;
  });
  return attributes;
}
function getChildNodes(element) {
  if (element.childNodes.length) return element.childNodes;

  if (element.content && element.content.childNodes && element.content.childNodes.length) {
    return element.content.childNodes;
  }

  var placeholder = document.createElement('div');
  placeholder.innerHTML = element.innerHTML;
  return placeholder.childNodes;
}
function templateElement(createElement, element, elementOptions) {
  var templateChildren = getChildNodes(element);
  var vueTemplateChildren = toArray(templateChildren).map(function (child) {
    if (child.nodeName === '#text') return child.nodeValue;
    return createElement(child.tagName, {
      attrs: getAttributes(child),
      domProps: {
        innerHTML: child.innerHTML
      }
    });
  });
  elementOptions.slot = element.id;
  return createElement('template', elementOptions, vueTemplateChildren);
}
function getSlots() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var createElement = arguments.length > 1 ? arguments[1] : undefined;
  var slots = [];
  toArray(children).forEach(function (child) {
    if (child.nodeName === '#text') {
      if (child.nodeValue.trim()) {
        slots.push(createElement('span', child.nodeValue));
      }
    } else if (child.nodeName !== '#comment') {
      var attributes = getAttributes(child);
      var elementOptions = {
        attrs: attributes,
        domProps: {
          innerHTML: child.innerHTML === '' ? child.innerText : child.innerHTML
        }
      };

      if (attributes.slot) {
        elementOptions.slot = attributes.slot;
        attributes.slot = undefined;
      }

      var slotVueElement = child.tagName === 'TEMPLATE' ? templateElement(createElement, child, elementOptions) : createElement(child.tagName, elementOptions);
      slots.push(slotVueElement);
    }
  });
  return slots;
}

function customEvent(eventName, detail) {
  var params = {
    bubbles: false,
    cancelable: false,
    detail: detail
  };
  var event;

  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(eventName, params);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
  }

  return event;
}
function customEmit(element, eventName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var event = customEvent(eventName, [].concat(args));
  element.dispatchEvent(event);
}

function createVueInstance(element, Vue, componentDefinition, props, options) {
  if (!element.__vue_custom_element__) {
    var beforeCreate = function beforeCreate() {
      this.$emit = function emit() {
        var _this$__proto__$$emit;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        customEmit.apply(void 0, [element].concat(args));
        this.__proto__ && (_this$__proto__$$emit = this.__proto__.$emit).call.apply(_this$__proto__$$emit, [this].concat(args));
      };
    };

    var ComponentDefinition = Vue.util.extend({}, componentDefinition);
    var propsData = getPropsData(element, ComponentDefinition, props);
    var vueVersion = Vue.version && parseInt(Vue.version.split('.')[0], 10) || 0;
    ComponentDefinition.beforeCreate = [].concat(ComponentDefinition.beforeCreate || [], beforeCreate);

    if (ComponentDefinition._compiled) {
      var constructorOptions = {};
      var _constructor = ComponentDefinition._Ctor;

      if (_constructor) {
        constructorOptions = Object.keys(_constructor).map(function (key) {
          return _constructor[key];
        })[0].options;
      }

      constructorOptions.beforeCreate = ComponentDefinition.beforeCreate;
    }

    var rootElement;

    if (vueVersion >= 2) {
      var elementOriginalChildren = element.cloneNode(true).childNodes;
      rootElement = {
        propsData: propsData,
        props: props.camelCase,
        computed: {
          reactiveProps: function reactiveProps$$1() {
            var _this = this;

            var reactivePropsList = {};
            props.camelCase.forEach(function (prop) {
              typeof _this[prop] !== 'undefined' && (reactivePropsList[prop] = _this[prop]);
            });
            return reactivePropsList;
          }
        },
        render: function render(createElement) {
          var data = {
            props: this.reactiveProps
          };
          return createElement(ComponentDefinition, data, getSlots(elementOriginalChildren, createElement));
        }
      };
    } else if (vueVersion === 1) {
      rootElement = ComponentDefinition;
      rootElement.propsData = propsData;
    } else {
      rootElement = ComponentDefinition;
      var propsWithDefault = {};
      Object.keys(propsData).forEach(function (prop) {
        propsWithDefault[prop] = {
          "default": propsData[prop]
        };
      });
      rootElement.props = propsWithDefault;
    }

    var elementInnerHtml = vueVersion >= 2 ? '<div></div>' : "<div>".concat(element.innerHTML, "</div>").replace(/vue-slot=/g, 'slot=');

    if (options.shadow && element.shadowRoot) {
      element.shadowRoot.innerHTML = elementInnerHtml;
      rootElement.el = element.shadowRoot.children[0];
    } else {
      element.innerHTML = elementInnerHtml;
      rootElement.el = element.children[0];
    }

    reactiveProps(element, props);

    if (typeof options.beforeCreateVueInstance === 'function') {
      rootElement = options.beforeCreateVueInstance(rootElement) || rootElement;
    }

    element.__vue_custom_element__ = new Vue(rootElement);
    element.__vue_custom_element_props__ = props;

    element.getVueInstance = function () {
      var vueInstance = element.__vue_custom_element__;
      return vueInstance.$children.length ? vueInstance.$children[0] : vueInstance;
    };

    if (options.shadow && options.shadowCss && element.shadowRoot) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(options.shadowCss));
      element.shadowRoot.appendChild(style);
    }

    element.removeAttribute('vce-cloak');
    element.setAttribute('vce-ready', '');
    customEmit(element, 'vce-ready');
  }
}

function install(Vue) {
  Vue.customElement = function vueCustomElement(tag, componentDefinition) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var isAsyncComponent = typeof componentDefinition === 'function';
    var optionsProps = isAsyncComponent && {
      props: options.props || []
    };
    var props = getProps(isAsyncComponent ? optionsProps : componentDefinition);
    var CustomElement = registerCustomElement(tag, {
      constructorCallback: function constructorCallback() {
        typeof options.constructorCallback === 'function' && options.constructorCallback.call(this);
      },
      connectedCallback: function connectedCallback() {
        var _this = this;

        var asyncComponentPromise = isAsyncComponent && componentDefinition();
        var isAsyncComponentPromise = asyncComponentPromise && asyncComponentPromise.then && typeof asyncComponentPromise.then === 'function';
        typeof options.connectedCallback === 'function' && options.connectedCallback.call(this);

        if (isAsyncComponent && !isAsyncComponentPromise) {
          throw new Error("Async component ".concat(tag, " do not returns Promise"));
        }

        if (!this.__detached__) {
          if (isAsyncComponentPromise) {
            asyncComponentPromise.then(function (lazyLoadedComponent) {
              var lazyLoadedComponentProps = getProps(lazyLoadedComponent);
              createVueInstance(_this, Vue, lazyLoadedComponent, lazyLoadedComponentProps, options);
              typeof options.vueInstanceCreatedCallback === 'function' && options.vueInstanceCreatedCallback.call(_this);
            });
          } else {
            createVueInstance(this, Vue, componentDefinition, props, options);
            typeof options.vueInstanceCreatedCallback === 'function' && options.vueInstanceCreatedCallback.call(this);
          }
        }

        this.__detached__ = false;
      },
      disconnectedCallback: function disconnectedCallback() {
        var _this2 = this;

        this.__detached__ = true;
        typeof options.disconnectedCallback === 'function' && options.disconnectedCallback.call(this);
        options.destroyTimeout !== null && setTimeout(function () {
          if (_this2.__detached__ && _this2.__vue_custom_element__) {
            _this2.__detached__ = false;

            _this2.__vue_custom_element__.$destroy(true);

            delete _this2.__vue_custom_element__;
            delete _this2.__vue_custom_element_props__;
          }
        }, options.destroyTimeout || 3000);
      },
      attributeChangedCallback: function attributeChangedCallback(name, oldValue, value) {
        if (this.__vue_custom_element__ && typeof value !== 'undefined') {
          var nameCamelCase = camelize(name);
          typeof options.attributeChangedCallback === 'function' && options.attributeChangedCallback.call(this, name, oldValue, value);
          var type = this.__vue_custom_element_props__.types[nameCamelCase];
          this.__vue_custom_element__[nameCamelCase] = convertAttributeValue(value, type);
        }
      },
      observedAttributes: props.hyphenate,
      shadow: !!options.shadow && !!HTMLElement.prototype.attachShadow,
      "extends": options["extends"]
    });
    return CustomElement;
  };
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);

  if (install.installed) {
    install.installed = false;
  }
}

export default install;
