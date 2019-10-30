// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function(modules, cache, entry, globalName) {
        // Save the require from previous bundle to this closure if any
        var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
        var nodeRequire = typeof require === 'function' && require;

        function newRequire(name, jumped) {
            if (!cache[name]) {
                if (!modules[name]) {
                    // if we cannot find the module within our internal map or
                    // cache jump to the current global require ie. the last bundle
                    // that was added to the page.
                    var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
                    if (!jumped && currentRequire) {
                        return currentRequire(name, true);
                    }

                    // If there are other bundles on this page the require from the
                    // previous one is saved to 'previousRequire'. Repeat this as
                    // many times as there are bundles until the module is found or
                    // we exhaust the require chain.
                    if (previousRequire) {
                        return previousRequire(name, true);
                    }

                    // Try the node require function if it exists.
                    if (nodeRequire && typeof name === 'string') {
                        return nodeRequire(name);
                    }

                    var err = new Error('Cannot find module \'' + name + '\'');
                    err.code = 'MODULE_NOT_FOUND';
                    throw err;
                }

                localRequire.resolve = resolve;
                localRequire.cache = {};

                var module = cache[name] = new newRequire.Module(name);

                modules[name][0].call(module.exports, localRequire, module, module.exports, this);
            }

            return cache[name].exports;

            function localRequire(x) {
                return newRequire(localRequire.resolve(x));
            }

            function resolve(x) {
                return modules[name][1][x] || x;
            }
        }

        function Module(moduleName) {
            this.id = moduleName;
            this.bundle = newRequire;
            this.exports = {};
        }

        newRequire.isParcelRequire = true;
        newRequire.Module = Module;
        newRequire.modules = modules;
        newRequire.cache = cache;
        newRequire.parent = previousRequire;
        newRequire.register = function(id, exports) {
            modules[id] = [function(require, module) {
                module.exports = exports;
            }, {}];
        };

        var error;
        for (var i = 0; i < entry.length; i++) {
            try {
                newRequire(entry[i]);
            } catch (e) {
                // Save first error but execute all entries
                if (!error) {
                    error = e;
                }
            }
        }

        if (entry.length) {
            // Expose entry point to Node, AMD or browser globals
            // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
            var mainExports = newRequire(entry[entry.length - 1]);

            // CommonJS
            if (typeof exports === "object" && typeof module !== "undefined") {
                module.exports = mainExports;

                // RequireJS
            } else if (typeof define === "function" && define.amd) {
                define(function() {
                    return mainExports;
                });

                // <script>
            } else if (globalName) {
                this[globalName] = mainExports;
            }
        }

        // Override the current require with this new one
        parcelRequire = newRequire;

        if (error) {
            // throw error from earlier, _after updating parcelRequire_
            throw error;
        }

        return newRequire;
    })({
        "../node_modules/parcel-bundler/src/builtins/bundle-url.js": [function(require, module, exports) {
            var bundleURL = null;

            function getBundleURLCached() {
                if (!bundleURL) {
                    bundleURL = getBundleURL();
                }

                return bundleURL;
            }

            function getBundleURL() {
                // Attempt to find the URL of the current script and use that as the base URL
                try {
                    throw new Error();
                } catch (err) {
                    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

                    if (matches) {
                        return getBaseURL(matches[0]);
                    }
                }

                return '/';
            }

            function getBaseURL(url) {
                return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
            }

            exports.getBundleURL = getBundleURLCached;
            exports.getBaseURL = getBaseURL;
        }, {}],
        "../node_modules/parcel-bundler/src/builtins/css-loader.js": [function(require, module, exports) {
            var bundle = require('./bundle-url');

            function updateLink(link) {
                var newLink = link.cloneNode();

                newLink.onload = function() {
                    link.remove();
                };

                newLink.href = link.href.split('?')[0] + '?' + Date.now();
                link.parentNode.insertBefore(newLink, link.nextSibling);
            }

            var cssTimeout = null;

            function reloadCSS() {
                if (cssTimeout) {
                    return;
                }

                cssTimeout = setTimeout(function() {
                    var links = document.querySelectorAll('link[rel="stylesheet"]');

                    for (var i = 0; i < links.length; i++) {
                        if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
                            updateLink(links[i]);
                        }
                    }

                    cssTimeout = null;
                }, 50);
            }

            module.exports = reloadCSS;
        }, { "./bundle-url": "../node_modules/parcel-bundler/src/builtins/bundle-url.js" }],
        "styles/main.scss": [function(require, module, exports) {
            var reloadCSS = require('_css_loader');

            module.hot.dispose(reloadCSS);
            module.hot.accept(reloadCSS);
        }, {
            "./..\\assets\\icons\\x.svg": [
                ["x.246bc54b.svg", "assets/icons/x.svg"], "assets/icons/x.svg"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\CategoryBlocks\\back-to-it-background.png": [
                ["back-to-it-background.2fdef15e.png", "assets/CategoryBlocks/back-to-it-background.png"], "assets/CategoryBlocks/back-to-it-background.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\icons\\ctcLogo.png": [
                ["ctcLogo.b685136f.png", "assets/icons/ctcLogo.png"], "assets/icons/ctcLogo.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\CategoryBlocks\\automotive.png": [
                ["automotive.546e704c.png", "assets/CategoryBlocks/automotive.png"], "assets/CategoryBlocks/automotive.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\CategoryBlocks\\tools-hardware.png": [
                ["tools-hardware.30aaff7f.png", "assets/CategoryBlocks/tools-hardware.png"], "assets/CategoryBlocks/tools-hardware.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\CategoryBlocks\\home-essentials.png": [
                ["home-essentials.8bafae6d.png", "assets/CategoryBlocks/home-essentials.png"], "assets/CategoryBlocks/home-essentials.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\CategoryBlocks\\sports.png": [
                ["sports.896b98a2.png", "assets/CategoryBlocks/sports.png"], "assets/CategoryBlocks/sports.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\CategoryBlocks\\outdoor-living.png": [
                ["outdoor-living.76919771.png", "assets/CategoryBlocks/outdoor-living.png"], "assets/CategoryBlocks/outdoor-living.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\CategoryBlocks\\frank.png": [
                ["frank.03ee4886.png", "assets/CategoryBlocks/frank.png"], "assets/CategoryBlocks/frank.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\CategoryBlocks\\canvas.png": [
                ["canvas.78727df4.png", "assets/CategoryBlocks/canvas.png"], "assets/CategoryBlocks/canvas.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\CategoryBlocks\\mastercraft.png": [
                ["mastercraft.af97837d.png", "assets/CategoryBlocks/mastercraft.png"], "assets/CategoryBlocks/mastercraft.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\icons\\list-add.png": [
                ["list-add.bb9363a7.png", "assets/icons/list-add.png"], "assets/icons/list-add.png"
            ],
            "C:\\Users\\khatran\\Desktop\\demo1ctc\\demo1ctc\\src\\assets\\icons\\list-added.png": [
                ["list-added.5c4b6b9c.png", "assets/icons/list-added.png"], "assets/icons/list-added.png"
            ],
            "./..\\assets\\images\\vendor-ad\\bg.svg": [
                ["bg.a7faf977.svg", "assets/images/vendor-ad/bg.svg"], "assets/images/vendor-ad/bg.svg"
            ],
            "./..\\assets\\images\\vendor-ad\\logo.svg": [
                ["logo.3ae8d1ad.svg", "assets/images/vendor-ad/logo.svg"], "assets/images/vendor-ad/logo.svg"
            ],
            "./..\\assets\\images\\vendor-ad\\dairy.png": [
                ["dairy.8c22f09c.png", "assets/images/vendor-ad/dairy.png"], "assets/images/vendor-ad/dairy.png"
            ],
            "./..\\assets\\images\\pets\\bg.png": [
                ["bg.5aa4d42d.png", "assets/images/pets/bg.png"], "assets/images/pets/bg.png"
            ],
            "./..\\assets\\icons\\back-black.svg": [
                ["back-black.9fca1a28.svg", "assets/icons/back-black.svg"], "assets/icons/back-black.svg"
            ],
            "./..\\assets\\icons\\next-black.svg": [
                ["next-black.e94ccf25.svg", "assets/icons/next-black.svg"], "assets/icons/next-black.svg"
            ],
            "./..\\assets\\images\\pets\\landing.png": [
                ["landing.24fcaadf.png", "assets/images/pets/landing.png"], "assets/images/pets/landing.png"
            ],
            "./..\\assets\\images\\TP\\bg-bounty.png": [
                ["bg-bounty.70231e1d.png", "assets/images/TP/bg-bounty.png"], "assets/images/TP/bg-bounty.png"
            ],
            "./..\\assets\\images\\TP\\bg-charmin.png": [
                ["bg-charmin.9f4b30fa.png", "assets/images/TP/bg-charmin.png"], "assets/images/TP/bg-charmin.png"
            ],
            "./..\\assets\\images\\TP\\bg-puffs.png": [
                ["bg-puffs.e4f83a5c.png", "assets/images/TP/bg-puffs.png"], "assets/images/TP/bg-puffs.png"
            ],
            "./..\\assets\\images\\clean\\bg.png": [
                ["bg.bccf310e.png", "assets/images/clean/bg.png"], "assets/images/clean/bg.png"
            ],
            "./..\\assets\\images\\clean\\landing.png": [
                ["landing.762384ef.png", "assets/images/clean/landing.png"], "assets/images/clean/landing.png"
            ],
            "./..\\assets\\images\\localgrowers\\landing.png": [
                ["landing.795a398f.png", "assets/images/localgrowers/landing.png"], "assets/images/localgrowers/landing.png"
            ],
            "./..\\assets\\images\\localgrowers\\message.png": [
                ["message.dccd17d7.png", "assets/images/localgrowers/message.png"], "assets/images/localgrowers/message.png"
            ],
            "./..\\assets\\images\\pccc\\logo.png": [
                ["logo.d564d968.png", "assets/images/pccc/logo.png"], "assets/images/pccc/logo.png"
            ],
            "./..\\assets\\images\\pccc\\message.png": [
                ["message.a11ccc84.png", "assets/images/pccc/message.png"], "assets/images/pccc/message.png"
            ],
            "./..\\assets\\images\\localfarm\\landing.jpg": [
                ["landing.460bed0d.jpg", "assets/images/localfarm/landing.jpg"], "assets/images/localfarm/landing.jpg"
            ],
            "./..\\assets\\images\\localfarm\\landing2.jpg": [
                ["landing2.3b7f4061.jpg", "assets/images/localfarm/landing2.jpg"], "assets/images/localfarm/landing2.jpg"
            ],
            "./..\\assets\\images\\localfarm\\cucumber.jpg": [
                ["cucumber.722a469a.jpg", "assets/images/localfarm/cucumber.jpg"], "assets/images/localfarm/cucumber.jpg"
            ],
            "./..\\assets\\images\\localfarm\\tomatos.jpg": [
                ["tomatos.cd746bbd.jpg", "assets/images/localfarm/tomatos.jpg"], "assets/images/localfarm/tomatos.jpg"
            ],
            "./..\\assets\\images\\localfarm\\grilling.jpg": [
                ["grilling.93d39e20.jpg", "assets/images/localfarm/grilling.jpg"], "assets/images/localfarm/grilling.jpg"
            ],
            "./..\\assets\\images\\zevia\\bg.png": [
                ["bg.e6d495e4.png", "assets/images/zevia/bg.png"], "assets/images/zevia/bg.png"
            ],
            "./..\\assets\\icons\\list.png": [
                ["list.9784a475.png", "assets/icons/list.png"], "assets/icons/list.png"
            ],
            "./..\\assets\\images\\pointer.png": [
                ["pointer.d1b71db6.png", "assets/images/pointer.png"], "assets/images/pointer.png"
            ],
            "./..\\assets\\fonts\\2B816F_4_0.woff2": [
                ["2B816F_4_0.450cb8c5.woff2", "assets/fonts/2B816F_4_0.woff2"], "assets/fonts/2B816F_4_0.woff2"
            ],
            "./..\\assets\\fonts\\2B816F_1_0.woff2": [
                ["2B816F_1_0.7501d6e3.woff2", "assets/fonts/2B816F_1_0.woff2"], "assets/fonts/2B816F_1_0.woff2"
            ],
            "./..\\assets\\fonts\\SharpGroteskBold25.otf": [
                ["SharpGroteskBold25.497aaf74.otf", "assets/fonts/SharpGroteskBold25.otf"], "assets/fonts/SharpGroteskBold25.otf"
            ],
            "./..\\assets\\fonts\\SharpGroteskSmBold20.otf": [
                ["SharpGroteskSmBold20.8434c4b5.otf", "assets/fonts/SharpGroteskSmBold20.otf"], "assets/fonts/SharpGroteskSmBold20.otf"
            ],
            "./..\\assets\\fonts\\SharpGroteskSmBold15.otf": [
                ["SharpGroteskSmBold15.e05e962c.otf", "assets/fonts/SharpGroteskSmBold15.otf"], "assets/fonts/SharpGroteskSmBold15.otf"
            ],
            "./..\\assets\\fonts\\SharpGroteskMedium25.otf": [
                ["SharpGroteskMedium25.29baa4d7.otf", "assets/fonts/SharpGroteskMedium25.otf"], "assets/fonts/SharpGroteskMedium25.otf"
            ],
            "./..\\assets\\fonts\\SharpGroteskBook20.otf": [
                ["SharpGroteskBook20.f80464d6.otf", "assets/fonts/SharpGroteskBook20.otf"], "assets/fonts/SharpGroteskBook20.otf"
            ],
            "./..\\assets\\fonts\\NoirStd-SemiBold.otf": [
                ["NoirStd-SemiBold.04687ad8.otf", "assets/fonts/NoirStd-SemiBold.otf"], "assets/fonts/NoirStd-SemiBold.otf"
            ],
            "./..\\assets\\fonts\\NoirStd-Bold.otf": [
                ["NoirStd-Bold.5313e659.otf", "assets/fonts/NoirStd-Bold.otf"], "assets/fonts/NoirStd-Bold.otf"
            ],
            "./..\\assets\\fonts\\EMprintW01-Semibold.ttf": [
                ["EMprintW01-Semibold.369ea0ea.ttf", "assets/fonts/EMprintW01-Semibold.ttf"], "assets/fonts/EMprintW01-Semibold.ttf"
            ],
            "./..\\assets\\fonts\\EMprintW01-Regular.ttf": [
                ["EMprintW01-Regular.64b434ea.ttf", "assets/fonts/EMprintW01-Regular.ttf"], "assets/fonts/EMprintW01-Regular.ttf"
            ],
            "_css_loader": "../node_modules/parcel-bundler/src/builtins/css-loader.js"
        }],
        "assets/icons/back.svg": [function(require, module, exports) {
            module.exports = "assets/icons/back.svg";
        }, {}],
        "assets/icons/next.svg": [function(require, module, exports) {
            module.exports = "assets/icons/next.svg";
        }, {}],
        "app.js": [function(require, module, exports) {
                "use strict";

                require("./styles/main.scss");

                function ownKeys(object, enumerableOnly) {
                    var keys = Object.keys(object);
                    if (Object.getOwnPropertySymbols) {
                        var symbols = Object.getOwnPropertySymbols(object);
                        if (enumerableOnly) symbols = symbols.filter(function(sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; });
                        keys.push.apply(keys, symbols);
                    }
                    return keys;
                }

                function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function(key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function(key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

                function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

                var sliders = [];

                var $ = function $(selector) {
                    return document.querySelector(selector);
                };

                var $$ = function $$(selector) {
                    return document.querySelectorAll(selector);
                };

                function fixDescriptionOverflow(node) {
                    var description = node.dataset.description;
                    var isDouble = !!node.closest('.product-box--double') && window.innerWidth >= 628;
                    var isMustBuy = !!node.closest('.product-box--must-buy');

                    if (description.length > 60 && isMustBuy) {
                        node.innerHTML = description.match(/^.{60}\w*/)[0] + '…';
                        node.classList.add('expandable');
                    } else if (description.length > 80 && !isDouble) {
                        node.innerHTML = description.match(/^.{80}\w*/)[0] + '…';
                        node.classList.add('expandable');
                    } else if (isDouble) {
                        node.innerHTML = description;
                        node.classList.remove('expandable');
                    }
                }

                function fixAllDescriptionOverflows() {
                    var priceBoxInners = $$('.product-description__copy');
                    priceBoxInners.forEach(function(node) {
                        return fixDescriptionOverflow(node);
                    });
                }

                function toggleMenu(e) {
                    var menuClasses = $('nav.menu').classList;

                    if (e.key) {
                        if (e.keyCode === 27) {
                            menuClasses.remove('menu--open');
                        }
                    } else {
                        if (menuClasses.contains('menu--open')) {
                            menuClasses.remove('menu--open');
                        } else {
                            menuClasses.add('menu--open');
                        }
                    }
                }

                function toggleSubMenu(e) {
                    e.preventDefault();
                    var submenu = e.target.parentElement.querySelector('.submenu__dropdown');

                    if (submenu.classList.contains('hidden')) {
                        $$('.submenu__dropdown').forEach(function(node) {
                            return node.classList.add('hidden');
                        });
                        submenu.classList.remove('hidden');
                    } else {
                        submenu.classList.add('hidden');
                    }
                }

                function scrollToEl(selector) {
                    if (window.innerWidth < 1250) {
                        window.setTimeout(function() {
                            window.scrollTo({
                                top: $(selector).offsetTop - $('.header').clientHeight,
                                behavior: 'smooth'
                            });
                        }, 0);
                    }
                }

                var offersView = false;

                function resetOffers() {
                    offersView = true;
                    $('.categories__section').classList.add('hidden');
                    $('.all-offers__section').classList.remove('hidden');
                    fixAllDescriptionOverflows();
                    disclaimerTiming();
                }

                function viewAllOffers(e) {
                    $('.features__section').classList.add('hidden');
                    $('.menu').classList.remove('menu--open');

                    if (e.target.closest('nav')) {
                        resetInitialView();
                        resetOffers();
                    } else if (e.target.closest('.all-offers__section')) {
                        var classList = e.target.closest('.all-offers__section').classList.length;

                        if (classList >= 3) {
                            offersView = false;
                            resetInitialView();
                        } else {
                            resetOffers();
                        }
                    } else if (e.target.closest('.categories__section')) {
                        resetOffers();
                    } // scrollToEl('.all-offers__section')

                }

                function resetInitialView() {
                    document.getElementById('home').classList.remove('active');
                    $('.features__section').classList.remove('hidden');
                    $('.all-offers__section').classList.add('hidden'); // $('.all-offers').classList.remove('hidden')

                    $('.categories__section').classList.remove('hidden');
                    $$('[data-category]').forEach(function(node) {
                        node.classList.remove('hidden');
                    });
                    $$('.submenu__dropdown .active').forEach(function(node) {
                        return node.classList.remove('active');
                    });
                    $$('.product-disclaimer.active').forEach(function(node) {
                        return node.classList.remove('active');
                    });
                    $$('.submenu__dropdown').forEach(function(node) {
                        return node.classList.add('hidden');
                    });
                    $('.menu').classList.remove('menu--open');
                    window.scrollTo(0, 0);
                    sliders.forEach(function(slider) {
                        slider.goTo(1);
                    });
                    $('.all-offers__section').classList.remove('filtered');
                    $('.all-offers__section').classList.remove('produce');
                    $$('.filter-section form input').forEach(function(node) {
                        return node.checked = false;
                    });
                    document.getElementById('no-results').classList.add('hidden');
                    offersView = false;
                }

                function filterProductBoxes(category) {
                    console.log('filterProductBoxes', category);
                    $$('.filter-section form input').forEach(function(node) {
                        return node.checked = false;
                    });

                    if (category === 'promotion') {
                        $$('.all-offers__section .col.hidden').forEach(function(node) {
                            node.classList.remove('hidden');
                        });
                        $$('.all-offers__section .product-box:not(.promotion)').forEach(function(node) {
                            node.closest('.col').classList.add('hidden');
                        });
                    } else if (category === 'points') {
                        $$('.all-offers__section .col').forEach(function(node) {
                            node.classList.add('hidden');
                        });
                        $$('.all-offers__section .points-badge').forEach(function(node) {
                            node.closest('.col').classList.remove('hidden');
                        });
                    } else {
                        $('.all-offers__section').classList.add('filtered');

                        if (category === 'produce') {
                            $('.all-offers__section').classList.add('produce');
                        } else {
                            $('.all-offers__section').classList.remove('produce');
                        }

                        var nextDepartment = $('.next-department');
                        var nextDepartmentCategory = getNextDepartmentCategory(category);
                        nextDepartment.className = "next-department product-box product-box--category ".concat(nextDepartmentCategory);
                        $$(".all-offers__section [data-category*=".concat(category, "]")).forEach(function(node) {
                            node.classList.remove('hidden');
                        });
                        $$(".all-offers__section [data-category]:not([data-category*=".concat(category, "])")).forEach(function(node) {
                            node.classList.add('hidden');
                        });
                    }

                    revealMenuCategory(category);
                    $('.features__section').classList.add('hidden');
                    resetOffers();
                    window.scrollTo(0, 0);
                    var isScrollable = document.body.scrollHeight > window.innerHeight;

                    if (!isScrollable) {
                        $$(".all-offers__section [data-category*=".concat(category, "] .product-box--vendor-ad")).forEach(function(node) {
                            return triggerVendorAdCarousel(node);
                        });
                        $$(".all-offers__section [data-category*=".concat(category, "] .product-box--zevia")).forEach(function(node) {
                            return node.classList.add('animating');
                        });
                    }
                }

                function filterProductBoxes2(category) {
                    console.log('filterProductBoxes2', category);

                    if (category !== 'all') {
                        $$(".all-offers__section [data-category2*=".concat(category, "]")).forEach(function(node) {
                            node.classList.remove('hidden');
                        });
                        $$(".all-offers__section [data-category2]:not([data-category2*=".concat(category, "])")).forEach(function(node) {
                            node.classList.add('hidden');
                        });
                    } else {
                        var classList = $(".all-offers__section").classList;
                        var department = classList[classList.length - 1];
                        $$(".all-offers__section [data-category*=".concat(department, "]")).forEach(function(node) {
                            node.classList.remove('hidden');
                        });
                    }
                }

                function revealMenuCategory(category) {
                    var node = $(".submenu__dropdown [data-category=".concat(category, "]"));
                    $$('.submenu__dropdown').forEach(function(node) {
                        return node.classList.add('hidden');
                    });
                    $$('.submenu__dropdown .active').forEach(function(node) {
                        return node.classList.remove('active');
                    });

                    if (node) {
                        node.closest('.submenu__dropdown').classList.remove('hidden');
                        node.classList.add('active');
                    }
                }

                function generateCategoryList() {
                    var categories = [];
                    $$('.all-offers__section [data-category]').forEach(function(node) {
                        node.dataset.category.split(',').forEach(function(item) {
                            if (!categories.includes(item) && item != '') {
                                categories.push(item);
                            }
                        });
                    });
                    return categories;
                }

                function hideEmptyCategories() {
                    var categories = generateCategoryList();
                    $$('.product-box--category').forEach(function(node) {
                        if (node.dataset.category && !categories.includes(node.dataset.category)) {
                            node.closest('.col').classList.add('hidden');
                        }
                    });
                    $$('.submenu__dropdown [data-category]').forEach(function(node) {
                        if (!categories.includes(node.dataset.category)) {
                            node.closest('li').classList.add('hidden');
                        }
                    });
                }

                function toggleModal(e) {
                    var node = e.target.closest('.modal-parent').querySelector('.modal-wpr');
                    var video = node.querySelector('video');

                    if (node.classList.contains('hidden')) {
                        node.classList.remove('hidden');

                        if (video) {
                            video.play();
                        }
                    } else {
                        node.classList.add('hidden');

                        if (video) {
                            video.pause();
                        }
                    }

                    video.addEventListener('webkitendfullscreen', function() {
                        node.classList.add('hidden');
                    }, false);
                }

                function addToCart(productBox) {
                    var articleCode = productBox.querySelector('.product-description__code').innerText;
                    console.log('addToCart', articleCode);

                    if (articleCode) {
                        var item_json = {
                            custom1: articleCode
                        };
                        window.parent.postMessage(window.JSON.stringify({
                            type: 'ITEM_POP',
                            item: item_json
                        }), '*');
                    } else {
                        console.error('Unable to find article code for product.');
                    }
                }

                var sliderOptions = {
                    items: 1,
                    autoplay: true,
                    preventScrollOnTouch: 'auto',
                    swipeAngle: 30,
                    onInit: function onInit(info) {
                        for (var i = 0; i < info.slideItems.length; i++) {
                            var slide = info.slideItems[i];

                            if (slide.childNodes.length) {
                                if (slide.childNodes[1].classList.contains('primary-feature')) {
                                    slide.addEventListener('click', featureFilter.bind(null, 'primary', 'back to school'));
                                }

                                if (slide.childNodes[1].classList.contains('secondary-feature')) {
                                    slide.addEventListener('click', featureFilter.bind(null, 'secondary', 'bbq weekend'));
                                }

                                slide.addEventListener('click', function(e) {
                                    if (e.target.classList.contains('cart-button')) {
                                        addToList(e);
                                    } else {
                                        var productBox = e.target.closest('.product-box');
                                        if (!productBox.classList.contains('next-department') && !productBox.classList.contains('promotion')) addToCart(productBox);
                                    }
                                });
                            }
                        }

                        info.controlsContainer.querySelectorAll('button').forEach(function(node) {
                            return node.addEventListener('click', keepCarouselling.bind(null, info));
                        });
                    },
                    controlsText: ["<img src=\"".concat(require('assets/icons/back.svg'), "\" />"), "<img src=\"".concat(require('assets/icons/next.svg'), "\" />")]
                };

                function ttt() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }

                function keepCarouselling(info) {
                    sliders.forEach(function(slide) {
                        if (info.container.id === slide.getInfo().container.id) {
                            setTimeout(slide.play, 1);
                        }
                    });
                }

                function doubleSliderTransition(info) {
                    info.container.querySelector('.tns-slide-active video').currentTime = 0;
                }

                var addedToList;

                window.onload = function() {
                    [].forEach.call($$('.slider'), function(el) {
                        sliders.push(tns(_objectSpread({
                            container: el,
                            autoHeight: true
                        }, sliderOptions)));
                    });
                    sliders.forEach(function(slide) {
                        if (slide.getInfo().container.parentNode.parentNode.parentNode.parentNode.classList.contains('double')) {
                            slide.events.on('transitionStart', doubleSliderTransition);
                            window.setTimeout(function() {
                                slide.getInfo().container.querySelector('#tns1-item2 video').pause();
                                slide.pause();
                            }, 15000);
                        }
                    });
                    fixAllDescriptionOverflows();
                    hideEmptyCategories(); // event listeners

                    $$('.home-btn').forEach(function(node) {
                        return node.addEventListener('click', resetInitialView);
                    });
                    $('.menu__trigger').addEventListener('click', toggleMenu);
                    $('.menu .menu__dropdown').addEventListener('click', function(e) {
                        if (e.target.nodeName == 'UL') {
                            toggleMenu(e);
                        }
                    });
                    $('#addToList').addEventListener('click', toggleListMenu);
                    $('#list-modal').addEventListener('click', toggleListMenu);
                    $('#listShare').addEventListener('click', sendListEmail);
                    $('.menu__dropdown .promotion').addEventListener('click', function(e) {
                        filterProductBoxes('promotion');
                        toggleMenu(e);
                    });
                    $('.menu__dropdown .points').addEventListener('click', function(e) {
                        filterProductBoxes('points');
                        toggleMenu(e);
                    });
                    $('.menu__dropdown .seasonal').addEventListener('click', function(e) {
                        featureFilter('secondary', 'bbq weekend');
                        toggleMenu(e);
                    });
                    $('.menu__dropdown .weekly').addEventListener('click', function(e) {
                        featureFilter('primary', 'back to school');
                        toggleMenu(e);
                    });
                    $$('.submenu__trigger').forEach(function(node) {
                        return node.addEventListener('click', toggleSubMenu);
                    });
                    $$('.submenu__dropdown [data-category]').forEach(function(node) {
                        return node.addEventListener('click', function(e) {
                            filterProductBoxes(node.dataset.category);
                            toggleMenu(e);
                        });
                    });
                    $$('.filter-section form input').forEach(function(node) {
                        return node.addEventListener('click', function(e) {
                            filterProductBoxes2(e.target.value);
                        });
                    });
                    $('.header__right').addEventListener('keyup', toggleMenu);
                    $('.menu__click-away').addEventListener('click', toggleMenu);
                    $$('.all-offers').forEach(function(node) {
                        return node.addEventListener('click', viewAllOffers);
                    });
                    $$('.product-box--category').forEach(function(node) {
                        return node.addEventListener('click', function(e) {
                            filterProductBoxes(e.target.closest('.product-box--category').dataset.category);
                        });
                    });
                    $$('.video-btn').forEach(function(node) {
                        return node.addEventListener('click', toggleModal);
                    });
                    $$('.modal-wpr').forEach(function(node) {
                        return node.addEventListener('click', toggleModal);
                    });
                    $$('.interactive-badge').forEach(function(node) {
                        return node.addEventListener('click', toggleModal);
                    });
                    $$('.expandable').forEach(function(node) {
                        return node.addEventListener('click', toggleDescription);
                    });
                    $$('video').forEach(function(node) {
                        return node.addEventListener('click', function(e) {
                            return e.stopPropagation();
                        });
                    });
                    $$('.all-offers__section .product-box').forEach(function(node) {
                        return node.addEventListener('click', function(e) {
                            if (e.target.classList.contains('cart-button')) {
                                addToList(e);
                            } else {
                                var productBox = e.target.closest('.product-box');
                                if (!productBox.classList.contains('next-department') && !productBox.classList.contains('promotion')) addToCart(productBox);
                            }
                        });
                    });
                    $('#ttt').addEventListener('click', ttt);
                    $('#search').addEventListener('keyup', function(e) {
                        var query = e.target.value;

                        if (e.key === 'Enter') {
                            search(e);

                            if (window.innerWidth > 1250) {
                                e.target.blur();
                            }

                            e.target.value = query;
                        }
                    });
                    $('.close-icon').addEventListener('mousedown', function() {
                        if ($('.categories__section').classList.contains('hidden')) {
                            resetInitialView();
                        }

                        $('#search').value = null;
                    });
                    $('#search').addEventListener('blur', function(e) {
                        return e.target.value = null;
                    });
                    $$('.product-disclaimer').forEach(function(node) {
                        return node.addEventListener('click', toggleDisclaimer);
                    });
                    $('.next-department').addEventListener('click', viewNextDepartment);
                    addedToList = JSON.parse(window.localStorage.getItem('addedToList'));
                    if (!addedToList) addedToList = [];
                    else {
                        checkAddedToList();
                        checkExistingListOnLoad();
                    } // if (window.innerWidth > 628) {
                    //   triggerLandingAnimations()
                    // }

                    $('.product-box--weekly-feature video').addEventListener('click', weeklyFeature);
                    $('.primary-feature').addEventListener('click', featureFilter.bind(null, 'primary', 'back to school'));
                    $('.secondary-feature').addEventListener('click', featureFilter.bind(null, 'secondary', 'bbq weekend'));
                    document.getElementById('home').addEventListener('click', resetInitialView);
                };

                window.addEventListener('resize', function() {
                    fixAllDescriptionOverflows();
                });
                window.addEventListener('scroll', function() {
                    if (window.scrollY < window.innerHeight / 2) {
                        $('#ttt').classList.add('hidden');
                    } else {
                        $('#ttt').classList.remove('hidden');
                    }
                });

                function throttle(cb, interval) {
                    var now = Date.now();
                    return function() {
                        if (now + interval - Date.now() < 0) {
                            cb();
                            now = Date.now();
                        }
                    };
                }

                window.onscroll = throttle(callScrollFuncs, 100);

                function callScrollFuncs() {
                    if (window.innerWidth < 628) {
                        categoriesInViewport();
                        showHomeButton();
                    }

                    videoInViewport();
                    vendorAdInViewport();
                }

                var videos = document.getElementsByClassName('slider-video');

                function videoInViewport() {
                    for (var i = 0; i < videos.length; i++) {
                        var video = videos[i];

                        if (!video.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('hidden')) {
                            checkViewport(video);
                        }
                    }

                    function checkViewport(video) {
                        var rect = video.getBoundingClientRect();

                        if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                            video.play();
                        } else {
                            video.pause();
                        }
                    }
                }

                var vendorAds = document.querySelectorAll('.product-box--vendor-ad,.product-box--zevia');

                function vendorAdInViewport() {
                    for (var i = 0; i < vendorAds.length; i++) {
                        var vendorAd = vendorAds[i];
                        var parent = vendorAd.parentNode;
                        var parentParent = vendorAd.parentNode.parentNode;

                        if (!parent.classList.contains('hidden') && !parentParent.classList.contains('hidden')) {
                            var rect = vendorAd.getBoundingClientRect();

                            if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                                if (vendorAd.classList.contains('product-box--vendor-ad') && !vendorAd.classList.contains('animating')) {
                                    triggerVendorAdCarousel(vendorAd);
                                } else if (!vendorAd.classList.contains('animating')) {
                                    vendorAd.classList.add('animating');
                                }
                            }
                        }
                    }
                }

                function triggerVendorAdCarousel(vendorAd) {
                    vendorAd.classList.add('animating');

                    if (vendorAd.children[1].classList.contains('vendor-slider')) {
                        sliders.push(tns(_objectSpread({
                            container: vendorAd.children[1],
                            autoHeight: true
                        }, sliderOptions)));
                    }
                }

                function addToList(e) {
                    var id = e.target.closest('.product-box').id;
                    if (!id) return;

                    if (!e.target.classList.contains('added')) {
                        e.target.classList.add('added');
                        addedToList.push(id);
                    } else {
                        e.target.classList.remove('added');
                        addedToList = addedToList.filter(function(ids) {
                            return ids != id;
                        });
                    }

                    window.localStorage.setItem('addedToList', JSON.stringify(addedToList));
                    checkAddedToList();
                }

                function checkAddedToList() {
                    if (addedToList.length) {
                        document.getElementById('addToList').innerHTML = addedToList.length;
                    } else {
                        document.getElementById('addToList').innerHTML = '0';
                    }
                }

                function toggleListMenu(e) {
                    var id = e.target.id;
                    if (id != 'addToList' && id != 'list-modal' && id != 'list-close') return;
                    var classes = document.getElementById('list-modal').classList;

                    if (classes.contains('hidden')) {
                        classes.remove('hidden');
                        generateListItems();
                    } else {
                        classes.add('hidden');
                        document.getElementById('list-container').innerHTML = null;
                    }
                }

                var categories = $('.categories__section').children;

                function triggerLandingAnimations() {
                    var categoriesArr = Array.prototype.slice.call(categories);
                    categoriesArr = categoriesArr.filter(function(node) {
                        return !node.classList.contains('hidden') && !node.classList.contains('all-offers');
                    });
                    var i = 0;
                    setInterval(function() {
                        if (i > 0) categoriesArr[i - 1].querySelector('.product-box').classList.remove('active');
                        else categoriesArr[categoriesArr.length - 1].querySelector('.product-box').classList.remove('active');
                        categoriesArr[i].querySelector('.product-box').classList.add('active');

                        if (i === categoriesArr.length - 1) {
                            i = 0;
                        } else {
                            i++;
                        }
                    }, 2000);
                }

                function categoriesInViewport() {
                    for (var i = 0; i < categories.length; i++) {
                        var category = categories[i];

                        if (!category.classList.contains('hidden') && !category.classList.contains('all-offers')) {
                            var rect = category.getBoundingClientRect();

                            if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
                                category.querySelector('.product-box').classList.add('active');
                            } else {
                                category.querySelector('.product-box').classList.remove('active');
                            }
                        }
                    }
                }

                function weeklyFeature() {
                    $$(".all-offers__section .col").forEach(function(node) {
                        node.classList.add('hidden');
                    });
                    var matches = document.querySelectorAll('[data-page="Front Cover"], [data-page="Back Cover"], [data-page="Flap 1"], [data-page="Flap 2"], .next-department-col');
                    matches.forEach(function(node) {
                        return node.classList.remove('hidden');
                    });
                    $('.next-department-col').childNodes[1].classList.add('product-box--category', 'produce');
                    $('.all-offers__section').classList.add('filtered');
                    $('.features__section').classList.add('hidden');
                    resetOffers();
                    window.scrollTo(0, 0);
                }

                function featureFilter(target, feature) {
                    console.log('featureFilter', feature);
                    $$('.all-offers__section .col:not(.all-offers):not(.next-department-col)').forEach(function(node) {
                        node.classList.add('hidden');
                    });
                    $$('[data-' + target + '-feature="' + feature + '"]').forEach(function(node) {
                        return node.classList.remove('hidden');
                    });
                    $('.features__section').classList.add('hidden');
                    resetOffers();
                    window.scrollTo(0, 0);
                }

                var scrollPos = 0;

                function showHomeButton() {
                    if ($('.all-offers__section').classList.contains('hidden')) {
                        return;
                    } else {
                        var home = document.getElementById('home');

                        if (document.body.getBoundingClientRect().top > scrollPos) {
                            home.classList.add('active');
                        } else {
                            home.classList.remove('active');
                        }

                        scrollPos = document.body.getBoundingClientRect().top;
                    }
                }

                window.setTimeout(function() {
                    document.getElementById('ThisWeeksFeaturesVideo').play();
                }, 15000);
                window.setTimeout(function() {
                    document.querySelector('#mainViewAll .product-box--view-all').classList.add('animating');
                }, 20000);
                window.setTimeout(function() {
                    triggerLandingAnimations();
                }, 25000);
                var io = new IntersectionObserver(function(entries, observer) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            entry.target.src = entry.target.dataset.src;
                            observer.unobserve(entry.target);
                        }
                    });
                }, options);
                var images = document.querySelectorAll('.lazy');
                images.forEach(function(el) {
                    io.observe(el);
                });
                var options = {
                    root: null,
                    rootMargin: '0px 0px 30px 0px',
                    threshold: 0
                };

                //-----NEW FUNCTIONS-----

                document.querySelector('.automo').addEventListener('click', function() {
                    document.querySelector('.features__section').classList.add('hidden');
                    document.querySelector('#auto').style.display = 'none';
                    document.querySelector('#toolshardware').style.display = 'none';
                    document.querySelector('#homeessentials').style.display = 'none';
                    document.querySelector('#sportsrecreation').style.display = 'none';
                    document.querySelector('#outdoorliving').style.display = 'none';
                    document.querySelector('#frankid').style.display = 'none';
                    document.querySelector('#canvasid').style.display = 'none';
                    document.querySelector('#mastercraftid').style.display = 'none';
                    document.querySelector('#motomaster').classList.remove('hidden');
                    document.querySelector('#garmin').classList.remove('hidden');
                    document.querySelector('#dashcamera').classList.remove('hidden');
                    document.querySelector('#rearcamera').classList.remove('hidden');
                    document.querySelector('#carmats').classList.remove('hidden');
                    document.querySelector('#visor').classList.remove('hidden');
                    document.querySelector('#foodwarmer').classList.remove('hidden');
                    document.querySelector('#deals3').classList.remove('hidden');
                });
                document.querySelector('.garmin-btn').addEventListener('click', function() {
                    document.querySelector('.screen').classList.remove('hidden');
                });
                document.querySelector('#autodropdown').addEventListener('click', function() {
                    document.querySelector('.features__section').classList.add('hidden');
                    document.querySelector('#auto').style.display = 'none';
                    document.querySelector('#toolshardware').style.display = 'none';
                    document.querySelector('#homeessentials').style.display = 'none';
                    document.querySelector('#sportsrecreation').style.display = 'none';
                    document.querySelector('#outdoorliving').style.display = 'none';
                    document.querySelector('#frankid').style.display = 'none';
                    document.querySelector('#canvasid').style.display = 'none';
                    document.querySelector('#mastercraftid').style.display = 'none';
                    document.querySelector('#motomaster').classList.remove('hidden');
                    document.querySelector('#garmin').classList.remove('hidden');
                    document.querySelector('#dashcamera').classList.remove('hidden');
                    document.querySelector('#rearcamera').classList.remove('hidden');
                    document.querySelector('#carmats').classList.remove('hidden');
                    document.querySelector('#visor').classList.remove('hidden');
                    document.querySelector('#foodwarmer').classList.remove('hidden');
                    document.querySelector('#deals3').classList.remove('hidden'); // document.querySelector('.menu__dropdown').classList.add('hidden');
                });
                document.querySelectorAll('.modal-close2').forEach(function(e) {
                    e.addEventListener('click', function() {
                        document.querySelector('.screen').classList.add('hidden');
                        console.log('screenshotclose');
                    });
                });
                $('.menu__click-away').addEventListener('click', function() {
                    document.querySelector('.menu__click-away').style.display = 'none';
                });
                document.querySelectorAll('.menu__click-away').forEach(function(e) {
                    e.addEventListener('click', function() {
                        this.classList.add('hidden');
                        console.log('clickaway');
                    });
                });
                document.querySelector('.cart-button').addEventListener('click', function() {
                    document.querySelector('#garmin').classList.remove('hidden');
                }); //addtolist

                var cartbtn = document.querySelectorAll('.cart-button'),
                    count = 0;

                cartbtn.onclick = function() {
                    count += 1;
                    var addtolistbtn = document.getElementById("addToList");
                    addtolistbtn.innerHTML = count;
                    console.log('+');
                };
                var cartbtnmoto = document.querySelector('#motocartbtn'),
                    count = 0;

                cartbtnmoto.onclick = function() {
                    cartbtnmoto.classList.add('added');
                    count += 1;
                    var addtolistbtn = document.getElementById("addToList");
                    addtolistbtn.innerHTML = count;
                    console.log('+');
                };
                document.querySelector('.view-all-button').addEventListener('click', function() {
                    document.querySelector('.features__section').classList.add('hidden');
                    document.querySelector('#auto').style.display = 'none';
                    document.querySelector('#toolshardware').style.display = 'none';
                    document.querySelector('#homeessentials').style.display = 'none';
                    document.querySelector('#sportsrecreation').style.display = 'none';
                    document.querySelector('#outdoorliving').style.display = 'none';
                    document.querySelector('#frankid').style.display = 'none';
                    document.querySelector('#canvasid').style.display = 'none';
                    document.querySelector('#mastercraftid').style.display = 'none';
                    document.querySelector('#motomaster').classList.add('hidden');
                    document.querySelector('#garmin').classList.add('hidden');
                    document.querySelector('#deals2').classList.remove('hidden');
                    document.querySelector('#redalertdeals-2').classList.remove('hidden');
                    document.querySelector('#redalertdeals-3').classList.remove('hidden');
                    document.querySelector('#deals1').classList.remove('hidden');
                });

                document.querySelector('.home-btn').addEventListener('click', function() {
                    document.querySelector('.features__section').classList.remove('hidden');
                    document.querySelector('#auto').style.display = 'block';
                    document.querySelector('#toolshardware').style.display = 'block';
                    document.querySelector('#homeessentials').style.display = 'block';
                    document.querySelector('#sportsrecreation').style.display = 'block';
                    document.querySelector('#outdoorliving').style.display = 'block';
                    document.querySelector('#frankid').style.display = 'block';
                    document.querySelector('#canvasid').style.display = 'block';
                    document.querySelector('#mastercraftid').style.display = 'block';
                    document.querySelector('#motomaster').classList.add('hidden');
                    document.querySelector('#garmin').classList.add('hidden');
                    document.querySelector('#dashcamera').classList.add('hidden');
                    document.querySelector('#rearcamera').classList.add('hidden');
                    document.querySelector('#garmin').classList.add('hidden');
                    document.querySelector('#carmats').classList.add('hidden');
                    document.querySelector('#visor').classList.add('hidden');
                    document.querySelector('#foodwarmer').classList.add('hidden');
                    document.querySelector('#deals3').classList.add('hidden');
                    document.querySelector('#deals2').classList.add('hidden');
                    document.querySelector('#redalertdeals-2').classList.add('hidden');
                    document.querySelector('#redalertdeals-3').classList.add('hidden');
                    document.querySelector('#deals1').classList.add('hidden');
                });
                document.querySelector('.biggestsavings').addEventListener('click', function() {
                    document.querySelector('.searchbysavings').classList.remove('hidden');
                    console.log('savings');
                    document.querySelector('.menu__dropdown').classList.add('hidden');
                });
                document.querySelectorAll('.modal-close1').forEach(function(e) {
                    e.addEventListener('click', function() {
                        document.querySelector('.searchbysavings').classList.add('hidden');
                        console.log('close');
                    });
                });

                function search(e) {
                    var input = document.getElementById("search");

                    if (input = "abc") {
                        searchProductBoxes(query);
                        e.target.previousSibling.previousSibling.value = null;
                    } else {
                        resetInitialView();
                    }
                }

                document.querySelectorAll('.modal-close1').forEach(function(e) {
                    e.addEventListener('click', function() {
                        document.querySelector('.searchbysavings').classList.add('hidden');
                        console.log('close');
                    });
                });
                document.querySelectorAll('.modal-close2').forEach(function(e) {
                    e.addEventListener('click', function() {
                        document.querySelector('.popuplist').classList.add('hidden');
                        console.log('close');
                    });
                });
                document.querySelectorAll('#addToList').forEach(function(e) {
                    e.addEventListener('click', function() {
                        document.querySelector('.popuplist').classList.remove('hidden');
                        console.log('close');
                    });
                });

                document.querySelector('.menu__trigger').addEventListener('click', toggleMenu);
                document.querySelector('.submenu__trigger').addEventListener('click', toggleSubMenu);

            },
            { "./styles/main.scss": "styles/main.scss", "assets/icons/back.svg": "assets/icons/back.svg", "assets/icons/next.svg": "assets/icons/next.svg" }
        ],
        "../node_modules/parcel-bundler/src/builtins/hmr-runtime.js": [function(require, module, exports) {
            var global = arguments[3];
            var OVERLAY_ID = '__parcel__error__overlay__';
            var OldModule = module.bundle.Module;

            function Module(moduleName) {
                OldModule.call(this, moduleName);
                this.hot = {
                    data: module.bundle.hotData,
                    _acceptCallbacks: [],
                    _disposeCallbacks: [],
                    accept: function(fn) {
                        this._acceptCallbacks.push(fn || function() {});
                    },
                    dispose: function(fn) {
                        this._disposeCallbacks.push(fn);
                    }
                };
                module.bundle.hotData = null;
            }

            module.bundle.Module = Module;
            var checkedAssets, assetsToAccept;
            var parent = module.bundle.parent;

            if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
                var hostname = "" || location.hostname;
                var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
                var ws = new WebSocket(protocol + '://' + hostname + ':' + "52977" + '/');

                ws.onmessage = function(event) {
                    checkedAssets = {};
                    assetsToAccept = [];
                    var data = JSON.parse(event.data);

                    if (data.type === 'update') {
                        var handled = false;
                        data.assets.forEach(function(asset) {
                            if (!asset.isNew) {
                                var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

                                if (didAccept) {
                                    handled = true;
                                }
                            }
                        }); // Enable HMR for CSS by default.

                        handled = handled || data.assets.every(function(asset) {
                            return asset.type === 'css' && asset.generated.js;
                        });

                        if (handled) {
                            console.clear();
                            data.assets.forEach(function(asset) {
                                hmrApply(global.parcelRequire, asset);
                            });
                            assetsToAccept.forEach(function(v) {
                                hmrAcceptRun(v[0], v[1]);
                            });
                        } else {
                            window.location.reload();
                        }
                    }

                    if (data.type === 'reload') {
                        ws.close();

                        ws.onclose = function() {
                            location.reload();
                        };
                    }

                    if (data.type === 'error-resolved') {
                        console.log('[parcel] ✨ Error resolved');
                        removeErrorOverlay();
                    }

                    if (data.type === 'error') {
                        console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
                        removeErrorOverlay();
                        var overlay = createErrorOverlay(data);
                        document.body.appendChild(overlay);
                    }
                };
            }

            function removeErrorOverlay() {
                var overlay = document.getElementById(OVERLAY_ID);

                if (overlay) {
                    overlay.remove();
                }
            }

            function createErrorOverlay(data) {
                var overlay = document.createElement('div');
                overlay.id = OVERLAY_ID; // html encode message and stack trace

                var message = document.createElement('div');
                var stackTrace = document.createElement('pre');
                message.innerText = data.error.message;
                stackTrace.innerText = data.error.stack;
                overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
                return overlay;
            }

            function getParents(bundle, id) {
                var modules = bundle.modules;

                if (!modules) {
                    return [];
                }

                var parents = [];
                var k, d, dep;

                for (k in modules) {
                    for (d in modules[k][1]) {
                        dep = modules[k][1][d];

                        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
                            parents.push(k);
                        }
                    }
                }

                if (bundle.parent) {
                    parents = parents.concat(getParents(bundle.parent, id));
                }

                return parents;
            }

            function hmrApply(bundle, asset) {
                var modules = bundle.modules;

                if (!modules) {
                    return;
                }

                if (modules[asset.id] || !bundle.parent) {
                    var fn = new Function('require', 'module', 'exports', asset.generated.js);
                    asset.isNew = !modules[asset.id];
                    modules[asset.id] = [fn, asset.deps];
                } else if (bundle.parent) {
                    hmrApply(bundle.parent, asset);
                }
            }

            function hmrAcceptCheck(bundle, id) {
                var modules = bundle.modules;

                if (!modules) {
                    return;
                }

                if (!modules[id] && bundle.parent) {
                    return hmrAcceptCheck(bundle.parent, id);
                }

                if (checkedAssets[id]) {
                    return;
                }

                checkedAssets[id] = true;
                var cached = bundle.cache[id];
                assetsToAccept.push([bundle, id]);

                if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
                    return true;
                }

                return getParents(global.parcelRequire, id).some(function(id) {
                    return hmrAcceptCheck(global.parcelRequire, id);
                });
            }

            function hmrAcceptRun(bundle, id) {
                var cached = bundle.cache[id];
                bundle.hotData = {};

                if (cached) {
                    cached.hot.data = bundle.hotData;
                }

                if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
                    cached.hot._disposeCallbacks.forEach(function(cb) {
                        cb(bundle.hotData);
                    });
                }

                delete bundle.cache[id];
                bundle(id);
                cached = bundle.cache[id];

                if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
                    cached.hot._acceptCallbacks.forEach(function(cb) {
                        cb();
                    });

                    return true;
                }
            }
        }, {}]
    }, {}, ["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js", "app.js"], null)
    //# sourceMappingURL=/app.c328ef1a.js.map