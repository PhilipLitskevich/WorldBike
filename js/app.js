(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function addTouchClass() {
        if (isMobile.any()) document.documentElement.classList.add("touch");
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
                setTimeout((function() {
                    const loader = document.getElementById("loader");
                    loader.parentNode.removeChild(loader);
                }), 1210);
            }), 1500);
        }));
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        if (spollerTitle.classList.contains("menu-spoller__button")) spollerTitle.parentElement.classList.toggle("_active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    spollerActiveTitle.parentElement.classList.remove("_active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-youtube",
                youtubePlaceAttribute: "data-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: true,
                    goHash: true
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Проснулся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    if (this._dataValue !== "error") {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && e.which == 27 && e.code === "Escape" && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && e.which == 9 && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) this._openToHash();
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") ? true : false;
                if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)) {
                        const codeVideo = this.targetOpen.element.getAttribute(this.options.youtubeAttribute);
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.popupLogging(`Открыл попап`);
                } else this.popupLogging(`Ой ой, такого попапа нет. Проверьте корректность ввода. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрыл попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _openToHash() {
            let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            const buttons = document.querySelector(`[${this.options.attributeOpenButton}="${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton}="${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton}="${classInHash.replace(".", "#")}"]`);
            if (buttons && classInHash) this.open(classInHash);
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && focusedIndex === 0) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    function ssr_window_esm_isObject(obj) {
        return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target, src) {
        if (target === void 0) target = {};
        if (src === void 0) src = {};
        Object.keys(src).forEach((key => {
            if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        }));
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = typeof document !== "undefined" ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if (typeof setTimeout === "undefined") {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if (typeof setTimeout === "undefined") return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = typeof window !== "undefined" ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function utils_classesToTokens(classes) {
        if (classes === void 0) classes = "";
        return classes.trim().split(" ").filter((c => !!c.trim()));
    }
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach((key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        }));
    }
    function utils_nextTick(callback, delay) {
        if (delay === void 0) delay = 0;
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis) {
        if (axis === void 0) axis = "x";
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
            transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
    }
    function isNode(node) {
        if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
        return node && (node.nodeType === 1 || node.nodeType === 11);
    }
    function utils_extend() {
        const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < arguments.length; i += 1) {
            const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll(_ref) {
        let {swiper, targetPosition, side} = _ref;
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (startTime === null) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout((() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                }));
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    function utils_elementChildren(element, selector) {
        if (selector === void 0) selector = "";
        return [ ...element.children ].filter((el => el.matches(selector)));
    }
    function showWarning(text) {
        try {
            console.warn(text);
            return;
        } catch (err) {}
    }
    function utils_createElement(tag, classes) {
        if (classes === void 0) classes = [];
        const el = document.createElement(tag);
        el.classList.add(...Array.isArray(classes) ? classes : utils_classesToTokens(classes));
        return el;
    }
    function elementPrevAll(el, selector) {
        const prevEls = [];
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (prev.matches(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return prevEls;
    }
    function elementNextAll(el, selector) {
        const nextEls = [];
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (next.matches(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return nextEls;
    }
    function elementStyle(el, prop) {
        const window = ssr_window_esm_getWindow();
        return window.getComputedStyle(el, null).getPropertyValue(prop);
    }
    function utils_elementIndex(el) {
        let child = el;
        let i;
        if (child) {
            i = 0;
            while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
            return i;
        }
        return;
    }
    function utils_elementParents(el, selector) {
        const parents = [];
        let parent = el.parentElement;
        while (parent) {
            if (selector) {
                if (parent.matches(selector)) parents.push(parent);
            } else parents.push(parent);
            parent = parent.parentElement;
        }
        return parents;
    }
    function utils_elementTransitionEnd(el, callback) {
        function fireCallBack(e) {
            if (e.target !== el) return;
            callback.call(el, e);
            el.removeEventListener("transitionend", fireCallBack);
        }
        if (callback) el.addEventListener("transitionend", fireCallBack);
    }
    function elementOuterSize(el, size, includeMargins) {
        const window = ssr_window_esm_getWindow();
        if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
        return el.offsetWidth;
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice(_temp) {
        let {userAgent} = _temp === void 0 ? {} : _temp;
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = platform === "Win32";
        let macos = platform === "MacIntel";
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides) {
        if (overrides === void 0) overrides = {};
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        let needPerspectiveFix = false;
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        if (isSafari()) {
            const ua = String(window.navigator.userAgent);
            if (ua.includes("Version/")) {
                const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num => Number(num)));
                needPerspectiveFix = major < 16 || major === 16 && minor < 2;
            }
        }
        return {
            isSafari: needPerspectiveFix || isSafari(),
            needPerspectiveFix,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize(_ref) {
        let {swiper, on, emit} = _ref;
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver((entries => {
                animationFrame = window.requestAnimationFrame((() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((_ref2 => {
                        let {contentBoxSize, contentRect, target} = _ref2;
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
            }));
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", (() => {
            if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        }));
        on("destroy", (() => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        }));
    }
    function Observer(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = function(target, options) {
            if (options === void 0) options = {};
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc((mutations => {
                if (swiper.__preventObserver__) return;
                if (mutations.length === 1) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            }));
            observer.observe(target, {
                attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                childList: typeof options.childList === "undefined" ? true : options.childList,
                characterData: typeof options.characterData === "undefined" ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = utils_elementParents(swiper.hostEl);
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.hostEl, {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.wrapperEl, {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach((observer => {
                observer.disconnect();
            }));
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    var eventsEmitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach((event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            }));
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            function onceHandler() {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach((event => {
                if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                }));
            }));
            return self;
        },
        emit() {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
            if (typeof args[0] === "string" || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach((event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                }));
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                    eventHandler.apply(context, data);
                }));
            }));
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const el = swiper.el;
        if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = el.clientWidth;
        if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = el.clientHeight;
        if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
        width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
        height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {wrapperEl, slidesEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = utils_elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if (typeof swiperSize === "undefined") return;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        swiper.virtualSize = -spaceBetween;
        slides.forEach((slideEl => {
            if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
            slideEl.style.marginBottom = "";
            slideEl.style.marginTop = "";
        }));
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slides); else if (swiper.grid) swiper.grid.unsetSlides();
        let slideSize;
        const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            let slide;
            if (slides[i]) slide = slides[i];
            if (gridEnabled) swiper.grid.updateSlide(i, slide, slides);
            if (slides[i] && elementStyle(slide, "display") === "none") continue;
            if (params.slidesPerView === "auto") {
                if (shouldResetSlideSize) slides[i].style[swiper.getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide);
                const currentTransform = slide.style.transform;
                const currentWebKitTransform = slide.style.webkitTransform;
                if (currentTransform) slide.style.transform = "none";
                if (currentWebKitTransform) slide.style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? elementOuterSize(slide, "width", true) : elementOuterSize(slide, "height", true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide;
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide.style.transform = currentTransform;
                if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slides[i]) slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slides[i]) slides[i].swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
        if (params.setWrapperSize) wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (isVirtual && params.loop) {
            const size = slidesSizesGrid[0] + spaceBetween;
            if (params.slidesPerGroup > 1) {
                const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                const groupSize = size * params.slidesPerGroup;
                for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
            }
            for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                swiper.virtualSize += size;
            }
        }
        if (snapGrid.length === 0) snapGrid = [ 0 ];
        if (spaceBetween !== 0) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
            slides.filter(((_, slideIndex) => {
                if (!params.cssMode || params.loop) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            })).forEach((slideEl => {
                slideEl.style[key] = `${spaceBetween}px`;
            }));
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            const maxSnap = allSlidesSize - swiperSize;
            snapGrid = snapGrid.map((snap => {
                if (snap <= 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            }));
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach((slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            }));
            allSlidesSize -= spaceBetween;
            if (allSlidesSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                snapGrid.forEach(((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                }));
                slidesGrid.forEach(((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                }));
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
            swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        swiper.emit("slidesUpdated");
        if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
            return swiper.slides[index];
        };
        if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide => {
            activeSlides.push(slide);
        })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
    function updateSlidesProgress(translate) {
        if (translate === void 0) translate = this && this.translate || 0;
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (slides.length === 0) return;
        if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass);
        }));
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        let spaceBetween = params.spaceBetween;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
                slides[i].classList.add(params.slideVisibleClass);
            }
            if (isFullyVisible) slides[i].classList.add(params.slideFullyVisibleClass);
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
    }
    function updateProgress(translate) {
        const swiper = this;
        if (typeof translate === "undefined") {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd, progressLoop} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
            const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
            isBeginning = isBeginningRounded || progress <= 0;
            isEnd = isEndRounded || progress >= 1;
            if (isBeginningRounded) progress = 0;
            if (isEndRounded) progress = 1;
        }
        if (params.loop) {
            const firstSlideIndex = swiper.getSlideIndexByData(0);
            const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
            const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
            const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
            const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
            const translateAbs = Math.abs(translate);
            if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
            if (progressLoop > 1) progressLoop -= 1;
        }
        Object.assign(swiper, {
            progress,
            progressLoop,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, slidesEl, activeIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        const getFilteredSlide = selector => utils_elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
        slides.forEach((slideEl => {
            slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
        }));
        let activeSlide;
        let prevSlide;
        let nextSlide;
        if (isVirtual) if (params.loop) {
            let slideIndex = activeIndex - swiper.virtual.slidesBefore;
            if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
            if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
            activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
        } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else if (gridEnabled) {
            activeSlide = slides.filter((slideEl => slideEl.column === activeIndex))[0];
            nextSlide = slides.filter((slideEl => slideEl.column === activeIndex + 1))[0];
            prevSlide = slides.filter((slideEl => slideEl.column === activeIndex - 1))[0];
        } else activeSlide = slides[activeIndex];
        if (activeSlide) {
            activeSlide.classList.add(params.slideActiveClass);
            if (gridEnabled) {
                if (nextSlide) nextSlide.classList.add(params.slideNextClass);
                if (prevSlide) prevSlide.classList.add(params.slidePrevClass);
            } else {
                nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !nextSlide) nextSlide = slides[0];
                if (nextSlide) nextSlide.classList.add(params.slideNextClass);
                prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
                if (prevSlide) prevSlide.classList.add(params.slidePrevClass);
            }
        }
        swiper.emitSlidesClasses();
    }
    const processLazyPreloader = (swiper, imageEl) => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        const slideEl = imageEl.closest(slideSelector());
        if (slideEl) {
            let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`); else requestAnimationFrame((() => {
                if (slideEl.shadowRoot) {
                    lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                    if (lazyEl) lazyEl.remove();
                }
            }));
            if (lazyEl) lazyEl.remove();
        }
    };
    const unlazy = (swiper, index) => {
        if (!swiper.slides[index]) return;
        const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
        if (imageEl) imageEl.removeAttribute("loading");
    };
    const preload = swiper => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        let amount = swiper.params.lazyPreloadPrevNext;
        const len = swiper.slides.length;
        if (!len || !amount || amount < 0) return;
        amount = Math.min(amount, len);
        const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
        const activeIndex = swiper.activeIndex;
        if (swiper.params.grid && swiper.params.grid.rows > 1) {
            const activeColumn = activeIndex;
            const preloadColumns = [ activeColumn - amount ];
            preloadColumns.push(...Array.from({
                length: amount
            }).map(((_, i) => activeColumn + slidesPerView + i)));
            swiper.slides.forEach(((slideEl, i) => {
                if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
            }));
            return;
        }
        const slideIndexLastInView = activeIndex + slidesPerView - 1;
        if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
            const realIndex = (i % len + len) % len;
            if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
        } else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
    };
    function getActiveIndexByTranslate(swiper) {
        const {slidesGrid, params} = swiper;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        let activeIndex;
        for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
        } else if (translate >= slidesGrid[i]) activeIndex = i;
        if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
        return activeIndex;
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        const getVirtualRealIndex = aIndex => {
            let realIndex = aIndex - swiper.virtual.slidesBefore;
            if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
            if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
            return realIndex;
        };
        if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex && !swiper.params.loop) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            return;
        }
        if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
            swiper.realIndex = getVirtualRealIndex(activeIndex);
            return;
        }
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        let realIndex;
        if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (gridEnabled) {
            const firstSlideInColumn = swiper.slides.filter((slideEl => slideEl.column === activeIndex))[0];
            let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
            if (Number.isNaN(activeSlideIndex)) activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
            realIndex = Math.floor(activeSlideIndex / params.grid.rows);
        } else if (swiper.slides[activeIndex]) {
            const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
            if (slideIndex) realIndex = parseInt(slideIndex, 10); else realIndex = activeIndex;
        } else realIndex = activeIndex;
        Object.assign(swiper, {
            previousSnapIndex,
            snapIndex,
            previousRealIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        if (swiper.initialized) preload(swiper);
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) {
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            swiper.emit("slideChange");
        }
    }
    function updateClickedSlide(el, path) {
        const swiper = this;
        const params = swiper.params;
        let slide = el.closest(`.${params.slideClass}, swiper-slide`);
        if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [ ...path.slice(path.indexOf(el) + 1, path.length) ].forEach((pathEl => {
            if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
        }));
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    var update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis) {
        if (axis === void 0) axis = this.isHorizontal() ? "x" : "y";
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate(wrapperEl, axis);
        currentTranslate += swiper.cssOverflowAdjustment();
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) {
            if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment(); else y -= swiper.cssOverflowAdjustment();
            wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        }
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
        if (translate === void 0) translate = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (translateBounds === void 0) translateBounds = true;
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (speed === 0) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    var translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) {
            swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
            swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
        }
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit(_ref) {
        let {swiper, runCallbacks, direction, step} = _ref;
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === "reset") {
                swiper.emit(`slideResetTransition${step}`);
                return;
            }
            swiper.emit(`slideChangeTransition${step}`);
            if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    var transition = {
        setTransition,
        transitionStart,
        transitionEnd
    };
    function slideTo(index, speed, runCallbacks, internal, initial) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") index = parseInt(index, 10);
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(translate * 100);
            const normalizedGrid = Math.floor(slidesGrid[i] * 100);
            const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
            if (typeof slidesGrid[i + 1] !== "undefined") {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if (params.effect !== "slide") swiper.setTranslate(translate);
            if (direction !== "reset") {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (speed === 0) {
                const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                    swiper._cssModeVirtualInitialSet = true;
                    requestAnimationFrame((() => {
                        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    }));
                } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame((() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._immediateVirtual = false;
                }));
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index, speed, runCallbacks, internal) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (typeof index === "string") {
            const indexAsNumber = parseInt(index, 10);
            index = indexAsNumber;
        }
        const swiper = this;
        const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
        let newIndex = index;
        if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else {
            let targetSlideIndex;
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                targetSlideIndex = swiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex))[0].column;
            } else targetSlideIndex = swiper.getSlideIndexByData(newIndex);
            const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
            const {centeredSlides} = swiper.params;
            let slidesPerView = swiper.params.slidesPerView;
            if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
                slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
                if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
            }
            let needLoopFix = cols - targetSlideIndex < slidesPerView;
            if (centeredSlides) needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
            if (needLoopFix) {
                const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
                swiper.loopFix({
                    direction,
                    slideTo: true,
                    activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
                    slideRealIndex: direction === "next" ? swiper.realIndex : void 0
                });
            }
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                newIndex = swiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex))[0].column;
            } else newIndex = swiper.getSlideIndexByData(newIndex);
        }
        requestAnimationFrame((() => {
            swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }));
        return swiper;
    }
    function slideNext(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {enabled, params, animating} = swiper;
        if (!enabled) return swiper;
        let perGroup = params.slidesPerGroup;
        if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "next"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
            if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
                requestAnimationFrame((() => {
                    swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
                }));
                return true;
            }
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
        if (!enabled) return swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "prev"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if (typeof prevSnap === "undefined" && params.cssMode) {
            let prevSnapIndex;
            snapGrid.forEach(((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            }));
            if (typeof prevSnapIndex !== "undefined") prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if (typeof prevSnap !== "undefined") {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
            requestAnimationFrame((() => {
                swiper.slideTo(prevIndex, speed, runCallbacks, internal);
            }));
            return true;
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        const swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed, runCallbacks, internal, threshold) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;
        if (threshold === void 0) threshold = .5;
        const swiper = this;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.clickedIndex;
        let realIndex;
        const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
            if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick((() => {
                    swiper.slideTo(slideToIndex);
                }));
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    var slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate(slideRealIndex) {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        const initSlides = () => {
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            slides.forEach(((el, index) => {
                el.setAttribute("data-swiper-slide-index", index);
            }));
        };
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
        const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
        const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
        const addBlankSlides = amountOfSlides => {
            for (let i = 0; i < amountOfSlides; i += 1) {
                const slideEl = swiper.isElement ? utils_createElement("swiper-slide", [ params.slideBlankClass ]) : utils_createElement("div", [ params.slideClass, params.slideBlankClass ]);
                swiper.slidesEl.append(slideEl);
            }
        };
        if (shouldFillGroup) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else if (shouldFillGrid) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else initSlides();
        swiper.loopFix({
            slideRealIndex,
            direction: params.centeredSlides ? void 0 : "next"
        });
    }
    function loopFix(_temp) {
        let {slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, byController, byMousewheel} = _temp === void 0 ? {} : _temp;
        const swiper = this;
        if (!swiper.params.loop) return;
        swiper.emit("beforeLoopFix");
        const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
        const {centeredSlides} = params;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        if (swiper.virtual && params.virtual.enabled) {
            if (slideTo) if (!params.centeredSlides && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
            return;
        }
        let slidesPerView = params.slidesPerView;
        if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
            slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
            if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
        }
        const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
        let loopedSlides = slidesPerGroup;
        if (loopedSlides % slidesPerGroup !== 0) loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
        loopedSlides += params.loopAdditionalSlides;
        swiper.loopedSlides = loopedSlides;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        if (slides.length < slidesPerView + loopedSlides) showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"); else if (gridEnabled && params.grid.fill === "row") showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
        const prependSlidesIndexes = [];
        const appendSlidesIndexes = [];
        let activeIndex = swiper.activeIndex;
        if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(slides.filter((el => el.classList.contains(params.slideActiveClass)))[0]); else activeIndex = activeSlideIndex;
        const isNext = direction === "next" || !direction;
        const isPrev = direction === "prev" || !direction;
        let slidesPrepended = 0;
        let slidesAppended = 0;
        const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
        const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
        const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate === "undefined" ? -slidesPerView / 2 + .5 : 0);
        if (activeColIndexWithShift < loopedSlides) {
            slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
            for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) {
                    const colIndexToPrepend = cols - index - 1;
                    for (let i = slides.length - 1; i >= 0; i -= 1) if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
                } else prependSlidesIndexes.push(cols - index - 1);
            }
        } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
            slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
            for (let i = 0; i < slidesAppended; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) slides.forEach(((slide, slideIndex) => {
                    if (slide.column === index) appendSlidesIndexes.push(slideIndex);
                })); else appendSlidesIndexes.push(index);
            }
        }
        swiper.__preventObserver__ = true;
        requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
        if (isPrev) prependSlidesIndexes.forEach((index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.prepend(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        }));
        if (isNext) appendSlidesIndexes.forEach((index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.append(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        }));
        swiper.recalcSlides();
        if (params.slidesPerView === "auto") swiper.updateSlides(); else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) swiper.slides.forEach(((slide, slideIndex) => {
            swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
        }));
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
            if (typeof slideRealIndex === "undefined") {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
                    if (setTranslate) {
                        swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                        swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                    }
                }
            } else if (setTranslate) {
                const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
                swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
                swiper.touchEventsData.currentTranslate = swiper.translate;
            }
        } else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
            const diff = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                if (setTranslate) {
                    swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                    swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                }
            }
        } else {
            const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
            swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.controller && swiper.controller.control && !byController) {
            const loopParams = {
                slideRealIndex,
                direction,
                setTranslate,
                activeSlideIndex,
                byController: true
            };
            if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c => {
                if (!c.destroyed && c.params.loop) c.loopFix({
                    ...loopParams,
                    slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
                });
            })); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
                ...loopParams,
                slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
            });
        }
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        swiper.recalcSlides();
        const newSlidesOrder = [];
        swiper.slides.forEach((slideEl => {
            const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
            newSlidesOrder[index] = slideEl;
        }));
        swiper.slides.forEach((slideEl => {
            slideEl.removeAttribute("data-swiper-slide-index");
        }));
        newSlidesOrder.forEach((slideEl => {
            slidesEl.append(slideEl);
        }));
        swiper.recalcSlides();
        swiper.slideTo(swiper.realIndex, 0);
    }
    var loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
        if (swiper.isElement) requestAnimationFrame((() => {
            swiper.__preventObserver__ = false;
        }));
    }
    var grabCursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base) {
        if (base === void 0) base = this;
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function preventEdgeSwipe(swiper, event, startX) {
        const window = ssr_window_esm_getWindow();
        const {params} = swiper;
        const edgeSwipeDetection = params.edgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
            if (edgeSwipeDetection === "prevent") {
                event.preventDefault();
                return true;
            }
            return false;
        }
        return true;
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        const data = swiper.touchEventsData;
        if (e.type === "pointerdown") {
            if (data.pointerId !== null && data.pointerId !== e.pointerId) return;
            data.pointerId = e.pointerId;
        } else if (e.type === "touchstart" && e.targetTouches.length === 1) data.touchId = e.targetTouches[0].identifier;
        if (e.type === "touchstart") {
            preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
            return;
        }
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let targetEl = e.target;
        if (params.touchEventsTarget === "wrapper") if (!swiper.wrapperEl.contains(targetEl)) return;
        if ("which" in e && e.which === 3) return;
        if ("button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
        const eventPath = e.composedPath ? e.composedPath() : e.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
        touches.currentX = e.pageX;
        touches.currentY = e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        if (!preventEdgeSwipe(swiper, e, startX)) return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        let preventDefault = true;
        if (targetEl.matches(data.focusableElements)) {
            preventDefault = false;
            if (targetEl.nodeName === "SELECT") data.isTouched = false;
        }
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) document.activeElement.blur();
        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (e.type === "pointermove") {
            if (data.touchId !== null) return;
            const id = e.pointerId;
            if (id !== data.pointerId) return;
        }
        let targetTouch;
        if (e.type === "touchmove") {
            targetTouch = [ ...e.changedTouches ].filter((t => t.identifier === data.touchId))[0];
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        } else targetTouch = e;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        const pageX = targetTouch.pageX;
        const pageY = targetTouch.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
        if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        touches.previousX = touches.currentX;
        touches.previousY = touches.currentY;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if (typeof data.isScrolling === "undefined") {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        let diff = swiper.isHorizontal() ? diffX : diffY;
        let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
        if (params.oneWayMovement) {
            diff = Math.abs(diff) * (rtl ? 1 : -1);
            touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
        }
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) {
            diff = -diff;
            touchesDiff = -touchesDiff;
        }
        const prevTouchesDirection = swiper.touchesDirection;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
        const isLoop = swiper.params.loop && !params.cssMode;
        const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
        if (!data.isMoved) {
            if (isLoop && allowLoopFix) swiper.loopFix({
                direction: swiper.swipeDirection
            });
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
                const evt = new window.CustomEvent("transitionend", {
                    bubbles: true,
                    cancelable: true
                });
                swiper.wrapperEl.dispatchEvent(evt);
            }
            data.allowMomentumBounce = false;
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        let loopFixed;
        (new Date).getTime();
        if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
            Object.assign(touches, {
                startX: pageX,
                startY: pageY,
                currentX: pageX,
                currentY: pageY,
                startTranslate: data.currentTranslate
            });
            data.loopSwapReset = true;
            data.startTranslate = data.currentTranslate;
            return;
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] : swiper.minTranslate())) swiper.loopFix({
                direction: "prev",
                setTranslate: true,
                activeSlideIndex: 0
            });
            if (data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            }
        } else if (diff < 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] : swiper.maxTranslate())) swiper.loopFix({
                direction: "next",
                setTranslate: true,
                activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
            });
            if (data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let targetTouch;
        const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
        if (!isTouchEvent) {
            if (data.touchId !== null) return;
            if (e.pointerId !== data.pointerId) return;
            targetTouch = e;
        } else {
            targetTouch = [ ...e.changedTouches ].filter((t => t.identifier === data.touchId))[0];
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        }
        if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(e.type)) {
            const proceed = [ "pointercancel", "contextmenu" ].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
            if (!proceed) return;
        }
        data.pointerId = null;
        data.touchId = null;
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick((() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        }));
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (typeof slidesGrid[i + increment] !== "undefined") {
                if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (swipeToLast || currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && el.offsetWidth === 0) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        const isVirtualLoop = isVirtual && params.loop;
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
            clearTimeout(swiper.autoplay.resizeTimeout);
            swiper.autoplay.resizeTimeout = setTimeout((() => {
                if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
            }), 500);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (swiper.translate === 0) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    function onLoad(e) {
        const swiper = this;
        processLazyPreloader(swiper, e.target);
        if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
        swiper.update();
    }
    function onDocumentTouchStart() {
        const swiper = this;
        if (swiper.documentTouchHandlerProceeded) return;
        swiper.documentTouchHandlerProceeded = true;
        if (swiper.params.touchReleaseOnEdges) swiper.el.style.touchAction = "auto";
    }
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, el, wrapperEl, device} = swiper;
        const capture = !!params.nested;
        const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        document[domMethod]("touchstart", swiper.onDocumentTouchStart, {
            passive: false,
            capture
        });
        el[domMethod]("touchstart", swiper.onTouchStart, {
            passive: false
        });
        el[domMethod]("pointerdown", swiper.onTouchStart, {
            passive: false
        });
        document[domMethod]("touchmove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("pointermove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("touchend", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerup", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointercancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("touchcancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerout", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerleave", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("contextmenu", swiper.onTouchEnd, {
            passive: true
        });
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        el[domMethod]("load", swiper.onLoad, {
            capture: true
        });
    };
    function attachEvents() {
        const swiper = this;
        const {params} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        swiper.onLoad = onLoad.bind(swiper);
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    var events$1 = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {realIndex, initialized, params, el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
        const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            el.classList.add(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
            if (typeof breakpointParams[prop] === "undefined") return;
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        }));
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        const wasLoop = params.loop;
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        const hasLoop = swiper.params.loop;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (initialized) if (needsReLoop) {
            swiper.loopDestroy();
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (!wasLoop && hasLoop) {
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (wasLoop && !hasLoop) swiper.loopDestroy();
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base, containerEl) {
        if (base === void 0) base = "window";
        if (!breakpoints || base === "container" && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map((point => {
            if (typeof point === "string" && point.indexOf("@") === 0) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        }));
        points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if (base === "window") {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    var breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach((item => {
            if (typeof item === "object") Object.keys(item).forEach((classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            })); else if (typeof item === "string") resultClasses.push(prefix + item);
        }));
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, el, device} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        el.classList.add(...classNames);
        swiper.emitContainerClasses();
    }
    function swiper_core_removeClasses() {
        const swiper = this;
        const {el, classNames} = swiper;
        el.classList.remove(...classNames);
        swiper.emitContainerClasses();
    }
    var classes = {
        addClasses,
        removeClasses: swiper_core_removeClasses
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = swiper.snapGrid.length === 1;
        if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
        if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    var checkOverflow$1 = {
        checkOverflow
    };
    var defaults = {
        init: true,
        direction: "horizontal",
        oneWayMovement: false,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        eventsPrefix: "swiper",
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loop: false,
        loopAddBlankSlides: true,
        loopAdditionalSlides: 0,
        loopPreventsSliding: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj) {
            if (obj === void 0) obj = {};
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if (typeof moduleParams !== "object" || moduleParams === null) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (params[moduleParamName] === true) params[moduleParamName] = {
                enabled: true
            };
            if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) params[moduleParamName].auto = true;
            if ([ "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) params[moduleParamName].auto = true;
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor,
        events: events$1,
        breakpoints,
        checkOverflow: checkOverflow$1,
        classes
    };
    const extendedDefaults = {};
    class Swiper {
        constructor() {
            let el;
            let params;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            const document = ssr_window_esm_getDocument();
            if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
                const swipers = [];
                document.querySelectorAll(params.el).forEach((containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new Swiper(newParams));
                }));
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach((mod => {
                mod({
                    params,
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            }));
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            }));
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return swiper.params.direction === "horizontal";
                },
                isVertical() {
                    return swiper.params.direction === "vertical";
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                },
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        getDirectionLabel(property) {
            if (this.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        getSlideIndex(slideEl) {
            const {slidesEl, params} = this;
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            const firstSlideIndex = utils_elementIndex(slides[0]);
            return utils_elementIndex(slideEl) - firstSlideIndex;
        }
        getSlideIndexByData(index) {
            return this.getSlideIndex(this.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index))[0]);
        }
        recalcSlides() {
            const swiper = this;
            const {slidesEl, params} = swiper;
            swiper.slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.forEach((slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            }));
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view, exact) {
            if (view === void 0) view = "current";
            if (exact === void 0) exact = false;
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (typeof params.slidesPerView === "number") return params.slidesPerView;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl);
            }));
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
                setTranslate();
                if (params.autoHeight) swiper.updateAutoHeight();
            } else {
                if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
                    const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
                    translated = swiper.slideTo(slides.length - 1, 0, false, true);
                } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate) {
            if (needUpdate === void 0) needUpdate = true;
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
            if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
            swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
            swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.forEach((slideEl => {
                if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
            }));
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
            swiper.rtl = direction === "rtl";
            swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
            if (swiper.rtl) {
                swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(element) {
            const swiper = this;
            if (swiper.mounted) return true;
            let el = element || swiper.params.el;
            if (typeof el === "string") el = document.querySelector(el);
            if (!el) return false;
            el.swiper = swiper;
            if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === "SWIPER-CONTAINER") swiper.isElement = true;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = el.shadowRoot.querySelector(getWrapperSelector());
                    return res;
                }
                return utils_elementChildren(el, getWrapperSelector())[0];
            };
            let wrapperEl = getWrapper();
            if (!wrapperEl && swiper.params.createElements) {
                wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
                el.append(wrapperEl);
                utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl => {
                    wrapperEl.append(slideEl);
                }));
            }
            Object.assign(swiper, {
                el,
                wrapperEl,
                slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
                hostEl: swiper.isElement ? el.parentNode.host : el,
                mounted: true,
                rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
                rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
                wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (mounted === false) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            if (swiper.params.loop) swiper.loopCreate();
            swiper.attachEvents();
            const lazyElements = [ ...swiper.el.querySelectorAll('[loading="lazy"]') ];
            if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
            lazyElements.forEach((imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", (e => {
                    processLazyPreloader(swiper, e.target);
                }));
            }));
            preload(swiper);
            swiper.initialized = true;
            preload(swiper);
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance, cleanStyles) {
            if (deleteInstance === void 0) deleteInstance = true;
            if (cleanStyles === void 0) cleanStyles = true;
            const swiper = this;
            const {params, el, wrapperEl, slides} = swiper;
            if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                el.removeAttribute("style");
                wrapperEl.removeAttribute("style");
                if (slides && slides.length) slides.forEach((slideEl => {
                    slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                    slideEl.removeAttribute("style");
                    slideEl.removeAttribute("data-swiper-slide-index");
                }));
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach((eventName => {
                swiper.off(eventName);
            }));
            if (deleteInstance !== false) {
                swiper.el.swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
            const modules = Swiper.prototype.__modules__;
            if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach((m => Swiper.installModule(m)));
                return Swiper;
            }
            Swiper.installModule(module);
            return Swiper;
        }
    }
    Object.keys(prototypes).forEach((prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }));
    }));
    Swiper.use([ Resize, Observer ]);
    function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
            if (!params[key] && params.auto === true) {
                let element = utils_elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                if (!element) {
                    element = utils_createElement("div", checkProps[key]);
                    element.className = checkProps[key];
                    swiper.el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        }));
        return params;
    }
    function Navigation(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        extendParams({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: false,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        });
        swiper.navigation = {
            nextEl: null,
            prevEl: null
        };
        const makeElementsArray = el => (Array.isArray(el) ? el : [ el ]).filter((e => !!e));
        function getEl(el) {
            let res;
            if (el && typeof el === "string" && swiper.isElement) {
                res = swiper.el.querySelector(el);
                if (res) return res;
            }
            if (el) {
                if (typeof el === "string") res = [ ...document.querySelectorAll(el) ];
                if (swiper.params.uniqueNavElements && typeof el === "string" && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) res = swiper.el.querySelector(el);
            }
            if (el && !res) return el;
            return res;
        }
        function toggleEl(el, disabled) {
            const params = swiper.params.navigation;
            el = makeElementsArray(el);
            el.forEach((subEl => {
                if (subEl) {
                    subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
                    if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                }
            }));
        }
        function update() {
            const {nextEl, prevEl} = swiper.navigation;
            if (swiper.params.loop) {
                toggleEl(prevEl, false);
                toggleEl(nextEl, false);
                return;
            }
            toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
            toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
        }
        function onPrevClick(e) {
            e.preventDefault();
            if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slidePrev();
            emit("navigationPrev");
        }
        function onNextClick(e) {
            e.preventDefault();
            if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
            swiper.slideNext();
            emit("navigationNext");
        }
        function init() {
            const params = swiper.params.navigation;
            swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            });
            if (!(params.nextEl || params.prevEl)) return;
            let nextEl = getEl(params.nextEl);
            let prevEl = getEl(params.prevEl);
            Object.assign(swiper.navigation, {
                nextEl,
                prevEl
            });
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const initButton = (el, dir) => {
                if (el) el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                if (!swiper.enabled && el) el.classList.add(...params.lockClass.split(" "));
            };
            nextEl.forEach((el => initButton(el, "next")));
            prevEl.forEach((el => initButton(el, "prev")));
        }
        function destroy() {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const destroyButton = (el, dir) => {
                el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
            };
            nextEl.forEach((el => destroyButton(el, "next")));
            prevEl.forEach((el => destroyButton(el, "prev")));
        }
        on("init", (() => {
            if (swiper.params.navigation.enabled === false) disable(); else {
                init();
                update();
            }
        }));
        on("toEdge fromEdge lock unlock", (() => {
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            if (swiper.enabled) {
                update();
                return;
            }
            [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.add(swiper.params.navigation.lockClass)));
        }));
        on("click", ((_s, e) => {
            let {nextEl, prevEl} = swiper.navigation;
            nextEl = makeElementsArray(nextEl);
            prevEl = makeElementsArray(prevEl);
            const targetEl = e.target;
            if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
                if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                let isHidden;
                if (nextEl.length) isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass); else if (prevEl.length) isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
                if (isHidden === true) emit("navigationShow"); else emit("navigationHide");
                [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.toggle(swiper.params.navigation.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
            init();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
            destroy();
        };
        Object.assign(swiper.navigation, {
            enable,
            disable,
            update,
            init,
            destroy
        });
    }
    function classes_to_selector_classesToSelector(classes) {
        if (classes === void 0) classes = "";
        return `.${classes.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Pagination(_ref) {
        let {swiper, extendParams, on, emit} = _ref;
        const pfx = "swiper-pagination";
        extendParams({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: false,
                hideOnClick: false,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: false,
                type: "bullets",
                dynamicBullets: false,
                dynamicMainBullets: 1,
                formatFractionCurrent: number => number,
                formatFractionTotal: number => number,
                bulletClass: `${pfx}-bullet`,
                bulletActiveClass: `${pfx}-bullet-active`,
                modifierClass: `${pfx}-`,
                currentClass: `${pfx}-current`,
                totalClass: `${pfx}-total`,
                hiddenClass: `${pfx}-hidden`,
                progressbarFillClass: `${pfx}-progressbar-fill`,
                progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                clickableClass: `${pfx}-clickable`,
                lockClass: `${pfx}-lock`,
                horizontalClass: `${pfx}-horizontal`,
                verticalClass: `${pfx}-vertical`,
                paginationDisabledClass: `${pfx}-disabled`
            }
        });
        swiper.pagination = {
            el: null,
            bullets: []
        };
        let bulletSize;
        let dynamicBulletIndex = 0;
        const makeElementsArray = el => (Array.isArray(el) ? el : [ el ]).filter((e => !!e));
        function isPaginationDisabled() {
            return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
        }
        function setSideBullets(bulletEl, position) {
            const {bulletActiveClass} = swiper.params.pagination;
            if (!bulletEl) return;
            bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
            if (bulletEl) {
                bulletEl.classList.add(`${bulletActiveClass}-${position}`);
                bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
                if (bulletEl) bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
            }
        }
        function onBulletClick(e) {
            const bulletEl = e.target.closest(classes_to_selector_classesToSelector(swiper.params.pagination.bulletClass));
            if (!bulletEl) return;
            e.preventDefault();
            const index = utils_elementIndex(bulletEl) * swiper.params.slidesPerGroup;
            if (swiper.params.loop) {
                if (swiper.realIndex === index) return;
                swiper.slideToLoop(index);
            } else swiper.slideTo(index);
        }
        function update() {
            const rtl = swiper.rtl;
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            el = makeElementsArray(el);
            let current;
            let previousIndex;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) {
                previousIndex = swiper.previousRealIndex || 0;
                current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
            } else if (typeof swiper.snapIndex !== "undefined") {
                current = swiper.snapIndex;
                previousIndex = swiper.previousSnapIndex;
            } else {
                previousIndex = swiper.previousIndex || 0;
                current = swiper.activeIndex || 0;
            }
            if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                const bullets = swiper.pagination.bullets;
                let firstIndex;
                let lastIndex;
                let midIndex;
                if (params.dynamicBullets) {
                    bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
                    el.forEach((subEl => {
                        subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
                    }));
                    if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
                        dynamicBulletIndex += current - (previousIndex || 0);
                        if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                    }
                    firstIndex = Math.max(current - dynamicBulletIndex, 0);
                    lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                    midIndex = (lastIndex + firstIndex) / 2;
                }
                bullets.forEach((bulletEl => {
                    const classesToRemove = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)) ].map((s => typeof s === "string" && s.includes(" ") ? s.split(" ") : s)).flat();
                    bulletEl.classList.remove(...classesToRemove);
                }));
                if (el.length > 1) bullets.forEach((bullet => {
                    const bulletIndex = utils_elementIndex(bullet);
                    if (bulletIndex === current) bullet.classList.add(...params.bulletActiveClass.split(" ")); else if (swiper.isElement) bullet.setAttribute("part", "bullet");
                    if (params.dynamicBullets) {
                        if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        if (bulletIndex === firstIndex) setSideBullets(bullet, "prev");
                        if (bulletIndex === lastIndex) setSideBullets(bullet, "next");
                    }
                })); else {
                    const bullet = bullets[current];
                    if (bullet) bullet.classList.add(...params.bulletActiveClass.split(" "));
                    if (swiper.isElement) bullets.forEach(((bulletEl, bulletIndex) => {
                        bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
                    }));
                    if (params.dynamicBullets) {
                        const firstDisplayedBullet = bullets[firstIndex];
                        const lastDisplayedBullet = bullets[lastIndex];
                        for (let i = firstIndex; i <= lastIndex; i += 1) if (bullets[i]) bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        setSideBullets(firstDisplayedBullet, "prev");
                        setSideBullets(lastDisplayedBullet, "next");
                    }
                }
                if (params.dynamicBullets) {
                    const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                    const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                    const offsetProp = rtl ? "right" : "left";
                    bullets.forEach((bullet => {
                        bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
                    }));
                }
            }
            el.forEach(((subEl, subElIndex) => {
                if (params.type === "fraction") {
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.currentClass)).forEach((fractionEl => {
                        fractionEl.textContent = params.formatFractionCurrent(current + 1);
                    }));
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.totalClass)).forEach((totalEl => {
                        totalEl.textContent = params.formatFractionTotal(total);
                    }));
                }
                if (params.type === "progressbar") {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if (progressbarDirection === "horizontal") scaleX = scale; else scaleY = scale;
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.progressbarFillClass)).forEach((progressEl => {
                        progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
                        progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
                    }));
                }
                if (params.type === "custom" && params.renderCustom) {
                    subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
                    if (subElIndex === 0) emit("paginationRender", subEl);
                } else {
                    if (subElIndex === 0) emit("paginationRender", subEl);
                    emit("paginationUpdate", subEl);
                }
                if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
            }));
        }
        function render() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
            let el = swiper.pagination.el;
            el = makeElementsArray(el);
            let paginationHTML = "";
            if (params.type === "bullets") {
                let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
            }
            if (params.type === "fraction") if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
            if (params.type === "progressbar") if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
            swiper.pagination.bullets = [];
            el.forEach((subEl => {
                if (params.type !== "custom") subEl.innerHTML = paginationHTML || "";
                if (params.type === "bullets") swiper.pagination.bullets.push(...subEl.querySelectorAll(classes_to_selector_classesToSelector(params.bulletClass)));
            }));
            if (params.type !== "custom") emit("paginationRender", el[0]);
        }
        function init() {
            swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                el: "swiper-pagination"
            });
            const params = swiper.params.pagination;
            if (!params.el) return;
            let el;
            if (typeof params.el === "string" && swiper.isElement) el = swiper.el.querySelector(params.el);
            if (!el && typeof params.el === "string") el = [ ...document.querySelectorAll(params.el) ];
            if (!el) el = params.el;
            if (!el || el.length === 0) return;
            if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
                el = [ ...swiper.el.querySelectorAll(params.el) ];
                if (el.length > 1) el = el.filter((subEl => {
                    if (utils_elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
                    return true;
                }))[0];
            }
            if (Array.isArray(el) && el.length === 1) el = el[0];
            Object.assign(swiper.pagination, {
                el
            });
            el = makeElementsArray(el);
            el.forEach((subEl => {
                if (params.type === "bullets" && params.clickable) subEl.classList.add(...(params.clickableClass || "").split(" "));
                subEl.classList.add(params.modifierClass + params.type);
                subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (params.type === "bullets" && params.dynamicBullets) {
                    subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if (params.type === "progressbar" && params.progressbarOpposite) subEl.classList.add(params.progressbarOppositeClass);
                if (params.clickable) subEl.addEventListener("click", onBulletClick);
                if (!swiper.enabled) subEl.classList.add(params.lockClass);
            }));
        }
        function destroy() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => {
                    subEl.classList.remove(params.hiddenClass);
                    subEl.classList.remove(params.modifierClass + params.type);
                    subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                    if (params.clickable) {
                        subEl.classList.remove(...(params.clickableClass || "").split(" "));
                        subEl.removeEventListener("click", onBulletClick);
                    }
                }));
            }
            if (swiper.pagination.bullets) swiper.pagination.bullets.forEach((subEl => subEl.classList.remove(...params.bulletActiveClass.split(" "))));
        }
        on("changeDirection", (() => {
            if (!swiper.pagination || !swiper.pagination.el) return;
            const params = swiper.params.pagination;
            let {el} = swiper.pagination;
            el = makeElementsArray(el);
            el.forEach((subEl => {
                subEl.classList.remove(params.horizontalClass, params.verticalClass);
                subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            }));
        }));
        on("init", (() => {
            if (swiper.params.pagination.enabled === false) disable(); else {
                init();
                render();
                update();
            }
        }));
        on("activeIndexChange", (() => {
            if (typeof swiper.snapIndex === "undefined") update();
        }));
        on("snapIndexChange", (() => {
            update();
        }));
        on("snapGridLengthChange", (() => {
            render();
            update();
        }));
        on("destroy", (() => {
            destroy();
        }));
        on("enable disable", (() => {
            let {el} = swiper.pagination;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass)));
            }
        }));
        on("lock unlock", (() => {
            update();
        }));
        on("click", ((_s, e) => {
            const targetEl = e.target;
            const el = makeElementsArray(swiper.pagination.el);
            if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
                if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
                if (isHidden === true) emit("paginationShow"); else emit("paginationHide");
                el.forEach((subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass)));
            }
        }));
        const enable = () => {
            swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass)));
            }
            init();
            render();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = makeElementsArray(el);
                el.forEach((subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass)));
            }
            destroy();
        };
        Object.assign(swiper.pagination, {
            enable,
            disable,
            render,
            update,
            init,
            destroy
        });
    }
    function Controller(_ref) {
        let {swiper, extendParams, on} = _ref;
        extendParams({
            controller: {
                control: void 0,
                inverse: false,
                by: "slide"
            }
        });
        swiper.controller = {
            control: void 0
        };
        function LinearSpline(x, y) {
            const binarySearch = function search() {
                let maxIndex;
                let minIndex;
                let guess;
                return (array, val) => {
                    minIndex = -1;
                    maxIndex = array.length;
                    while (maxIndex - minIndex > 1) {
                        guess = maxIndex + minIndex >> 1;
                        if (array[guess] <= val) minIndex = guess; else maxIndex = guess;
                    }
                    return maxIndex;
                };
            }();
            this.x = x;
            this.y = y;
            this.lastIndex = x.length - 1;
            let i1;
            let i3;
            this.interpolate = function interpolate(x2) {
                if (!x2) return 0;
                i3 = binarySearch(this.x, x2);
                i1 = i3 - 1;
                return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
            };
            return this;
        }
        function getInterpolateFunction(c) {
            swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
        }
        function setTranslate(_t, byController) {
            const controlled = swiper.controller.control;
            let multiplier;
            let controlledTranslate;
            const Swiper = swiper.constructor;
            function setControlledTranslate(c) {
                if (c.destroyed) return;
                const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
                if (swiper.params.controller.by === "slide") {
                    getInterpolateFunction(c);
                    controlledTranslate = -swiper.controller.spline.interpolate(-translate);
                }
                if (!controlledTranslate || swiper.params.controller.by === "container") {
                    multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
                    if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) multiplier = 1;
                    controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
                }
                if (swiper.params.controller.inverse) controlledTranslate = c.maxTranslate() - controlledTranslate;
                c.updateProgress(controlledTranslate);
                c.setTranslate(controlledTranslate, swiper);
                c.updateActiveIndex();
                c.updateSlidesClasses();
            }
            if (Array.isArray(controlled)) {
                for (let i = 0; i < controlled.length; i += 1) if (controlled[i] !== byController && controlled[i] instanceof Swiper) setControlledTranslate(controlled[i]);
            } else if (controlled instanceof Swiper && byController !== controlled) setControlledTranslate(controlled);
        }
        function setTransition(duration, byController) {
            const Swiper = swiper.constructor;
            const controlled = swiper.controller.control;
            let i;
            function setControlledTransition(c) {
                if (c.destroyed) return;
                c.setTransition(duration, swiper);
                if (duration !== 0) {
                    c.transitionStart();
                    if (c.params.autoHeight) utils_nextTick((() => {
                        c.updateAutoHeight();
                    }));
                    utils_elementTransitionEnd(c.wrapperEl, (() => {
                        if (!controlled) return;
                        c.transitionEnd();
                    }));
                }
            }
            if (Array.isArray(controlled)) {
                for (i = 0; i < controlled.length; i += 1) if (controlled[i] !== byController && controlled[i] instanceof Swiper) setControlledTransition(controlled[i]);
            } else if (controlled instanceof Swiper && byController !== controlled) setControlledTransition(controlled);
        }
        function removeSpline() {
            if (!swiper.controller.control) return;
            if (swiper.controller.spline) {
                swiper.controller.spline = void 0;
                delete swiper.controller.spline;
            }
        }
        on("beforeInit", (() => {
            if (typeof window !== "undefined" && (typeof swiper.params.controller.control === "string" || swiper.params.controller.control instanceof HTMLElement)) {
                const controlElement = document.querySelector(swiper.params.controller.control);
                if (controlElement && controlElement.swiper) swiper.controller.control = controlElement.swiper; else if (controlElement) {
                    const onControllerSwiper = e => {
                        swiper.controller.control = e.detail[0];
                        swiper.update();
                        controlElement.removeEventListener("init", onControllerSwiper);
                    };
                    controlElement.addEventListener("init", onControllerSwiper);
                }
                return;
            }
            swiper.controller.control = swiper.params.controller.control;
        }));
        on("update", (() => {
            removeSpline();
        }));
        on("resize", (() => {
            removeSpline();
        }));
        on("observerUpdate", (() => {
            removeSpline();
        }));
        on("setTranslate", ((_s, translate, byController) => {
            if (!swiper.controller.control || swiper.controller.control.destroyed) return;
            swiper.controller.setTranslate(translate, byController);
        }));
        on("setTransition", ((_s, duration, byController) => {
            if (!swiper.controller.control || swiper.controller.control.destroyed) return;
            swiper.controller.setTransition(duration, byController);
        }));
        Object.assign(swiper.controller, {
            setTranslate,
            setTransition
        });
    }
    function Autoplay(_ref) {
        let {swiper, extendParams, on, emit, params} = _ref;
        swiper.autoplay = {
            running: false,
            paused: false,
            timeLeft: 0
        };
        extendParams({
            autoplay: {
                enabled: false,
                delay: 3e3,
                waitForTransition: true,
                disableOnInteraction: false,
                stopOnLastSlide: false,
                reverseDirection: false,
                pauseOnMouseEnter: false
            }
        });
        let timeout;
        let raf;
        let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
        let autoplayTimeLeft;
        let autoplayStartTime = (new Date).getTime();
        let wasPaused;
        let isTouched;
        let pausedByTouch;
        let touchStartTimeout;
        let slideChanged;
        let pausedByInteraction;
        let pausedByPointerEnter;
        function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
            if (e.target !== swiper.wrapperEl) return;
            swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
            if (pausedByPointerEnter) return;
            resume();
        }
        const calcTimeLeft = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.autoplay.paused) wasPaused = true; else if (wasPaused) {
                autoplayDelayCurrent = autoplayTimeLeft;
                wasPaused = false;
            }
            const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (new Date).getTime();
            swiper.autoplay.timeLeft = timeLeft;
            emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
            raf = requestAnimationFrame((() => {
                calcTimeLeft();
            }));
        };
        const getSlideDelay = () => {
            let activeSlideEl;
            if (swiper.virtual && swiper.params.virtual.enabled) activeSlideEl = swiper.slides.filter((slideEl => slideEl.classList.contains("swiper-slide-active")))[0]; else activeSlideEl = swiper.slides[swiper.activeIndex];
            if (!activeSlideEl) return;
            const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
            return currentSlideDelay;
        };
        const run = delayForce => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            cancelAnimationFrame(raf);
            calcTimeLeft();
            let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
            autoplayDelayTotal = swiper.params.autoplay.delay;
            autoplayDelayCurrent = swiper.params.autoplay.delay;
            const currentSlideDelay = getSlideDelay();
            if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
                delay = currentSlideDelay;
                autoplayDelayTotal = currentSlideDelay;
                autoplayDelayCurrent = currentSlideDelay;
            }
            autoplayTimeLeft = delay;
            const speed = swiper.params.speed;
            const proceed = () => {
                if (!swiper || swiper.destroyed) return;
                if (swiper.params.autoplay.reverseDirection) {
                    if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
                        swiper.slidePrev(speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        swiper.slideTo(swiper.slides.length - 1, speed, true, true);
                        emit("autoplay");
                    }
                } else if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
                    swiper.slideNext(speed, true, true);
                    emit("autoplay");
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    swiper.slideTo(0, speed, true, true);
                    emit("autoplay");
                }
                if (swiper.params.cssMode) {
                    autoplayStartTime = (new Date).getTime();
                    requestAnimationFrame((() => {
                        run();
                    }));
                }
            };
            if (delay > 0) {
                clearTimeout(timeout);
                timeout = setTimeout((() => {
                    proceed();
                }), delay);
            } else requestAnimationFrame((() => {
                proceed();
            }));
            return delay;
        };
        const start = () => {
            autoplayStartTime = (new Date).getTime();
            swiper.autoplay.running = true;
            run();
            emit("autoplayStart");
        };
        const stop = () => {
            swiper.autoplay.running = false;
            clearTimeout(timeout);
            cancelAnimationFrame(raf);
            emit("autoplayStop");
        };
        const pause = (internal, reset) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            clearTimeout(timeout);
            if (!internal) pausedByInteraction = true;
            const proceed = () => {
                emit("autoplayPause");
                if (swiper.params.autoplay.waitForTransition) swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd); else resume();
            };
            swiper.autoplay.paused = true;
            if (reset) {
                if (slideChanged) autoplayTimeLeft = swiper.params.autoplay.delay;
                slideChanged = false;
                proceed();
                return;
            }
            const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
            autoplayTimeLeft = delay - ((new Date).getTime() - autoplayStartTime);
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
            if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
            proceed();
        };
        const resume = () => {
            if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
            autoplayStartTime = (new Date).getTime();
            if (pausedByInteraction) {
                pausedByInteraction = false;
                run(autoplayTimeLeft);
            } else run();
            swiper.autoplay.paused = false;
            emit("autoplayResume");
        };
        const onVisibilityChange = () => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            const document = ssr_window_esm_getDocument();
            if (document.visibilityState === "hidden") {
                pausedByInteraction = true;
                pause(true);
            }
            if (document.visibilityState === "visible") resume();
        };
        const onPointerEnter = e => {
            if (e.pointerType !== "mouse") return;
            pausedByInteraction = true;
            pausedByPointerEnter = true;
            if (swiper.animating || swiper.autoplay.paused) return;
            pause(true);
        };
        const onPointerLeave = e => {
            if (e.pointerType !== "mouse") return;
            pausedByPointerEnter = false;
            if (swiper.autoplay.paused) resume();
        };
        const attachMouseEvents = () => {
            if (swiper.params.autoplay.pauseOnMouseEnter) {
                swiper.el.addEventListener("pointerenter", onPointerEnter);
                swiper.el.addEventListener("pointerleave", onPointerLeave);
            }
        };
        const detachMouseEvents = () => {
            swiper.el.removeEventListener("pointerenter", onPointerEnter);
            swiper.el.removeEventListener("pointerleave", onPointerLeave);
        };
        const attachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.addEventListener("visibilitychange", onVisibilityChange);
        };
        const detachDocumentEvents = () => {
            const document = ssr_window_esm_getDocument();
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
        on("init", (() => {
            if (swiper.params.autoplay.enabled) {
                attachMouseEvents();
                attachDocumentEvents();
                start();
            }
        }));
        on("destroy", (() => {
            detachMouseEvents();
            detachDocumentEvents();
            if (swiper.autoplay.running) stop();
        }));
        on("_freeModeStaticRelease", (() => {
            if (pausedByTouch || pausedByInteraction) resume();
        }));
        on("_freeModeNoMomentumRelease", (() => {
            if (!swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("beforeTransitionStart", ((_s, speed, internal) => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (internal || !swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
        }));
        on("sliderFirstMove", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            if (swiper.params.autoplay.disableOnInteraction) {
                stop();
                return;
            }
            isTouched = true;
            pausedByTouch = false;
            pausedByInteraction = false;
            touchStartTimeout = setTimeout((() => {
                pausedByInteraction = true;
                pausedByTouch = true;
                pause(true);
            }), 200);
        }));
        on("touchEnd", (() => {
            if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
            clearTimeout(touchStartTimeout);
            clearTimeout(timeout);
            if (swiper.params.autoplay.disableOnInteraction) {
                pausedByTouch = false;
                isTouched = false;
                return;
            }
            if (pausedByTouch && swiper.params.cssMode) resume();
            pausedByTouch = false;
            isTouched = false;
        }));
        on("slideChange", (() => {
            if (swiper.destroyed || !swiper.autoplay.running) return;
            slideChanged = true;
        }));
        Object.assign(swiper.autoplay, {
            start,
            stop,
            pause,
            resume
        });
    }
    function freeMode(_ref) {
        let {swiper, extendParams, emit, once} = _ref;
        extendParams({
            freeMode: {
                enabled: false,
                momentum: true,
                momentumRatio: 1,
                momentumBounce: true,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: false,
                minimumVelocity: .02
            }
        });
        function onTouchStart() {
            if (swiper.params.cssMode) return;
            const translate = swiper.getTranslate();
            swiper.setTranslate(translate);
            swiper.setTransition(0);
            swiper.touchEventsData.velocities.length = 0;
            swiper.freeMode.onTouchEnd({
                currentPos: swiper.rtl ? swiper.translate : -swiper.translate
            });
        }
        function onTouchMove() {
            if (swiper.params.cssMode) return;
            const {touchEventsData: data, touches} = swiper;
            if (data.velocities.length === 0) data.velocities.push({
                position: touches[swiper.isHorizontal() ? "startX" : "startY"],
                time: data.touchStartTime
            });
            data.velocities.push({
                position: touches[swiper.isHorizontal() ? "currentX" : "currentY"],
                time: utils_now()
            });
        }
        function onTouchEnd(_ref2) {
            let {currentPos} = _ref2;
            if (swiper.params.cssMode) return;
            const {params, wrapperEl, rtlTranslate: rtl, snapGrid, touchEventsData: data} = swiper;
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (currentPos < -swiper.minTranslate()) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (currentPos > -swiper.maxTranslate()) {
                if (swiper.slides.length < snapGrid.length) swiper.slideTo(snapGrid.length - 1); else swiper.slideTo(swiper.slides.length - 1);
                return;
            }
            if (params.freeMode.momentum) {
                if (data.velocities.length > 1) {
                    const lastMoveEvent = data.velocities.pop();
                    const velocityEvent = data.velocities.pop();
                    const distance = lastMoveEvent.position - velocityEvent.position;
                    const time = lastMoveEvent.time - velocityEvent.time;
                    swiper.velocity = distance / time;
                    swiper.velocity /= 2;
                    if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) swiper.velocity = 0;
                    if (time > 150 || utils_now() - lastMoveEvent.time > 300) swiper.velocity = 0;
                } else swiper.velocity = 0;
                swiper.velocity *= params.freeMode.momentumVelocityRatio;
                data.velocities.length = 0;
                let momentumDuration = 1e3 * params.freeMode.momentumRatio;
                const momentumDistance = swiper.velocity * momentumDuration;
                let newPosition = swiper.translate + momentumDistance;
                if (rtl) newPosition = -newPosition;
                let doBounce = false;
                let afterBouncePosition;
                const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
                let needsLoopFix;
                if (newPosition < swiper.maxTranslate()) {
                    if (params.freeMode.momentumBounce) {
                        if (newPosition + swiper.maxTranslate() < -bounceAmount) newPosition = swiper.maxTranslate() - bounceAmount;
                        afterBouncePosition = swiper.maxTranslate();
                        doBounce = true;
                        data.allowMomentumBounce = true;
                    } else newPosition = swiper.maxTranslate();
                    if (params.loop && params.centeredSlides) needsLoopFix = true;
                } else if (newPosition > swiper.minTranslate()) {
                    if (params.freeMode.momentumBounce) {
                        if (newPosition - swiper.minTranslate() > bounceAmount) newPosition = swiper.minTranslate() + bounceAmount;
                        afterBouncePosition = swiper.minTranslate();
                        doBounce = true;
                        data.allowMomentumBounce = true;
                    } else newPosition = swiper.minTranslate();
                    if (params.loop && params.centeredSlides) needsLoopFix = true;
                } else if (params.freeMode.sticky) {
                    let nextSlide;
                    for (let j = 0; j < snapGrid.length; j += 1) if (snapGrid[j] > -newPosition) {
                        nextSlide = j;
                        break;
                    }
                    if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === "next") newPosition = snapGrid[nextSlide]; else newPosition = snapGrid[nextSlide - 1];
                    newPosition = -newPosition;
                }
                if (needsLoopFix) once("transitionEnd", (() => {
                    swiper.loopFix();
                }));
                if (swiper.velocity !== 0) {
                    if (rtl) momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity); else momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
                    if (params.freeMode.sticky) {
                        const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
                        const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
                        if (moveDistance < currentSlideSize) momentumDuration = params.speed; else if (moveDistance < 2 * currentSlideSize) momentumDuration = params.speed * 1.5; else momentumDuration = params.speed * 2.5;
                    }
                } else if (params.freeMode.sticky) {
                    swiper.slideToClosest();
                    return;
                }
                if (params.freeMode.momentumBounce && doBounce) {
                    swiper.updateProgress(afterBouncePosition);
                    swiper.setTransition(momentumDuration);
                    swiper.setTranslate(newPosition);
                    swiper.transitionStart(true, swiper.swipeDirection);
                    swiper.animating = true;
                    utils_elementTransitionEnd(wrapperEl, (() => {
                        if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
                        emit("momentumBounce");
                        swiper.setTransition(params.speed);
                        setTimeout((() => {
                            swiper.setTranslate(afterBouncePosition);
                            utils_elementTransitionEnd(wrapperEl, (() => {
                                if (!swiper || swiper.destroyed) return;
                                swiper.transitionEnd();
                            }));
                        }), 0);
                    }));
                } else if (swiper.velocity) {
                    emit("_freeModeNoMomentumRelease");
                    swiper.updateProgress(newPosition);
                    swiper.setTransition(momentumDuration);
                    swiper.setTranslate(newPosition);
                    swiper.transitionStart(true, swiper.swipeDirection);
                    if (!swiper.animating) {
                        swiper.animating = true;
                        utils_elementTransitionEnd(wrapperEl, (() => {
                            if (!swiper || swiper.destroyed) return;
                            swiper.transitionEnd();
                        }));
                    }
                } else swiper.updateProgress(newPosition);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            } else if (params.freeMode.sticky) {
                swiper.slideToClosest();
                return;
            } else if (params.freeMode) emit("_freeModeNoMomentumRelease");
            if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
                emit("_freeModeStaticRelease");
                swiper.updateProgress();
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
        }
        Object.assign(swiper, {
            freeMode: {
                onTouchStart,
                onTouchMove,
                onTouchEnd
            }
        });
    }
    let mainSlider;
    let secondSliderPar = {
        slider: void 0,
        breakpoint: window.matchMedia("(max-width: 479.98px)"),
        selector: ".hero-banner__slider_second",
        init: false
    };
    let thirdSliderPar = {
        slider: void 0,
        breakpoint: window.matchMedia("(max-width: 766.98px)"),
        selector: ".hero-banner__slider_third",
        init: false
    };
    const breakpointChecker = function(sliderPar) {
        if (sliderPar.breakpoint.matches === true) {
            if (sliderPar.init) {
                sliderPar.slider.disable();
                sliderPar.init = false;
            }
            return sliderPar;
        } else if (sliderPar.breakpoint.matches === false) createSlider(sliderPar);
    };
    function initSliders() {
        if (document.querySelector(".hero-banner__slider_main")) {
            shiftChildrenOrder(".hero-banner__slider_main", secondSliderPar.selector, "hero-banner__text");
            shiftChildrenOrder(secondSliderPar.selector, thirdSliderPar.selector, "hero-banner__text");
            mainSlider = new Swiper(".hero-banner__slider_main", {
                modules: [ Pagination, Autoplay, Controller ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                speed: 1500,
                loop: true,
                freeMode: {
                    enabled: false
                },
                autoplay: {
                    delay: 4e3,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                pagination: {
                    el: ".hero-banner__slider-paginations",
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1.4,
                        allowTouchMove: true
                    },
                    479.98: {
                        slidesPerView: 1,
                        allowTouchMove: false
                    }
                }
            });
        }
        if (document.querySelector(".offers-slider")) new Swiper(".offers-slider", {
            modules: [ Navigation ],
            observer: true,
            observeParents: true,
            autoHeight: false,
            speed: 800,
            freeMode: {
                enabled: false
            },
            navigation: {
                nextEl: ".offers__button-next",
                prevEl: ".offers__button-prev"
            },
            a11y: {
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide"
            },
            slidesPerView: 3,
            spaceBetween: 40,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    centeredSlides: true
                },
                650: {
                    slidesPerView: 2,
                    centeredSlides: false
                },
                991.98: {
                    slidesPerView: 3
                }
            }
        });
        if (document.querySelector(".articles-slider")) new Swiper(".articles-slider", {
            modules: [],
            observer: true,
            observeParents: true,
            autoHeight: false,
            speed: 800,
            freeMode: {
                enabled: false
            },
            spaceBetween: 40,
            breakpoints: {
                320: {
                    slidesPerView: 1.3,
                    spaceBetween: 8
                },
                650: {
                    slidesPerView: 2.3,
                    centeredSlides: false,
                    spaceBetween: 20
                },
                991.98: {
                    slidesPerView: 3.3,
                    spaceBetween: 40
                },
                1280: {
                    slidesPerView: 3.6
                },
                1800: {
                    slidesPerView: 4.6
                }
            }
        });
        copyChildrenAndAddClasses(".mountains__container_grid", ".mountains__wrapper", [ "mountains__slide", "swiper-slide" ]);
        if (document.querySelector(".mountains-slider")) new Swiper(".mountains-slider", {
            modules: [ freeMode ],
            observer: true,
            observeParents: true,
            autoHeight: false,
            speed: 800,
            freeMode: {
                enabled: true,
                sticky: true,
                momentumVelocityRatio: .4
            },
            spaceBetween: 40,
            breakpoints: {
                320: {
                    slidesPerView: 1.05,
                    spaceBetween: 16
                },
                450: {
                    slidesPerView: 1.15
                },
                635: {
                    slidesPerView: 1.4,
                    spaceBetween: 25
                }
            }
        });
        copyChildrenAndAddClasses(".advantages__body", ".advantages-slide__wrapper", [ "advantages__slide", "swiper-slide" ]);
        if (document.querySelector(".advantages-slider")) new Swiper(".advantages-slider", {
            modules: [ freeMode ],
            observer: true,
            observeParents: true,
            autoHeight: false,
            speed: 800,
            freeMode: {
                enabled: true,
                sticky: true,
                momentumVelocityRatio: .4
            },
            spaceBetween: 40,
            breakpoints: {
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 16
                },
                450: {
                    slidesPerView: 1.35
                },
                635: {
                    slidesPerView: 1.5,
                    spaceBetween: 25
                }
            }
        });
    }
    window.addEventListener("load", (function(e) {
        initSliders();
        secondSliderPar.breakpoint.addEventListener("change", (() => {
            breakpointChecker(secondSliderPar);
        }));
        thirdSliderPar.breakpoint.addEventListener("change", (() => {
            breakpointChecker(thirdSliderPar);
        }));
        breakpointChecker(secondSliderPar);
        breakpointChecker(thirdSliderPar);
    }));
    function createSlider(sliderPar) {
        sliderPar.slider = new Swiper(sliderPar.selector, {
            modules: [ Controller ],
            allowTouchMove: false,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: true,
            loop: true,
            freeMode: {
                enabled: false
            }
        });
        sliderPar.init = true;
        if (mainSlider && secondSliderPar.init && thirdSliderPar.init) mainSlider.controller.control = [ secondSliderPar.slider, thirdSliderPar.slider ]; else if (mainSlider && secondSliderPar.init) mainSlider.controller.control = [ secondSliderPar.slider ]; else if (mainSlider && thirdSliderPar.init) mainSlider.controller.control = [ thirdSliderPar.slider ];
        if (mainSlider && secondSliderPar.init) secondSliderPar.slider.controller.control = [ mainSlider ];
        if (mainSlider && thirdSliderPar.init) thirdSliderPar.slider.controller.control = [ mainSlider ];
    }
    function copyChildrenAndAddClasses(donorClass, acceptorClass, classNames = [ "slider-name__slide", "swiper-slide" ]) {
        const donor = document.querySelector(donorClass);
        const acceptor = document.querySelector(acceptorClass);
        if (donor && acceptor) [ ...donor.children ].forEach((child => {
            const clonedChild = child.cloneNode(true);
            clonedChild.classList.add(...classNames);
            acceptor.appendChild(clonedChild);
        }));
    }
    function shiftChildrenOrder(sourceSelector, targetSelector, className) {
        const sourceElement = document.querySelector(sourceSelector);
        const targetElement = document.querySelector(targetSelector).querySelector(".swiper-wrapper");
        if (sourceElement && targetElement) {
            const children = [ ...sourceElement.getElementsByClassName(className) ];
            const clonedChildren = children.map((child => child.cloneNode(true)));
            targetElement.textContent = "";
            const firstElement = clonedChildren.shift();
            clonedChildren.push(firstElement);
            clonedChildren.forEach((child => {
                if (!child.classList.contains("hero-banner__slide")) child.classList.add("hero-banner__slide");
                if (!child.classList.contains("swiper-slide")) child.classList.add("swiper-slide");
                targetElement.appendChild(child);
            }));
        }
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function DynamicAdapt(type) {
        this.type = type;
    }
    DynamicAdapt.prototype.init = function() {
        const _this = this;
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
        this.arraySort(this.оbjects);
        this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
            return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }), this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        }));
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ",");
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                return item.breakpoint === mediaBreakpoint;
            }));
            matchMedia.addListener((function() {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            }));
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
        if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        } else for (let i = оbjects.length - 1; i >= 0; i--) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
    };
    DynamicAdapt.prototype.moveTo = function(place, element, destination) {
        element.classList.add(this.daClassname);
        if (place === "last" || place >= destination.children.length) {
            destination.insertAdjacentElement("beforeend", element);
            return;
        }
        if (place === "first") {
            destination.insertAdjacentElement("afterbegin", element);
            return;
        }
        destination.children[place].insertAdjacentElement("beforebegin", element);
    };
    DynamicAdapt.prototype.moveBack = function(parent, element, index) {
        element.classList.remove(this.daClassname);
        if (parent.children[index] !== void 0) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
    };
    DynamicAdapt.prototype.indexInParent = function(parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    DynamicAdapt.prototype.arraySort = function(arr) {
        if (this.type === "min") Array.prototype.sort.call(arr, (function(a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) return 0;
                if (a.place === "first" || b.place === "last") return -1;
                if (a.place === "last" || b.place === "first") return 1;
                return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
        })); else {
            Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return 1;
                    if (a.place === "last" || b.place === "first") return -1;
                    return b.place - a.place;
                }
                return b.breakpoint - a.breakpoint;
            }));
            return;
        }
    };
    const da = new DynamicAdapt("max");
    da.init();
    const map_customization_namespaceObject = JSON.parse('[{"tags":"country","elements":"geometry.fill","stylers":[{"color":"#757a75"},{"opacity":0.8,"zoom":0},{"opacity":0.8,"zoom":1},{"opacity":0.8,"zoom":2},{"opacity":0.8,"zoom":3},{"opacity":0.8,"zoom":4},{"opacity":1,"zoom":5},{"opacity":1,"zoom":6},{"opacity":1,"zoom":7},{"opacity":1,"zoom":8},{"opacity":1,"zoom":9},{"opacity":1,"zoom":10},{"opacity":1,"zoom":11},{"opacity":1,"zoom":12},{"opacity":1,"zoom":13},{"opacity":1,"zoom":14},{"opacity":1,"zoom":15},{"opacity":1,"zoom":16},{"opacity":1,"zoom":17},{"opacity":1,"zoom":18},{"opacity":1,"zoom":19},{"opacity":1,"zoom":20},{"opacity":1,"zoom":21}]},{"tags":"country","elements":"geometry.outline","stylers":[{"color":"#494b49"},{"opacity":0.15,"zoom":0},{"opacity":0.15,"zoom":1},{"opacity":0.15,"zoom":2},{"opacity":0.15,"zoom":3},{"opacity":0.15,"zoom":4},{"opacity":0.15,"zoom":5},{"opacity":0.25,"zoom":6},{"opacity":0.5,"zoom":7},{"opacity":0.47,"zoom":8},{"opacity":0.44,"zoom":9},{"opacity":0.41,"zoom":10},{"opacity":0.38,"zoom":11},{"opacity":0.35,"zoom":12},{"opacity":0.33,"zoom":13},{"opacity":0.3,"zoom":14},{"opacity":0.28,"zoom":15},{"opacity":0.25,"zoom":16},{"opacity":0.25,"zoom":17},{"opacity":0.25,"zoom":18},{"opacity":0.25,"zoom":19},{"opacity":0.25,"zoom":20},{"opacity":0.25,"zoom":21}]},{"tags":"region","elements":"geometry.fill","stylers":[{"color":"#5c605c","opacity":0.5,"zoom":0},{"color":"#5c605c","opacity":0.5,"zoom":1},{"color":"#5c605c","opacity":0.5,"zoom":2},{"color":"#5c605c","opacity":0.5,"zoom":3},{"color":"#5c605c","opacity":0.5,"zoom":4},{"color":"#5c605c","opacity":0.5,"zoom":5},{"color":"#5c605c","opacity":1,"zoom":6},{"color":"#5c605c","opacity":1,"zoom":7},{"color":"#757a75","opacity":1,"zoom":8},{"color":"#757a75","opacity":1,"zoom":9},{"color":"#757a75","opacity":1,"zoom":10},{"color":"#757a75","opacity":1,"zoom":11},{"color":"#757a75","opacity":1,"zoom":12},{"color":"#757a75","opacity":1,"zoom":13},{"color":"#757a75","opacity":1,"zoom":14},{"color":"#757a75","opacity":1,"zoom":15},{"color":"#757a75","opacity":1,"zoom":16},{"color":"#757a75","opacity":1,"zoom":17},{"color":"#757a75","opacity":1,"zoom":18},{"color":"#757a75","opacity":1,"zoom":19},{"color":"#757a75","opacity":1,"zoom":20},{"color":"#757a75","opacity":1,"zoom":21}]},{"tags":"region","elements":"geometry.outline","stylers":[{"color":"#494b49"},{"opacity":0.15,"zoom":0},{"opacity":0.15,"zoom":1},{"opacity":0.15,"zoom":2},{"opacity":0.15,"zoom":3},{"opacity":0.15,"zoom":4},{"opacity":0.15,"zoom":5},{"opacity":0.25,"zoom":6},{"opacity":0.5,"zoom":7},{"opacity":0.47,"zoom":8},{"opacity":0.44,"zoom":9},{"opacity":0.41,"zoom":10},{"opacity":0.38,"zoom":11},{"opacity":0.35,"zoom":12},{"opacity":0.33,"zoom":13},{"opacity":0.3,"zoom":14},{"opacity":0.28,"zoom":15},{"opacity":0.25,"zoom":16},{"opacity":0.25,"zoom":17},{"opacity":0.25,"zoom":18},{"opacity":0.25,"zoom":19},{"opacity":0.25,"zoom":20},{"opacity":0.25,"zoom":21}]},{"tags":{"any":"admin","none":["country","region","locality","district","address"]},"elements":"geometry.fill","stylers":[{"color":"#757a75"},{"opacity":0.5,"zoom":0},{"opacity":0.5,"zoom":1},{"opacity":0.5,"zoom":2},{"opacity":0.5,"zoom":3},{"opacity":0.5,"zoom":4},{"opacity":0.5,"zoom":5},{"opacity":1,"zoom":6},{"opacity":1,"zoom":7},{"opacity":1,"zoom":8},{"opacity":1,"zoom":9},{"opacity":1,"zoom":10},{"opacity":1,"zoom":11},{"opacity":1,"zoom":12},{"opacity":1,"zoom":13},{"opacity":1,"zoom":14},{"opacity":1,"zoom":15},{"opacity":1,"zoom":16},{"opacity":1,"zoom":17},{"opacity":1,"zoom":18},{"opacity":1,"zoom":19},{"opacity":1,"zoom":20},{"opacity":1,"zoom":21}]},{"tags":{"any":"admin","none":["country","region","locality","district","address"]},"elements":"geometry.outline","stylers":[{"color":"#494b49"},{"opacity":0.15,"zoom":0},{"opacity":0.15,"zoom":1},{"opacity":0.15,"zoom":2},{"opacity":0.15,"zoom":3},{"opacity":0.15,"zoom":4},{"opacity":0.15,"zoom":5},{"opacity":0.25,"zoom":6},{"opacity":0.5,"zoom":7},{"opacity":0.47,"zoom":8},{"opacity":0.44,"zoom":9},{"opacity":0.41,"zoom":10},{"opacity":0.38,"zoom":11},{"opacity":0.35,"zoom":12},{"opacity":0.33,"zoom":13},{"opacity":0.3,"zoom":14},{"opacity":0.28,"zoom":15},{"opacity":0.25,"zoom":16},{"opacity":0.25,"zoom":17},{"opacity":0.25,"zoom":18},{"opacity":0.25,"zoom":19},{"opacity":0.25,"zoom":20},{"opacity":0.25,"zoom":21}]},{"tags":{"any":"landcover","none":"vegetation"},"stylers":[{"hue":"#383938"}]},{"tags":"vegetation","elements":"geometry","stylers":[{"color":"#515251","opacity":0.1,"zoom":0},{"color":"#515251","opacity":0.1,"zoom":1},{"color":"#515251","opacity":0.1,"zoom":2},{"color":"#515251","opacity":0.1,"zoom":3},{"color":"#515251","opacity":0.1,"zoom":4},{"color":"#515251","opacity":0.1,"zoom":5},{"color":"#515251","opacity":0.2,"zoom":6},{"color":"#383938","opacity":0.3,"zoom":7},{"color":"#383938","opacity":0.4,"zoom":8},{"color":"#383938","opacity":0.6,"zoom":9},{"color":"#383938","opacity":0.8,"zoom":10},{"color":"#383938","opacity":1,"zoom":11},{"color":"#383938","opacity":1,"zoom":12},{"color":"#383938","opacity":1,"zoom":13},{"color":"#333433","opacity":1,"zoom":14},{"color":"#2d2e2d","opacity":1,"zoom":15},{"color":"#2d2e2d","opacity":1,"zoom":16},{"color":"#2d2e2d","opacity":1,"zoom":17},{"color":"#2d2e2d","opacity":1,"zoom":18},{"color":"#2d2e2d","opacity":1,"zoom":19},{"color":"#2d2e2d","opacity":1,"zoom":20},{"color":"#2d2e2d","opacity":1,"zoom":21}]},{"tags":"park","elements":"geometry","stylers":[{"color":"#383938","opacity":0.1,"zoom":0},{"color":"#383938","opacity":0.1,"zoom":1},{"color":"#383938","opacity":0.1,"zoom":2},{"color":"#383938","opacity":0.1,"zoom":3},{"color":"#383938","opacity":0.1,"zoom":4},{"color":"#383938","opacity":0.1,"zoom":5},{"color":"#383938","opacity":0.2,"zoom":6},{"color":"#383938","opacity":0.3,"zoom":7},{"color":"#383938","opacity":0.4,"zoom":8},{"color":"#383938","opacity":0.6,"zoom":9},{"color":"#383938","opacity":0.8,"zoom":10},{"color":"#383938","opacity":1,"zoom":11},{"color":"#383938","opacity":1,"zoom":12},{"color":"#383938","opacity":1,"zoom":13},{"color":"#333433","opacity":1,"zoom":14},{"color":"#2d2e2d","opacity":1,"zoom":15},{"color":"#2d2e2d","opacity":0.9,"zoom":16},{"color":"#2d2e2d","opacity":0.8,"zoom":17},{"color":"#2d2e2d","opacity":0.7,"zoom":18},{"color":"#2d2e2d","opacity":0.7,"zoom":19},{"color":"#2d2e2d","opacity":0.7,"zoom":20},{"color":"#2d2e2d","opacity":0.7,"zoom":21}]},{"tags":"national_park","elements":"geometry","stylers":[{"color":"#383938","opacity":0.1,"zoom":0},{"color":"#383938","opacity":0.1,"zoom":1},{"color":"#383938","opacity":0.1,"zoom":2},{"color":"#383938","opacity":0.1,"zoom":3},{"color":"#383938","opacity":0.1,"zoom":4},{"color":"#383938","opacity":0.1,"zoom":5},{"color":"#383938","opacity":0.2,"zoom":6},{"color":"#383938","opacity":0.3,"zoom":7},{"color":"#383938","opacity":0.4,"zoom":8},{"color":"#383938","opacity":0.6,"zoom":9},{"color":"#383938","opacity":0.8,"zoom":10},{"color":"#383938","opacity":1,"zoom":11},{"color":"#383938","opacity":1,"zoom":12},{"color":"#383938","opacity":1,"zoom":13},{"color":"#333433","opacity":1,"zoom":14},{"color":"#2d2e2d","opacity":1,"zoom":15},{"color":"#2d2e2d","opacity":0.7,"zoom":16},{"color":"#2d2e2d","opacity":0.7,"zoom":17},{"color":"#2d2e2d","opacity":0.7,"zoom":18},{"color":"#2d2e2d","opacity":0.7,"zoom":19},{"color":"#2d2e2d","opacity":0.7,"zoom":20},{"color":"#2d2e2d","opacity":0.7,"zoom":21}]},{"tags":"cemetery","elements":"geometry","stylers":[{"color":"#383938","zoom":0},{"color":"#383938","zoom":1},{"color":"#383938","zoom":2},{"color":"#383938","zoom":3},{"color":"#383938","zoom":4},{"color":"#383938","zoom":5},{"color":"#383938","zoom":6},{"color":"#383938","zoom":7},{"color":"#383938","zoom":8},{"color":"#383938","zoom":9},{"color":"#383938","zoom":10},{"color":"#383938","zoom":11},{"color":"#383938","zoom":12},{"color":"#383938","zoom":13},{"color":"#333433","zoom":14},{"color":"#2d2e2d","zoom":15},{"color":"#2d2e2d","zoom":16},{"color":"#2d2e2d","zoom":17},{"color":"#2d2e2d","zoom":18},{"color":"#2d2e2d","zoom":19},{"color":"#2d2e2d","zoom":20},{"color":"#2d2e2d","zoom":21}]},{"tags":"sports_ground","elements":"geometry","stylers":[{"color":"#444644","opacity":0,"zoom":0},{"color":"#444644","opacity":0,"zoom":1},{"color":"#444644","opacity":0,"zoom":2},{"color":"#444644","opacity":0,"zoom":3},{"color":"#444644","opacity":0,"zoom":4},{"color":"#444644","opacity":0,"zoom":5},{"color":"#444644","opacity":0,"zoom":6},{"color":"#444644","opacity":0,"zoom":7},{"color":"#444644","opacity":0,"zoom":8},{"color":"#444644","opacity":0,"zoom":9},{"color":"#444644","opacity":0,"zoom":10},{"color":"#444644","opacity":0,"zoom":11},{"color":"#444644","opacity":0,"zoom":12},{"color":"#444644","opacity":0,"zoom":13},{"color":"#3f413f","opacity":0,"zoom":14},{"color":"#3a3b3a","opacity":0.5,"zoom":15},{"color":"#393a39","opacity":1,"zoom":16},{"color":"#383938","opacity":1,"zoom":17},{"color":"#383938","opacity":1,"zoom":18},{"color":"#373837","opacity":1,"zoom":19},{"color":"#363736","opacity":1,"zoom":20},{"color":"#353635","opacity":1,"zoom":21}]},{"tags":"terrain","elements":"geometry","stylers":[{"hue":"#444644"},{"opacity":0.3,"zoom":0},{"opacity":0.3,"zoom":1},{"opacity":0.3,"zoom":2},{"opacity":0.3,"zoom":3},{"opacity":0.3,"zoom":4},{"opacity":0.35,"zoom":5},{"opacity":0.4,"zoom":6},{"opacity":0.6,"zoom":7},{"opacity":0.8,"zoom":8},{"opacity":0.9,"zoom":9},{"opacity":1,"zoom":10},{"opacity":1,"zoom":11},{"opacity":1,"zoom":12},{"opacity":1,"zoom":13},{"opacity":1,"zoom":14},{"opacity":1,"zoom":15},{"opacity":1,"zoom":16},{"opacity":1,"zoom":17},{"opacity":1,"zoom":18},{"opacity":1,"zoom":19},{"opacity":1,"zoom":20},{"opacity":1,"zoom":21}]},{"tags":"geographic_line","elements":"geometry","stylers":[{"color":"#aaacaa"}]},{"tags":"land","elements":"geometry","stylers":[{"color":"#444644","zoom":0},{"color":"#444644","zoom":1},{"color":"#444644","zoom":2},{"color":"#444644","zoom":3},{"color":"#444644","zoom":4},{"color":"#424342","zoom":5},{"color":"#3f413f","zoom":6},{"color":"#3d3e3d","zoom":7},{"color":"#3a3b3a","zoom":8},{"color":"#3a3b3a","zoom":9},{"color":"#3a3b3a","zoom":10},{"color":"#3a3b3a","zoom":11},{"color":"#3a3b3a","zoom":12},{"color":"#3a3b3a","zoom":13},{"color":"#383938","zoom":14},{"color":"#353635","zoom":15},{"color":"#353635","zoom":16},{"color":"#343534","zoom":17},{"color":"#343534","zoom":18},{"color":"#333533","zoom":19},{"color":"#333433","zoom":20},{"color":"#323432","zoom":21}]},{"tags":"residential","elements":"geometry","stylers":[{"color":"#444644","opacity":0.5,"zoom":0},{"color":"#444644","opacity":0.5,"zoom":1},{"color":"#444644","opacity":0.5,"zoom":2},{"color":"#444644","opacity":0.5,"zoom":3},{"color":"#444644","opacity":0.5,"zoom":4},{"color":"#444644","opacity":0.5,"zoom":5},{"color":"#444644","opacity":0.5,"zoom":6},{"color":"#444644","opacity":0.5,"zoom":7},{"color":"#444644","opacity":0.5,"zoom":8},{"color":"#444644","opacity":0.5,"zoom":9},{"color":"#444644","opacity":0.5,"zoom":10},{"color":"#444644","opacity":0.5,"zoom":11},{"color":"#444644","opacity":0.5,"zoom":12},{"color":"#444644","opacity":1,"zoom":13},{"color":"#3f413f","opacity":1,"zoom":14},{"color":"#3a3b3a","opacity":1,"zoom":15},{"color":"#393a39","opacity":1,"zoom":16},{"color":"#383938","opacity":1,"zoom":17},{"color":"#383938","opacity":1,"zoom":18},{"color":"#373837","opacity":1,"zoom":19},{"color":"#363736","opacity":1,"zoom":20},{"color":"#353635","opacity":1,"zoom":21}]},{"tags":"locality","elements":"geometry","stylers":[{"color":"#444644","zoom":0},{"color":"#444644","zoom":1},{"color":"#444644","zoom":2},{"color":"#444644","zoom":3},{"color":"#444644","zoom":4},{"color":"#444644","zoom":5},{"color":"#444644","zoom":6},{"color":"#444644","zoom":7},{"color":"#444644","zoom":8},{"color":"#444644","zoom":9},{"color":"#444644","zoom":10},{"color":"#444644","zoom":11},{"color":"#444644","zoom":12},{"color":"#444644","zoom":13},{"color":"#3f413f","zoom":14},{"color":"#3a3b3a","zoom":15},{"color":"#393a39","zoom":16},{"color":"#383938","zoom":17},{"color":"#383938","zoom":18},{"color":"#373837","zoom":19},{"color":"#363736","zoom":20},{"color":"#353635","zoom":21}]},{"tags":{"any":"structure","none":["building","fence"]},"elements":"geometry","stylers":[{"opacity":0.9},{"color":"#444644","zoom":0},{"color":"#444644","zoom":1},{"color":"#444644","zoom":2},{"color":"#444644","zoom":3},{"color":"#444644","zoom":4},{"color":"#444644","zoom":5},{"color":"#444644","zoom":6},{"color":"#444644","zoom":7},{"color":"#444644","zoom":8},{"color":"#444644","zoom":9},{"color":"#444644","zoom":10},{"color":"#444644","zoom":11},{"color":"#444644","zoom":12},{"color":"#444644","zoom":13},{"color":"#3f413f","zoom":14},{"color":"#3a3b3a","zoom":15},{"color":"#393a39","zoom":16},{"color":"#383938","zoom":17},{"color":"#383938","zoom":18},{"color":"#373837","zoom":19},{"color":"#363736","zoom":20},{"color":"#353635","zoom":21}]},{"tags":"building","elements":"geometry.fill","stylers":[{"color":"#444644"},{"opacity":0.7,"zoom":0},{"opacity":0.7,"zoom":1},{"opacity":0.7,"zoom":2},{"opacity":0.7,"zoom":3},{"opacity":0.7,"zoom":4},{"opacity":0.7,"zoom":5},{"opacity":0.7,"zoom":6},{"opacity":0.7,"zoom":7},{"opacity":0.7,"zoom":8},{"opacity":0.7,"zoom":9},{"opacity":0.7,"zoom":10},{"opacity":0.7,"zoom":11},{"opacity":0.7,"zoom":12},{"opacity":0.7,"zoom":13},{"opacity":0.7,"zoom":14},{"opacity":0.7,"zoom":15},{"opacity":0.9,"zoom":16},{"opacity":0.6,"zoom":17},{"opacity":0.6,"zoom":18},{"opacity":0.6,"zoom":19},{"opacity":0.6,"zoom":20},{"opacity":0.6,"zoom":21}]},{"tags":"building","elements":"geometry.outline","stylers":[{"color":"#585a58"},{"opacity":0.5,"zoom":0},{"opacity":0.5,"zoom":1},{"opacity":0.5,"zoom":2},{"opacity":0.5,"zoom":3},{"opacity":0.5,"zoom":4},{"opacity":0.5,"zoom":5},{"opacity":0.5,"zoom":6},{"opacity":0.5,"zoom":7},{"opacity":0.5,"zoom":8},{"opacity":0.5,"zoom":9},{"opacity":0.5,"zoom":10},{"opacity":0.5,"zoom":11},{"opacity":0.5,"zoom":12},{"opacity":0.5,"zoom":13},{"opacity":0.5,"zoom":14},{"opacity":0.5,"zoom":15},{"opacity":0.5,"zoom":16},{"opacity":1,"zoom":17},{"opacity":1,"zoom":18},{"opacity":1,"zoom":19},{"opacity":1,"zoom":20},{"opacity":1,"zoom":21}]},{"tags":{"any":"urban_area","none":["residential","industrial","cemetery","park","medical","sports_ground","beach","construction_site"]},"elements":"geometry","stylers":[{"color":"#4e504e","opacity":1,"zoom":0},{"color":"#4e504e","opacity":1,"zoom":1},{"color":"#4e504e","opacity":1,"zoom":2},{"color":"#4e504e","opacity":1,"zoom":3},{"color":"#4e504e","opacity":1,"zoom":4},{"color":"#4e504e","opacity":1,"zoom":5},{"color":"#4e504e","opacity":1,"zoom":6},{"color":"#4e504e","opacity":1,"zoom":7},{"color":"#4e504e","opacity":1,"zoom":8},{"color":"#4e504e","opacity":1,"zoom":9},{"color":"#4e504e","opacity":1,"zoom":10},{"color":"#4e504e","opacity":1,"zoom":11},{"color":"#4e504e","opacity":1,"zoom":12},{"color":"#4e504e","opacity":1,"zoom":13},{"color":"#484a48","opacity":1,"zoom":14},{"color":"#424342","opacity":1,"zoom":15},{"color":"#3c3d3c","opacity":0.67,"zoom":16},{"color":"#353635","opacity":0.33,"zoom":17},{"color":"#353635","opacity":0,"zoom":18},{"color":"#353635","opacity":0,"zoom":19},{"color":"#353635","opacity":0,"zoom":20},{"color":"#353635","opacity":0,"zoom":21}]},{"tags":"poi","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"poi","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"}]},{"tags":"poi","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"outdoor","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"outdoor","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"}]},{"tags":"outdoor","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"park","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"park","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"}]},{"tags":"park","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"cemetery","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"cemetery","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"}]},{"tags":"cemetery","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"beach","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"beach","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"}]},{"tags":"beach","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"medical","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"medical","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"}]},{"tags":"medical","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"shopping","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"shopping","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"}]},{"tags":"shopping","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"commercial_services","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"commercial_services","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"}]},{"tags":"commercial_services","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"food_and_drink","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"food_and_drink","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"}]},{"tags":"food_and_drink","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"road","elements":"label.icon","types":"point","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"tertiary-color":"#727472"}]},{"tags":"road","elements":"label.text.fill","types":"point","stylers":[{"color":"#707570"}]},{"tags":"entrance","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"},{"hue":"#323432"}]},{"tags":"locality","elements":"label.icon","stylers":[{"color":"#252725"},{"secondary-color":"#707570"}]},{"tags":"country","elements":"label.text.fill","stylers":[{"opacity":0.8},{"color":"#909290"}]},{"tags":"country","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"region","elements":"label.text.fill","stylers":[{"color":"#909290"},{"opacity":0.8}]},{"tags":"region","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"district","elements":"label.text.fill","stylers":[{"color":"#909290"},{"opacity":0.8}]},{"tags":"district","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":{"any":"admin","none":["country","region","locality","district","address"]},"elements":"label.text.fill","stylers":[{"color":"#909290"}]},{"tags":{"any":"admin","none":["country","region","locality","district","address"]},"elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"locality","elements":"label.text.fill","stylers":[{"color":"#b7b8b7","zoom":0},{"color":"#b7b8b7","zoom":1},{"color":"#b7b8b7","zoom":2},{"color":"#b7b8b7","zoom":3},{"color":"#b7b8b7","zoom":4},{"color":"#b9bab9","zoom":5},{"color":"#bbbcbb","zoom":6},{"color":"#bdbebd","zoom":7},{"color":"#c0c1c0","zoom":8},{"color":"#c2c3c2","zoom":9},{"color":"#c4c5c4","zoom":10},{"color":"#c4c5c4","zoom":11},{"color":"#c4c5c4","zoom":12},{"color":"#c4c5c4","zoom":13},{"color":"#c4c5c4","zoom":14},{"color":"#c4c5c4","zoom":15},{"color":"#c4c5c4","zoom":16},{"color":"#c4c5c4","zoom":17},{"color":"#c4c5c4","zoom":18},{"color":"#c4c5c4","zoom":19},{"color":"#c4c5c4","zoom":20},{"color":"#c4c5c4","zoom":21}]},{"tags":"locality","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"road","elements":"label.text.fill","types":"polyline","stylers":[{"color":"#b7b8b7"}]},{"tags":"road","elements":"label.text.outline","types":"polyline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"road","elements":"geometry.fill.pattern","types":"polyline","stylers":[{"scale":1},{"color":"#838683"}]},{"tags":"road","elements":"label.text.fill","types":"point","stylers":[{"color":"#b6b9b6"}]},{"tags":"structure","elements":"label.text.fill","stylers":[{"color":"#656765"},{"opacity":0.5}]},{"tags":"structure","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"address","elements":"label.text.fill","stylers":[{"color":"#656765"},{"opacity":0.9,"zoom":0},{"opacity":0.9,"zoom":1},{"opacity":0.9,"zoom":2},{"opacity":0.9,"zoom":3},{"opacity":0.9,"zoom":4},{"opacity":0.9,"zoom":5},{"opacity":0.9,"zoom":6},{"opacity":0.9,"zoom":7},{"opacity":0.9,"zoom":8},{"opacity":0.9,"zoom":9},{"opacity":0.9,"zoom":10},{"opacity":0.9,"zoom":11},{"opacity":0.9,"zoom":12},{"opacity":0.9,"zoom":13},{"opacity":0.9,"zoom":14},{"opacity":0.9,"zoom":15},{"opacity":0.9,"zoom":16},{"opacity":1,"zoom":17},{"opacity":1,"zoom":18},{"opacity":1,"zoom":19},{"opacity":1,"zoom":20},{"opacity":1,"zoom":21}]},{"tags":"address","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":"landscape","elements":"label.text.fill","stylers":[{"color":"#909290","opacity":1,"zoom":0},{"color":"#909290","opacity":1,"zoom":1},{"color":"#909290","opacity":1,"zoom":2},{"color":"#909290","opacity":1,"zoom":3},{"color":"#656765","opacity":0.5,"zoom":4},{"color":"#656765","opacity":0.5,"zoom":5},{"color":"#656765","opacity":0.5,"zoom":6},{"color":"#656765","opacity":0.5,"zoom":7},{"color":"#656765","opacity":0.5,"zoom":8},{"color":"#656765","opacity":0.5,"zoom":9},{"color":"#656765","opacity":0.5,"zoom":10},{"color":"#656765","opacity":0.5,"zoom":11},{"color":"#656765","opacity":0.5,"zoom":12},{"color":"#656765","opacity":0.5,"zoom":13},{"color":"#656765","opacity":0.5,"zoom":14},{"color":"#656765","opacity":0.5,"zoom":15},{"color":"#656765","opacity":0.5,"zoom":16},{"color":"#656765","opacity":0.5,"zoom":17},{"color":"#656765","opacity":0.5,"zoom":18},{"color":"#656765","opacity":0.5,"zoom":19},{"color":"#656765","opacity":0.5,"zoom":20},{"color":"#656765","opacity":0.5,"zoom":21}]},{"tags":"landscape","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5,"zoom":0},{"opacity":0.5,"zoom":1},{"opacity":0.5,"zoom":2},{"opacity":0.5,"zoom":3},{"opacity":0,"zoom":4},{"opacity":0,"zoom":5},{"opacity":0,"zoom":6},{"opacity":0,"zoom":7},{"opacity":0,"zoom":8},{"opacity":0,"zoom":9},{"opacity":0,"zoom":10},{"opacity":0,"zoom":11},{"opacity":0,"zoom":12},{"opacity":0,"zoom":13},{"opacity":0,"zoom":14},{"opacity":0,"zoom":15},{"opacity":0,"zoom":16},{"opacity":0,"zoom":17},{"opacity":0,"zoom":18},{"opacity":0,"zoom":19},{"opacity":0,"zoom":20},{"opacity":0,"zoom":21}]},{"tags":"water","elements":"label.text.fill","stylers":[{"color":"#6f766f"},{"opacity":0.8}]},{"tags":"water","elements":"label.text.outline","types":"polyline","stylers":[{"color":"#0d0d0d"},{"opacity":0.2}]},{"tags":{"any":"road_1","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#656765","scale":0,"zoom":0},{"color":"#656765","scale":0,"zoom":1},{"color":"#656765","scale":0,"zoom":2},{"color":"#656765","scale":0,"zoom":3},{"color":"#656765","scale":0,"zoom":4},{"color":"#656765","scale":0,"zoom":5},{"color":"#656765","scale":2.64,"zoom":6},{"color":"#656765","scale":2.84,"zoom":7},{"color":"#656765","scale":3.13,"zoom":8},{"color":"#656765","scale":3.55,"zoom":9},{"color":"#656765","scale":3.21,"zoom":10},{"color":"#656765","scale":2.72,"zoom":11},{"color":"#656765","scale":2.35,"zoom":12},{"color":"#656765","scale":2.02,"zoom":13},{"color":"#636563","scale":1.81,"zoom":14},{"color":"#626462","scale":1.69,"zoom":15},{"color":"#606260","scale":1.66,"zoom":16},{"color":"#5f615f","scale":1.31,"zoom":17},{"color":"#5d5f5d","scale":1.08,"zoom":18},{"color":"#5b5d5b","scale":0.93,"zoom":19},{"color":"#5a5c5a","scale":0.84,"zoom":20},{"color":"#585a58","scale":0.8,"zoom":21}]},{"tags":{"any":"road_1"},"elements":"geometry.outline","stylers":[{"color":"#656765","scale":0.9,"zoom":0},{"color":"#656765","scale":0.9,"zoom":1},{"color":"#656765","scale":0.9,"zoom":2},{"color":"#656765","scale":0.9,"zoom":3},{"color":"#656765","scale":0.9,"zoom":4},{"color":"#303130","scale":0.9,"zoom":5},{"color":"#303130","scale":1.96,"zoom":6},{"color":"#303130","scale":1.96,"zoom":7},{"color":"#303130","scale":2.02,"zoom":8},{"color":"#303130","scale":2.16,"zoom":9},{"color":"#303130","scale":2.16,"zoom":10},{"color":"#303130","scale":2.04,"zoom":11},{"color":"#303130","scale":1.93,"zoom":12},{"color":"#303130","scale":1.8,"zoom":13},{"color":"#303130","scale":1.71,"zoom":14},{"color":"#303130","scale":1.68,"zoom":15},{"color":"#303130","scale":1.7,"zoom":16},{"color":"#303130","scale":1.38,"zoom":17},{"color":"#303130","scale":1.15,"zoom":18},{"color":"#303130","scale":1,"zoom":19},{"color":"#303130","scale":0.91,"zoom":20},{"color":"#303130","scale":0.87,"zoom":21}]},{"tags":{"any":"road_2","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#656765","scale":0,"zoom":0},{"color":"#656765","scale":0,"zoom":1},{"color":"#656765","scale":0,"zoom":2},{"color":"#656765","scale":0,"zoom":3},{"color":"#656765","scale":0,"zoom":4},{"color":"#656765","scale":0,"zoom":5},{"color":"#656765","scale":2.64,"zoom":6},{"color":"#656765","scale":2.84,"zoom":7},{"color":"#656765","scale":3.13,"zoom":8},{"color":"#656765","scale":3.55,"zoom":9},{"color":"#656765","scale":3.21,"zoom":10},{"color":"#656765","scale":2.72,"zoom":11},{"color":"#656765","scale":2.35,"zoom":12},{"color":"#656765","scale":2.02,"zoom":13},{"color":"#636563","scale":1.81,"zoom":14},{"color":"#626462","scale":1.69,"zoom":15},{"color":"#606260","scale":1.66,"zoom":16},{"color":"#5f615f","scale":1.31,"zoom":17},{"color":"#5d5f5d","scale":1.08,"zoom":18},{"color":"#5b5d5b","scale":0.93,"zoom":19},{"color":"#5a5c5a","scale":0.84,"zoom":20},{"color":"#585a58","scale":0.8,"zoom":21}]},{"tags":{"any":"road_2"},"elements":"geometry.outline","stylers":[{"color":"#656765","scale":0.9,"zoom":0},{"color":"#656765","scale":0.9,"zoom":1},{"color":"#656765","scale":0.9,"zoom":2},{"color":"#656765","scale":0.9,"zoom":3},{"color":"#656765","scale":0.9,"zoom":4},{"color":"#303130","scale":0.9,"zoom":5},{"color":"#303130","scale":1.96,"zoom":6},{"color":"#303130","scale":1.96,"zoom":7},{"color":"#303130","scale":2.02,"zoom":8},{"color":"#303130","scale":2.16,"zoom":9},{"color":"#303130","scale":2.16,"zoom":10},{"color":"#303130","scale":2.04,"zoom":11},{"color":"#303130","scale":1.93,"zoom":12},{"color":"#303130","scale":1.8,"zoom":13},{"color":"#303130","scale":1.71,"zoom":14},{"color":"#303130","scale":1.68,"zoom":15},{"color":"#303130","scale":1.7,"zoom":16},{"color":"#303130","scale":1.38,"zoom":17},{"color":"#303130","scale":1.15,"zoom":18},{"color":"#303130","scale":1,"zoom":19},{"color":"#303130","scale":0.91,"zoom":20},{"color":"#303130","scale":0.87,"zoom":21}]},{"tags":{"any":"road_3","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#656765","scale":0,"zoom":0},{"color":"#656765","scale":0,"zoom":1},{"color":"#656765","scale":0,"zoom":2},{"color":"#656765","scale":0,"zoom":3},{"color":"#656765","scale":0,"zoom":4},{"color":"#656765","scale":0,"zoom":5},{"color":"#656765","scale":0,"zoom":6},{"color":"#656765","scale":0,"zoom":7},{"color":"#656765","scale":0,"zoom":8},{"color":"#656765","scale":2.23,"zoom":9},{"color":"#656765","scale":2.33,"zoom":10},{"color":"#656765","scale":1.49,"zoom":11},{"color":"#656765","scale":1.48,"zoom":12},{"color":"#656765","scale":1.23,"zoom":13},{"color":"#636563","scale":1.06,"zoom":14},{"color":"#626462","scale":0.96,"zoom":15},{"color":"#606260","scale":0.92,"zoom":16},{"color":"#5f615f","scale":0.81,"zoom":17},{"color":"#5d5f5d","scale":0.75,"zoom":18},{"color":"#5b5d5b","scale":0.73,"zoom":19},{"color":"#5a5c5a","scale":0.75,"zoom":20},{"color":"#585a58","scale":0.8,"zoom":21}]},{"tags":{"any":"road_3"},"elements":"geometry.outline","stylers":[{"color":"#656765","scale":1.03,"zoom":0},{"color":"#656765","scale":1.03,"zoom":1},{"color":"#656765","scale":1.03,"zoom":2},{"color":"#656765","scale":1.03,"zoom":3},{"color":"#656765","scale":1.03,"zoom":4},{"color":"#656765","scale":1.03,"zoom":5},{"color":"#656765","scale":1.03,"zoom":6},{"color":"#656765","scale":1.03,"zoom":7},{"color":"#656765","scale":0.83,"zoom":8},{"color":"#303130","scale":2.71,"zoom":9},{"color":"#303130","scale":1.76,"zoom":10},{"color":"#303130","scale":1.31,"zoom":11},{"color":"#303130","scale":1.37,"zoom":12},{"color":"#303130","scale":1.21,"zoom":13},{"color":"#303130","scale":1.1,"zoom":14},{"color":"#303130","scale":1.02,"zoom":15},{"color":"#303130","scale":1,"zoom":16},{"color":"#303130","scale":0.88,"zoom":17},{"color":"#303130","scale":0.81,"zoom":18},{"color":"#303130","scale":0.79,"zoom":19},{"color":"#303130","scale":0.81,"zoom":20},{"color":"#303130","scale":0.87,"zoom":21}]},{"tags":{"any":"road_4","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#656765","scale":0,"zoom":0},{"color":"#656765","scale":0,"zoom":1},{"color":"#656765","scale":0,"zoom":2},{"color":"#656765","scale":0,"zoom":3},{"color":"#656765","scale":0,"zoom":4},{"color":"#656765","scale":0,"zoom":5},{"color":"#656765","scale":0,"zoom":6},{"color":"#656765","scale":0,"zoom":7},{"color":"#656765","scale":0,"zoom":8},{"color":"#656765","scale":0,"zoom":9},{"color":"#656765","scale":1.5,"zoom":10},{"color":"#656765","scale":1.12,"zoom":11},{"color":"#656765","scale":1.25,"zoom":12},{"color":"#656765","scale":1.05,"zoom":13},{"color":"#636563","scale":0.93,"zoom":14},{"color":"#626462","scale":0.86,"zoom":15},{"color":"#606260","scale":1.02,"zoom":16},{"color":"#5f615f","scale":0.88,"zoom":17},{"color":"#5d5f5d","scale":0.79,"zoom":18},{"color":"#5b5d5b","scale":0.76,"zoom":19},{"color":"#5a5c5a","scale":0.76,"zoom":20},{"color":"#585a58","scale":0.8,"zoom":21}]},{"tags":{"any":"road_4"},"elements":"geometry.outline","stylers":[{"color":"#656765","scale":0.9,"zoom":0},{"color":"#656765","scale":0.9,"zoom":1},{"color":"#656765","scale":0.9,"zoom":2},{"color":"#656765","scale":0.9,"zoom":3},{"color":"#656765","scale":0.9,"zoom":4},{"color":"#656765","scale":0.9,"zoom":5},{"color":"#656765","scale":0.9,"zoom":6},{"color":"#656765","scale":0.9,"zoom":7},{"color":"#656765","scale":0.9,"zoom":8},{"color":"#656765","scale":0.72,"zoom":9},{"color":"#303130","scale":1.22,"zoom":10},{"color":"#303130","scale":1.04,"zoom":11},{"color":"#303130","scale":1.17,"zoom":12},{"color":"#303130","scale":1.06,"zoom":13},{"color":"#303130","scale":0.97,"zoom":14},{"color":"#303130","scale":0.92,"zoom":15},{"color":"#303130","scale":1.09,"zoom":16},{"color":"#303130","scale":0.95,"zoom":17},{"color":"#303130","scale":0.86,"zoom":18},{"color":"#303130","scale":0.82,"zoom":19},{"color":"#303130","scale":0.82,"zoom":20},{"color":"#303130","scale":0.86,"zoom":21}]},{"tags":{"any":"road_5","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#656765","scale":0,"zoom":0},{"color":"#656765","scale":0,"zoom":1},{"color":"#656765","scale":0,"zoom":2},{"color":"#656765","scale":0,"zoom":3},{"color":"#656765","scale":0,"zoom":4},{"color":"#656765","scale":0,"zoom":5},{"color":"#656765","scale":0,"zoom":6},{"color":"#656765","scale":0,"zoom":7},{"color":"#656765","scale":0,"zoom":8},{"color":"#656765","scale":0,"zoom":9},{"color":"#656765","scale":0,"zoom":10},{"color":"#656765","scale":0,"zoom":11},{"color":"#656765","scale":1.11,"zoom":12},{"color":"#656765","scale":0.84,"zoom":13},{"color":"#636563","scale":0.72,"zoom":14},{"color":"#626462","scale":0.84,"zoom":15},{"color":"#606260","scale":0.97,"zoom":16},{"color":"#5f615f","scale":0.83,"zoom":17},{"color":"#5d5f5d","scale":0.75,"zoom":18},{"color":"#5b5d5b","scale":0.73,"zoom":19},{"color":"#5a5c5a","scale":0.74,"zoom":20},{"color":"#585a58","scale":0.8,"zoom":21}]},{"tags":{"any":"road_5"},"elements":"geometry.outline","stylers":[{"color":"#656765","scale":0.9,"zoom":0},{"color":"#656765","scale":0.9,"zoom":1},{"color":"#656765","scale":0.9,"zoom":2},{"color":"#656765","scale":0.9,"zoom":3},{"color":"#656765","scale":0.9,"zoom":4},{"color":"#656765","scale":0.9,"zoom":5},{"color":"#656765","scale":0.9,"zoom":6},{"color":"#656765","scale":0.9,"zoom":7},{"color":"#656765","scale":0.9,"zoom":8},{"color":"#656765","scale":0.9,"zoom":9},{"color":"#656765","scale":0.9,"zoom":10},{"color":"#656765","scale":0.4,"zoom":11},{"color":"#303130","scale":1.03,"zoom":12},{"color":"#303130","scale":0.88,"zoom":13},{"color":"#303130","scale":0.79,"zoom":14},{"color":"#303130","scale":0.91,"zoom":15},{"color":"#303130","scale":1.05,"zoom":16},{"color":"#303130","scale":0.9,"zoom":17},{"color":"#303130","scale":0.82,"zoom":18},{"color":"#303130","scale":0.79,"zoom":19},{"color":"#303130","scale":0.81,"zoom":20},{"color":"#303130","scale":0.86,"zoom":21}]},{"tags":{"any":"road_6","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#656765","scale":0,"zoom":0},{"color":"#656765","scale":0,"zoom":1},{"color":"#656765","scale":0,"zoom":2},{"color":"#656765","scale":0,"zoom":3},{"color":"#656765","scale":0,"zoom":4},{"color":"#656765","scale":0,"zoom":5},{"color":"#656765","scale":0,"zoom":6},{"color":"#656765","scale":0,"zoom":7},{"color":"#656765","scale":0,"zoom":8},{"color":"#656765","scale":0,"zoom":9},{"color":"#656765","scale":0,"zoom":10},{"color":"#656765","scale":0,"zoom":11},{"color":"#656765","scale":0,"zoom":12},{"color":"#656765","scale":2,"zoom":13},{"color":"#636563","scale":1.13,"zoom":14},{"color":"#626462","scale":1.11,"zoom":15},{"color":"#606260","scale":1.16,"zoom":16},{"color":"#5f615f","scale":0.93,"zoom":17},{"color":"#5d5f5d","scale":0.8,"zoom":18},{"color":"#5b5d5b","scale":0.75,"zoom":19},{"color":"#5a5c5a","scale":0.75,"zoom":20},{"color":"#585a58","scale":0.8,"zoom":21}]},{"tags":{"any":"road_6"},"elements":"geometry.outline","stylers":[{"color":"#656765","scale":0.9,"zoom":0},{"color":"#656765","scale":0.9,"zoom":1},{"color":"#656765","scale":0.9,"zoom":2},{"color":"#656765","scale":0.9,"zoom":3},{"color":"#656765","scale":0.9,"zoom":4},{"color":"#656765","scale":0.9,"zoom":5},{"color":"#656765","scale":0.9,"zoom":6},{"color":"#656765","scale":0.9,"zoom":7},{"color":"#656765","scale":0.9,"zoom":8},{"color":"#656765","scale":0.9,"zoom":9},{"color":"#656765","scale":0.9,"zoom":10},{"color":"#656765","scale":0.9,"zoom":11},{"color":"#656765","scale":0.9,"zoom":12},{"color":"#303130","scale":1.49,"zoom":13},{"color":"#303130","scale":1.09,"zoom":14},{"color":"#303130","scale":1.13,"zoom":15},{"color":"#303130","scale":1.22,"zoom":16},{"color":"#303130","scale":0.99,"zoom":17},{"color":"#303130","scale":0.87,"zoom":18},{"color":"#303130","scale":0.82,"zoom":19},{"color":"#303130","scale":0.82,"zoom":20},{"color":"#303130","scale":0.86,"zoom":21}]},{"tags":{"any":"road_7","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#656765","scale":0,"zoom":0},{"color":"#656765","scale":0,"zoom":1},{"color":"#656765","scale":0,"zoom":2},{"color":"#656765","scale":0,"zoom":3},{"color":"#656765","scale":0,"zoom":4},{"color":"#656765","scale":0,"zoom":5},{"color":"#656765","scale":0,"zoom":6},{"color":"#656765","scale":0,"zoom":7},{"color":"#656765","scale":0,"zoom":8},{"color":"#656765","scale":0,"zoom":9},{"color":"#656765","scale":0,"zoom":10},{"color":"#656765","scale":0,"zoom":11},{"color":"#656765","scale":0,"zoom":12},{"color":"#656765","scale":0,"zoom":13},{"color":"#636563","scale":0.8,"zoom":14},{"color":"#626462","scale":0.69,"zoom":15},{"color":"#606260","scale":0.78,"zoom":16},{"color":"#5f615f","scale":0.71,"zoom":17},{"color":"#5d5f5d","scale":0.69,"zoom":18},{"color":"#5b5d5b","scale":0.7,"zoom":19},{"color":"#5a5c5a","scale":0.74,"zoom":20},{"color":"#585a58","scale":0.8,"zoom":21}]},{"tags":{"any":"road_7"},"elements":"geometry.outline","stylers":[{"color":"#656765","scale":0.9,"zoom":0},{"color":"#656765","scale":0.9,"zoom":1},{"color":"#656765","scale":0.9,"zoom":2},{"color":"#656765","scale":0.9,"zoom":3},{"color":"#656765","scale":0.9,"zoom":4},{"color":"#656765","scale":0.9,"zoom":5},{"color":"#656765","scale":0.9,"zoom":6},{"color":"#656765","scale":0.9,"zoom":7},{"color":"#656765","scale":0.9,"zoom":8},{"color":"#656765","scale":0.9,"zoom":9},{"color":"#656765","scale":0.9,"zoom":10},{"color":"#656765","scale":0.9,"zoom":11},{"color":"#656765","scale":0.9,"zoom":12},{"color":"#656765","scale":0.9,"zoom":13},{"color":"#303130","scale":0.84,"zoom":14},{"color":"#303130","scale":0.77,"zoom":15},{"color":"#303130","scale":0.84,"zoom":16},{"color":"#303130","scale":0.78,"zoom":17},{"color":"#303130","scale":0.75,"zoom":18},{"color":"#303130","scale":0.76,"zoom":19},{"color":"#303130","scale":0.79,"zoom":20},{"color":"#303130","scale":0.86,"zoom":21}]},{"tags":{"any":"road_minor","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#3f403f"},{"scale":0,"zoom":0},{"scale":0,"zoom":1},{"scale":0,"zoom":2},{"scale":0,"zoom":3},{"scale":0,"zoom":4},{"scale":0,"zoom":5},{"scale":0,"zoom":6},{"scale":0,"zoom":7},{"scale":0,"zoom":8},{"scale":0,"zoom":9},{"scale":0,"zoom":10},{"scale":0,"zoom":11},{"scale":0,"zoom":12},{"scale":0,"zoom":13},{"scale":0,"zoom":14},{"scale":0,"zoom":15},{"scale":0.8,"zoom":16},{"scale":0.8,"zoom":17},{"scale":0.8,"zoom":18},{"scale":0.8,"zoom":19},{"scale":0.8,"zoom":20},{"scale":0.8,"zoom":21}]},{"tags":{"any":"road_minor"},"elements":"geometry.outline","stylers":[{"opacity":0}]},{"tags":{"any":"road_unclassified","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#3f403f"},{"scale":0,"zoom":0},{"scale":0,"zoom":1},{"scale":0,"zoom":2},{"scale":0,"zoom":3},{"scale":0,"zoom":4},{"scale":0,"zoom":5},{"scale":0,"zoom":6},{"scale":0,"zoom":7},{"scale":0,"zoom":8},{"scale":0,"zoom":9},{"scale":0,"zoom":10},{"scale":0,"zoom":11},{"scale":0,"zoom":12},{"scale":0,"zoom":13},{"scale":0,"zoom":14},{"scale":0,"zoom":15},{"scale":0.8,"zoom":16},{"scale":0.8,"zoom":17},{"scale":0.8,"zoom":18},{"scale":0.8,"zoom":19},{"scale":0.8,"zoom":20},{"scale":0.8,"zoom":21}]},{"tags":{"any":"road_unclassified"},"elements":"geometry.outline","stylers":[{"opacity":0}]},{"tags":{"all":"is_tunnel","none":"path"},"elements":"geometry.fill","stylers":[{"color":"#494b49","zoom":0},{"color":"#494b49","zoom":1},{"color":"#494b49","zoom":2},{"color":"#494b49","zoom":3},{"color":"#494b49","zoom":4},{"color":"#494b49","zoom":5},{"color":"#494b49","zoom":6},{"color":"#494b49","zoom":7},{"color":"#494b49","zoom":8},{"color":"#494b49","zoom":9},{"color":"#494b49","zoom":10},{"color":"#494b49","zoom":11},{"color":"#494b49","zoom":12},{"color":"#494b49","zoom":13},{"color":"#444644","zoom":14},{"color":"#3f403f","zoom":15},{"color":"#3e3f3e","zoom":16},{"color":"#3d3e3d","zoom":17},{"color":"#3d3e3d","zoom":18},{"color":"#3c3d3c","zoom":19},{"color":"#3b3c3b","zoom":20},{"color":"#3a3b3a","zoom":21}]},{"tags":{"all":"path","none":"is_tunnel"},"elements":"geometry.fill","stylers":[{"color":"#171717"},{"opacity":0.5,"zoom":0},{"opacity":0.5,"zoom":1},{"opacity":0.5,"zoom":2},{"opacity":0.5,"zoom":3},{"opacity":0.5,"zoom":4},{"opacity":0.5,"zoom":5},{"opacity":0.5,"zoom":6},{"opacity":0.5,"zoom":7},{"opacity":0.5,"zoom":8},{"opacity":0.5,"zoom":9},{"opacity":0.5,"zoom":10},{"opacity":0.5,"zoom":11},{"opacity":0.5,"zoom":12},{"opacity":0.5,"zoom":13},{"opacity":0.5,"zoom":14},{"opacity":0.5,"zoom":15},{"opacity":0.5,"zoom":16},{"opacity":1,"zoom":17},{"opacity":1,"zoom":18},{"opacity":1,"zoom":19},{"opacity":1,"zoom":20},{"opacity":1,"zoom":21}]},{"tags":{"all":"path","none":"is_tunnel"},"elements":"geometry.outline","stylers":[{"opacity":0.7},{"color":"#444644","zoom":0},{"color":"#444644","zoom":1},{"color":"#444644","zoom":2},{"color":"#444644","zoom":3},{"color":"#444644","zoom":4},{"color":"#444644","zoom":5},{"color":"#444644","zoom":6},{"color":"#444644","zoom":7},{"color":"#444644","zoom":8},{"color":"#444644","zoom":9},{"color":"#444644","zoom":10},{"color":"#444644","zoom":11},{"color":"#444644","zoom":12},{"color":"#444644","zoom":13},{"color":"#3f413f","zoom":14},{"color":"#3a3b3a","zoom":15},{"color":"#393a39","zoom":16},{"color":"#383938","zoom":17},{"color":"#383938","zoom":18},{"color":"#373837","zoom":19},{"color":"#363736","zoom":20},{"color":"#353635","zoom":21}]},{"tags":"road_construction","elements":"geometry.fill","stylers":[{"color":"#656765"}]},{"tags":"road_construction","elements":"geometry.outline","stylers":[{"color":"#171717","zoom":0},{"color":"#171717","zoom":1},{"color":"#171717","zoom":2},{"color":"#171717","zoom":3},{"color":"#171717","zoom":4},{"color":"#171717","zoom":5},{"color":"#171717","zoom":6},{"color":"#171717","zoom":7},{"color":"#171717","zoom":8},{"color":"#171717","zoom":9},{"color":"#171717","zoom":10},{"color":"#171717","zoom":11},{"color":"#171717","zoom":12},{"color":"#171717","zoom":13},{"color":"#303130","zoom":14},{"color":"#171717","zoom":15},{"color":"#131313","zoom":16},{"color":"#0f0f0f","zoom":17},{"color":"#0c0c0c","zoom":18},{"color":"#080808","zoom":19},{"color":"#040404","zoom":20},{"color":"#000000","zoom":21}]},{"tags":{"any":"ferry"},"stylers":[{"color":"#3e423e"}]},{"tags":"transit_location","elements":"label.icon","stylers":[{"hue":"#252725"},{"saturation":-0.97}]},{"tags":"transit_location","elements":"label.text.fill","stylers":[{"color":"#727472"}]},{"tags":"transit_location","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"}]},{"tags":"transit_schema","elements":"geometry.fill","stylers":[{"color":"#727472"},{"scale":0.7},{"opacity":0.6,"zoom":0},{"opacity":0.6,"zoom":1},{"opacity":0.6,"zoom":2},{"opacity":0.6,"zoom":3},{"opacity":0.6,"zoom":4},{"opacity":0.6,"zoom":5},{"opacity":0.6,"zoom":6},{"opacity":0.6,"zoom":7},{"opacity":0.6,"zoom":8},{"opacity":0.6,"zoom":9},{"opacity":0.6,"zoom":10},{"opacity":0.6,"zoom":11},{"opacity":0.6,"zoom":12},{"opacity":0.6,"zoom":13},{"opacity":0.6,"zoom":14},{"opacity":0.5,"zoom":15},{"opacity":0.4,"zoom":16},{"opacity":0.4,"zoom":17},{"opacity":0.4,"zoom":18},{"opacity":0.4,"zoom":19},{"opacity":0.4,"zoom":20},{"opacity":0.4,"zoom":21}]},{"tags":"transit_schema","elements":"geometry.outline","stylers":[{"opacity":0}]},{"tags":"transit_line","elements":"geometry.fill.pattern","stylers":[{"color":"#595959"},{"opacity":0,"zoom":0},{"opacity":0,"zoom":1},{"opacity":0,"zoom":2},{"opacity":0,"zoom":3},{"opacity":0,"zoom":4},{"opacity":0,"zoom":5},{"opacity":0,"zoom":6},{"opacity":0,"zoom":7},{"opacity":0,"zoom":8},{"opacity":0,"zoom":9},{"opacity":0,"zoom":10},{"opacity":0,"zoom":11},{"opacity":0,"zoom":12},{"opacity":1,"zoom":13},{"opacity":1,"zoom":14},{"opacity":1,"zoom":15},{"opacity":1,"zoom":16},{"opacity":1,"zoom":17},{"opacity":1,"zoom":18},{"opacity":1,"zoom":19},{"opacity":1,"zoom":20},{"opacity":1,"zoom":21}]},{"tags":"transit_line","elements":"geometry.fill","stylers":[{"color":"#595959"},{"scale":0.4},{"opacity":0,"zoom":0},{"opacity":0,"zoom":1},{"opacity":0,"zoom":2},{"opacity":0,"zoom":3},{"opacity":0,"zoom":4},{"opacity":0,"zoom":5},{"opacity":0,"zoom":6},{"opacity":0,"zoom":7},{"opacity":0,"zoom":8},{"opacity":0,"zoom":9},{"opacity":0,"zoom":10},{"opacity":0,"zoom":11},{"opacity":0,"zoom":12},{"opacity":1,"zoom":13},{"opacity":1,"zoom":14},{"opacity":1,"zoom":15},{"opacity":1,"zoom":16},{"opacity":1,"zoom":17},{"opacity":1,"zoom":18},{"opacity":1,"zoom":19},{"opacity":1,"zoom":20},{"opacity":1,"zoom":21}]},{"tags":"water","elements":"geometry","stylers":[{"color":"#252725","zoom":0},{"color":"#252725","zoom":1},{"color":"#252725","zoom":2},{"color":"#252725","zoom":3},{"color":"#252725","zoom":4},{"color":"#252725","zoom":5},{"color":"#252725","zoom":6},{"color":"#252725","zoom":7},{"color":"#232523","zoom":8},{"color":"#222422","zoom":9},{"color":"#202220","zoom":10},{"color":"#1f211f","zoom":11},{"color":"#1f211f","zoom":12},{"color":"#1e201e","zoom":13},{"color":"#1d1f1d","zoom":14},{"color":"#1c1d1c","zoom":15},{"color":"#1a1c1a","zoom":16},{"color":"#191b19","zoom":17},{"color":"#181918","zoom":18},{"color":"#171817","zoom":19},{"color":"#151615","zoom":20},{"color":"#141514","zoom":21}]},{"tags":"water","elements":"geometry","types":"polyline","stylers":[{"opacity":0.4,"zoom":0},{"opacity":0.4,"zoom":1},{"opacity":0.4,"zoom":2},{"opacity":0.4,"zoom":3},{"opacity":0.6,"zoom":4},{"opacity":0.8,"zoom":5},{"opacity":1,"zoom":6},{"opacity":1,"zoom":7},{"opacity":1,"zoom":8},{"opacity":1,"zoom":9},{"opacity":1,"zoom":10},{"opacity":1,"zoom":11},{"opacity":1,"zoom":12},{"opacity":1,"zoom":13},{"opacity":1,"zoom":14},{"opacity":1,"zoom":15},{"opacity":1,"zoom":16},{"opacity":1,"zoom":17},{"opacity":1,"zoom":18},{"opacity":1,"zoom":19},{"opacity":1,"zoom":20},{"opacity":1,"zoom":21}]},{"tags":"bathymetry","elements":"geometry","stylers":[{"hue":"#252725"}]},{"tags":{"any":["industrial","construction_site"]},"elements":"geometry","stylers":[{"color":"#3f403f","zoom":0},{"color":"#3f403f","zoom":1},{"color":"#3f403f","zoom":2},{"color":"#3f403f","zoom":3},{"color":"#3f403f","zoom":4},{"color":"#3f403f","zoom":5},{"color":"#3f403f","zoom":6},{"color":"#3f403f","zoom":7},{"color":"#3f403f","zoom":8},{"color":"#3f403f","zoom":9},{"color":"#3f403f","zoom":10},{"color":"#3f403f","zoom":11},{"color":"#3f403f","zoom":12},{"color":"#3f403f","zoom":13},{"color":"#3a3b3a","zoom":14},{"color":"#353635","zoom":15},{"color":"#343534","zoom":16},{"color":"#333433","zoom":17},{"color":"#333433","zoom":18},{"color":"#323332","zoom":19},{"color":"#313231","zoom":20},{"color":"#303130","zoom":21}]},{"tags":{"any":"transit","none":["transit_location","transit_line","transit_schema","is_unclassified_transit"]},"elements":"geometry","stylers":[{"color":"#3f403f","zoom":0},{"color":"#3f403f","zoom":1},{"color":"#3f403f","zoom":2},{"color":"#3f403f","zoom":3},{"color":"#3f403f","zoom":4},{"color":"#3f403f","zoom":5},{"color":"#3f403f","zoom":6},{"color":"#3f403f","zoom":7},{"color":"#3f403f","zoom":8},{"color":"#3f403f","zoom":9},{"color":"#3f403f","zoom":10},{"color":"#3f403f","zoom":11},{"color":"#3f403f","zoom":12},{"color":"#3f403f","zoom":13},{"color":"#3a3b3a","zoom":14},{"color":"#353635","zoom":15},{"color":"#343534","zoom":16},{"color":"#333433","zoom":17},{"color":"#333433","zoom":18},{"color":"#323332","zoom":19},{"color":"#313231","zoom":20},{"color":"#303130","zoom":21}]},{"tags":"fence","elements":"geometry.fill","stylers":[{"color":"#494b49"},{"opacity":0.75,"zoom":0},{"opacity":0.75,"zoom":1},{"opacity":0.75,"zoom":2},{"opacity":0.75,"zoom":3},{"opacity":0.75,"zoom":4},{"opacity":0.75,"zoom":5},{"opacity":0.75,"zoom":6},{"opacity":0.75,"zoom":7},{"opacity":0.75,"zoom":8},{"opacity":0.75,"zoom":9},{"opacity":0.75,"zoom":10},{"opacity":0.75,"zoom":11},{"opacity":0.75,"zoom":12},{"opacity":0.75,"zoom":13},{"opacity":0.75,"zoom":14},{"opacity":0.75,"zoom":15},{"opacity":0.75,"zoom":16},{"opacity":0.45,"zoom":17},{"opacity":0.45,"zoom":18},{"opacity":0.45,"zoom":19},{"opacity":0.45,"zoom":20},{"opacity":0.45,"zoom":21}]},{"tags":"medical","elements":"geometry","stylers":[{"color":"#3f403f","zoom":0},{"color":"#3f403f","zoom":1},{"color":"#3f403f","zoom":2},{"color":"#3f403f","zoom":3},{"color":"#3f403f","zoom":4},{"color":"#3f403f","zoom":5},{"color":"#3f403f","zoom":6},{"color":"#3f403f","zoom":7},{"color":"#3f403f","zoom":8},{"color":"#3f403f","zoom":9},{"color":"#3f403f","zoom":10},{"color":"#3f403f","zoom":11},{"color":"#3f403f","zoom":12},{"color":"#3f403f","zoom":13},{"color":"#3a3b3a","zoom":14},{"color":"#353635","zoom":15},{"color":"#343534","zoom":16},{"color":"#333433","zoom":17},{"color":"#333433","zoom":18},{"color":"#323332","zoom":19},{"color":"#313231","zoom":20},{"color":"#303130","zoom":21}]},{"tags":"beach","elements":"geometry","stylers":[{"color":"#3f403f","opacity":0.3,"zoom":0},{"color":"#3f403f","opacity":0.3,"zoom":1},{"color":"#3f403f","opacity":0.3,"zoom":2},{"color":"#3f403f","opacity":0.3,"zoom":3},{"color":"#3f403f","opacity":0.3,"zoom":4},{"color":"#3f403f","opacity":0.3,"zoom":5},{"color":"#3f403f","opacity":0.3,"zoom":6},{"color":"#3f403f","opacity":0.3,"zoom":7},{"color":"#3f403f","opacity":0.3,"zoom":8},{"color":"#3f403f","opacity":0.3,"zoom":9},{"color":"#3f403f","opacity":0.3,"zoom":10},{"color":"#3f403f","opacity":0.3,"zoom":11},{"color":"#3f403f","opacity":0.3,"zoom":12},{"color":"#3f403f","opacity":0.65,"zoom":13},{"color":"#3a3b3a","opacity":1,"zoom":14},{"color":"#353635","opacity":1,"zoom":15},{"color":"#343534","opacity":1,"zoom":16},{"color":"#333433","opacity":1,"zoom":17},{"color":"#333433","opacity":1,"zoom":18},{"color":"#323332","opacity":1,"zoom":19},{"color":"#313231","opacity":1,"zoom":20},{"color":"#303130","opacity":1,"zoom":21}]},{"tags":{"all":["is_tunnel","path"]},"elements":"geometry.fill","stylers":[{"color":"#282928"},{"opacity":0.3}]},{"tags":{"all":["is_tunnel","path"]},"elements":"geometry.outline","stylers":[{"opacity":0}]},{"tags":"road_limited","elements":"geometry.fill","stylers":[{"color":"#171717"},{"scale":0,"zoom":0},{"scale":0,"zoom":1},{"scale":0,"zoom":2},{"scale":0,"zoom":3},{"scale":0,"zoom":4},{"scale":0,"zoom":5},{"scale":0,"zoom":6},{"scale":0,"zoom":7},{"scale":0,"zoom":8},{"scale":0,"zoom":9},{"scale":0,"zoom":10},{"scale":0,"zoom":11},{"scale":0,"zoom":12},{"scale":0.1,"zoom":13},{"scale":0.2,"zoom":14},{"scale":0.3,"zoom":15},{"scale":0.5,"zoom":16},{"scale":0.6,"zoom":17},{"scale":0.69,"zoom":18},{"scale":0.7,"zoom":19},{"scale":0.74,"zoom":20},{"scale":0.8,"zoom":21}]},{"tags":"road_limited","elements":"geometry.outline","stylers":[{"color":"#656765","scale":0.9,"zoom":0},{"color":"#656765","scale":0.9,"zoom":1},{"color":"#656765","scale":0.9,"zoom":2},{"color":"#656765","scale":0.9,"zoom":3},{"color":"#656765","scale":0.9,"zoom":4},{"color":"#656765","scale":0.9,"zoom":5},{"color":"#656765","scale":0.9,"zoom":6},{"color":"#656765","scale":0.9,"zoom":7},{"color":"#656765","scale":0.9,"zoom":8},{"color":"#656765","scale":0.9,"zoom":9},{"color":"#656765","scale":0.9,"zoom":10},{"color":"#656765","scale":0.9,"zoom":11},{"color":"#656765","scale":0.9,"zoom":12},{"color":"#656765","scale":0.1,"zoom":13},{"color":"#303130","scale":0.2,"zoom":14},{"color":"#303130","scale":0.3,"zoom":15},{"color":"#303130","scale":0.5,"zoom":16},{"color":"#303130","scale":0.6,"zoom":17},{"color":"#303130","scale":0.75,"zoom":18},{"color":"#303130","scale":0.76,"zoom":19},{"color":"#303130","scale":0.79,"zoom":20},{"color":"#303130","scale":0.86,"zoom":21}]},{"tags":"transit_stop","elements":"label.icon","stylers":[{"color":"#0d0d0d"},{"secondary-color":"#727472"},{"tertiary-color":"#727472"}]},{"tags":"entrance","elements":"label.text.fill","stylers":[{"color":"#b7b8b7"},{"opacity":1}]},{"tags":"entrance","elements":"label.text.outline","stylers":[{"color":"#0d0d0d"},{"opacity":0.5}]},{"tags":{"any":["food_and_drink","shopping","commercial_services"]},"stylers":{"visibility":"off"}},{"tags":{"any":["traffic_light"]},"stylers":{"visibility":"off"}},{"tags":{"any":["entrance"]},"stylers":{"visibility":"off"}},{"tags":{"any":["road"],"none":["road_1","road_2","road_3","road_4","road_5","road_6","road_7"]},"elements":"label.icon","stylers":{"visibility":"off"}},{"tags":{"any":["address","road_7","road_limited","road_unclassified","road_minor","road_construction","path"]},"elements":"label","stylers":{"visibility":"off"}},{"tags":{"any":"landcover","none":"vegetation"},"stylers":{"visibility":"off"}}]');
    var script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/v3/?apikey=fea225af-55b9-4955-bb23-c3187c0c1a7e&lang=en_US";
    document.head.appendChild(script);
    async function initMap() {
        await ymaps3.ready;
        await ymaps3.ready;
        const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls} = ymaps3;
        const {YMapZoomControl} = await ymaps3.import("@yandex/ymaps3-controls@0.0.1");
        if (document.getElementById("map")) {
            const map = new YMap(document.getElementById("map"), {
                location: {
                    center: [ 37.568641, 55.72363806901335 ],
                    zoom: 15
                },
                behaviors: [ "drag", "pinchZoom", "mouseTilt", "dblClick" ]
            }, [ new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({}) ]);
            const markerElement = document.createElement("div");
            markerElement.className = "map__marker";
            map.addChild(new YMapMarker({
                coordinates: [ 37.568641, 55.72363806901335 ]
            }, markerElement));
            map.addChild(new YMapControls({
                position: "right"
            }).addChild(new YMapZoomControl({})));
            map.addChild(new YMapDefaultSchemeLayer({
                theme: "dark",
                customization: map_customization_namespaceObject
            }));
        }
    }
    window.addEventListener("load", (function(e) {
        initMap();
    }));
    const products = document.querySelectorAll(".product");
    if (products) products.forEach((el => {
        let currentProduct = el;
        const imageSwitchItems = currentProduct.querySelectorAll(".image-switch__item");
        const imagePagination = currentProduct.querySelector(".image-pagination");
        if (imageSwitchItems.length > 1) imageSwitchItems.forEach(((el, index) => {
            el.setAttribute("data-index", index);
            imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? "image-pagination__item--active" : ""}" data-index="${index}"></li>`;
            el.addEventListener("mouseenter", (e => {
                currentProduct.querySelectorAll(".image-pagination__item").forEach((el => {
                    el.classList.remove("image-pagination__item--active");
                }));
                currentProduct.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add("image-pagination__item--active");
            }));
            el.addEventListener("mouseleave", (e => {
                currentProduct.querySelectorAll(".image-pagination__item").forEach((el => {
                    el.classList.remove("image-pagination__item--active");
                }));
                currentProduct.querySelector(`.image-pagination__item[data-index="0"]`).classList.add("image-pagination__item--active");
            }));
        }));
    }));
    if (isMobile.any) {
        let arrow = document.querySelectorAll(".menu-spoller__button");
        for (let i = 0; i < arrow.length; i++) {
            let subMenu = arrow[i].nextElementSibling;
            arrow[i].addEventListener("click", (function() {
                if (window.innerWidth >= 767.98) {
                    let open = document.querySelectorAll("._sub-menu-open");
                    let active = document.querySelectorAll("._sub-menu-active");
                    if (open.length > 0 || active.length > 0) {
                        open.forEach((elem => {
                            if (elem !== subMenu) elem.classList.remove("_sub-menu-open");
                        }));
                        active.forEach((elem => {
                            if (elem !== arrow[i]) elem.classList.remove("_sub-menu-active");
                        }));
                    }
                    subMenu.classList.toggle("_sub-menu-open");
                    arrow[i].classList.toggle("_sub-menu-active");
                }
            }));
        }
    }
    const formSearchBtn = document.querySelector(".search-header__button");
    const formSearch = document.querySelector(".search-header__form");
    if (formSearch && formSearchBtn) formSearchBtn.addEventListener("click", (() => {
        formSearch.classList.toggle("_active");
    }));
    const offset = 500;
    const scrollUp = document.querySelector(".scroll-up");
    if (scrollUp) {
        const getTop = () => document.documentElement.scrollTop;
        window.addEventListener("scroll", (() => {
            if (getTop() > offset) scrollUp.classList.add("scroll-up--active"); else scrollUp.classList.remove("scroll-up--active");
        }));
        scrollUp.addEventListener("click", (() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }));
    }
    function partnersInit() {
        const partnersSections = document.querySelectorAll(".partners");
        if (partnersSections) partnersSections.forEach((partners => {
            const originalSlide = partners.querySelector(".partners__slide:not(.clone)");
            const cloneSlide = originalSlide.cloneNode(true);
            cloneSlide.classList.add("clone");
            originalSlide.parentNode.insertBefore(cloneSlide, originalSlide.nextSibling);
            partners.classList.add("_active");
        })); else console.log("Ой, кажется на странице нет секции партнеров");
    }
    partnersInit();
    window["FLS"] = true;
    isWebp();
    addTouchClass();
    addLoadedClass();
    menuInit();
    spollers();
})();