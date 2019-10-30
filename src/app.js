import './styles/main.scss'

let sliders = []
const $ = function (selector) {
  return document.querySelector(selector)
}
const $$ = function (selector) {
  return document.querySelectorAll(selector)
}

function fixDescriptionOverflow(node) {
  const description = node.dataset.description
  const isDouble = !!node.closest('.product-box--double') && window.innerWidth >= 628
  const isMustBuy = !!node.closest('.product-box--must-buy')

  if (description.length > 60 && isMustBuy) {
    node.innerHTML = description.match(/^.{60}\w*/)[0] + '…'
    node.classList.add('expandable')
  } else if (description.length > 80 && !isDouble) {
    node.innerHTML = description.match(/^.{80}\w*/)[0] + '…'
    node.classList.add('expandable')
  } else if (isDouble) {
    node.innerHTML = description
    node.classList.remove('expandable')
  }
}

function fixAllDescriptionOverflows() {
  const priceBoxInners = $$('.product-description__copy')
  priceBoxInners.forEach(node => fixDescriptionOverflow(node))
}

function toggleMenu(e) {
  const menuClasses = $('nav.menu').classList
  if (e.key) {
    if (e.keyCode === 27) {
      menuClasses.remove('menu--open')
    }
  } else {
    if (menuClasses.contains('menu--open')) {
      menuClasses.remove('menu--open')
    } else {
      menuClasses.add('menu--open')
    }
  }
}

function toggleDescription(e) {
  if (e.target.classList.contains('expanded')) {
    e.target.classList.remove('expanded')
    fixDescriptionOverflow(e.target)
  } else {
    const width = e.target.clientWidth - 6
    e.target.classList.add('expanded')
    e.target.innerHTML = e.target.dataset.description
    e.target.style.width = `${width}px`
  }
}

function toggleSubMenu(e) {
  e.preventDefault()
  const submenu = e.target.parentElement.querySelector('.submenu__dropdown')
  if (submenu.classList.contains('hidden')) {
    $$('.submenu__dropdown').forEach(node => node.classList.add('hidden'))
    submenu.classList.remove('hidden')
  } else {
    submenu.classList.add('hidden')
  }
}

function scrollToEl(selector) {
  if (window.innerWidth < 1250) {
    window.setTimeout(function () {
      window.scrollTo({
        top: $(selector).offsetTop - $('.header').clientHeight,
        behavior: 'smooth'
      })
    }, 0);
  }
}

let offersView = false

function resetOffers() {
  offersView = true
  $('.categories__section').classList.add('hidden')
  $('.all-offers__section').classList.remove('hidden')
  fixAllDescriptionOverflows()
  disclaimerTiming()
}

function viewAllOffers(e) {
  $('.features__section').classList.add('hidden')
  $('.menu').classList.remove('menu--open')
  if (e.target.closest('nav')) {
    resetInitialView()
    resetOffers()
  } else if (e.target.closest('.all-offers__section')) {
    const classList = e.target.closest('.all-offers__section').classList.length
    if (classList >= 3) {
      offersView = false
      resetInitialView()
    } else {
      resetOffers()
    }
  } else if (e.target.closest('.categories__section')) {
    resetOffers()
  }
  // scrollToEl('.all-offers__section')
}

function resetInitialView() {
  document.getElementById('home').classList.remove('active')
  $('.features__section').classList.remove('hidden')
  $('.all-offers__section').classList.add('hidden')
  // $('.all-offers').classList.remove('hidden')
  $('.categories__section').classList.remove('hidden')
  $$('[data-category]').forEach(node => {
    node.classList.remove('hidden')
  })
  $$('.submenu__dropdown .active').forEach(node => node.classList.remove('active'))
  $$('.product-disclaimer.active').forEach(node => node.classList.remove('active'))
  $$('.submenu__dropdown').forEach(node => node.classList.add('hidden'))
  $('.menu').classList.remove('menu--open')
  window.scrollTo(0, 0)
  sliders.forEach(slider => {
    slider.goTo(1)
  })
  $('.all-offers__section').classList.remove('filtered')
  $('.all-offers__section').classList.remove('produce')
  $$('.filter-section form input').forEach(node => node.checked = false)
  document.getElementById('no-results').classList.add('hidden')
  offersView = false
}

function filterProductBoxes(category) {
  console.log('filterProductBoxes', category)

  $$('.filter-section form input').forEach(node => node.checked = false)
  if (category === 'promotion') {
    $$('.all-offers__section .col.hidden').forEach(node => {
      node.classList.remove('hidden')
    })
    $$('.all-offers__section .product-box:not(.promotion)').forEach(node => {
      node.closest('.col').classList.add('hidden')
    })
  } else if (category === 'points') {
    $$('.all-offers__section .col').forEach(node => {
      node.classList.add('hidden')
    })
    $$('.all-offers__section .points-badge').forEach(node => {
      node.closest('.col').classList.remove('hidden')
    })
  } else {
    $('.all-offers__section').classList.add('filtered')
    if (category === 'produce') {
      $('.all-offers__section').classList.add('produce')
    } else {
      $('.all-offers__section').classList.remove('produce')
    }
    const nextDepartment = $('.next-department')
    const nextDepartmentCategory = getNextDepartmentCategory(category)
    nextDepartment.className = `next-department product-box product-box--category ${nextDepartmentCategory}`
    $$(`.all-offers__section [data-category*=${category}]`).forEach(node => {
      node.classList.remove('hidden')
    })
    $$(`.all-offers__section [data-category]:not([data-category*=${category}])`).forEach(node => {
      node.classList.add('hidden')
    })
  }
  revealMenuCategory(category)

  $('.features__section').classList.add('hidden')
  resetOffers()
  window.scrollTo(0, 0)

  let isScrollable = document.body.scrollHeight > window.innerHeight;
  if (!isScrollable) {
    $$(`.all-offers__section [data-category*=${category}] .product-box--vendor-ad`).forEach(node => triggerVendorAdCarousel(node))
    $$(`.all-offers__section [data-category*=${category}] .product-box--zevia`).forEach(node => node.classList.add('animating'))
  }
}

function filterProductBoxes2(category) {
  console.log('filterProductBoxes2', category)
  if (category !== 'all') {
    $$(`.all-offers__section [data-category2*=${category}]`).forEach(node => {
      node.classList.remove('hidden')
    })
    $$(`.all-offers__section [data-category2]:not([data-category2*=${category}])`).forEach(node => {
      node.classList.add('hidden')
    })
  } else {
    const classList = $(`.all-offers__section`).classList
    const department = classList[classList.length - 1]
    $$(`.all-offers__section [data-category*=${department}]`).forEach(node => {
      node.classList.remove('hidden')
    })
  }
}

function revealMenuCategory(category) {
  const node = $(`.submenu__dropdown [data-category=${category}]`)
  $$('.submenu__dropdown').forEach(node => node.classList.add('hidden'))
  $$('.submenu__dropdown .active').forEach(node => node.classList.remove('active'))
  if (node) {
    node.closest('.submenu__dropdown').classList.remove('hidden')
    node.classList.add('active')
  }
}

function generateCategoryList() {
  const categories = []
  $$('.all-offers__section [data-category]').forEach(node => {
    node.dataset.category.split(',').forEach(item => {
      if (!categories.includes(item) && item != '') {
        categories.push(item)
      }
    })
  })
  return categories
}

function hideEmptyCategories() {
  const categories = generateCategoryList()

  $$('.product-box--category').forEach(node => {
    if (node.dataset.category && !categories.includes(node.dataset.category)) {
      node.closest('.col').classList.add('hidden')
    }
  })
  $$('.submenu__dropdown [data-category]').forEach(node => {
    if (!categories.includes(node.dataset.category)) {
      node.closest('li').classList.add('hidden')
    }
  })
}

function toggleModal(e) {
  const node = e.target.closest('.modal-parent').querySelector('.modal-wpr')
  const video = node.querySelector('video')

  if (node.classList.contains('hidden')) {
    node.classList.remove('hidden')
    if (video) {
      video.play()
    }
  } else {
    node.classList.add('hidden')
    if (video) {
      video.pause()
    }
  }
  video.addEventListener('webkitendfullscreen', function () {
    node.classList.add('hidden')
  }, false);
}

function addToCart(productBox) {
  const articleCode = productBox.querySelector('.product-description__code').innerText
  console.log('addToCart', articleCode)
  if (articleCode) {
    const item_json = {
      custom1: articleCode
    }

    window.parent.postMessage(
      window.JSON.stringify({
        type: 'ITEM_POP',
        item: item_json
      }), '*')
  } else {
    console.error('Unable to find article code for product.')
  }
}


const sliderOptions = {
  items: 1,
  autoplay: true,
  preventScrollOnTouch: 'auto',
  swipeAngle: 30,
  onInit: function (info) {
    for (let i = 0; i < info.slideItems.length; i++) {
      let slide = info.slideItems[i]
      if (slide.childNodes.length) {
        if (slide.childNodes[1].classList.contains('primary-feature')) {
          slide.addEventListener('click', featureFilter.bind(null, 'primary', 'back to school'))
        }
        if (slide.childNodes[1].classList.contains('secondary-feature')) {
          slide.addEventListener('click', featureFilter.bind(null, 'secondary', 'bbq weekend'))
        }

        slide.addEventListener('click', (e) => {
          if (e.target.classList.contains('cart-button')) {
            addToList(e)
          } else {
            const productBox = e.target.closest('.product-box')
            if (
              !productBox.classList.contains('next-department') &&
              !productBox.classList.contains('promotion')
            )
              addToCart(productBox)
          }
        })
      }
    }
    info.controlsContainer.querySelectorAll('button').forEach(node => node.addEventListener('click', keepCarouselling.bind(null, info)))
  },
  controlsText: [`<img src="${require('./assets/icons/back.svg')}" />`, `<img src="${require('./assets/icons/next.svg')}" />`]
}

function ttt() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function search(e) {
  let query = e.target.value.toLowerCase();
  if (query) {
    searchProductBoxes(query)
    e.target.previousSibling.previousSibling.value = null
  } else {
    resetInitialView()
  }
}

function searchProductBoxes(query) {
  if ($$(`.all-offers__section [data-keywords*=${`'` + query + `'`}]`).length) {
    $('.features__section').classList.add('hidden')
    $('.categories__section').classList.add('hidden')
    $('.all-offers__section').classList.remove('hidden')
    document.getElementById('no-results').classList.add('hidden')
    document.getElementsByClassName('all-offers__section')[0].classList.remove('produce')
    $$(`.all-offers__section .col`).forEach(node => node.classList.add('hidden'))
    $$(`.all-offers__section [data-keywords*=${`'` + query + `'`}]`).forEach(node => node.classList.remove('hidden'))
  } else {
    noResults()
  }
}

function noResults() {
  let node = document.getElementById('no-results')
  node.classList.remove('hidden')
  setTimeout(function () { node.classList.add('hidden') }, 2000);
}

function keepCarouselling(info) {
  sliders.forEach(slide => {
    if (info.container.id === slide.getInfo().container.id) {
      setTimeout(slide.play, 1);
    }
  })
}

function doubleSliderTransition(info) {
  info.container.querySelector('.tns-slide-active video').currentTime = 0
}

let addedToList
window.onload = () => {
  [].forEach.call($$('.slider'), function (el) {
    sliders.push(tns({
      container: el,
      autoHeight: true,
      ...sliderOptions
    }));
  });

  sliders.forEach(slide => {
    if (slide.getInfo().container.parentNode.parentNode.parentNode.parentNode.classList.contains('double')) {
      slide.events.on('transitionStart', doubleSliderTransition);
      window.setTimeout(function () {
        slide.getInfo().container.querySelector('#tns1-item2 video').pause()
        slide.pause()
      }, 15000);
    }
  })

  fixAllDescriptionOverflows()
  hideEmptyCategories()


  // event listeners
  $$('.home-btn').forEach(node => node.addEventListener('click', resetInitialView))
  $('.menu__trigger').addEventListener('click', toggleMenu)
  $('.menu .menu__dropdown').addEventListener('click', (e) => {
    if (e.target.nodeName == 'UL') {
      toggleMenu(e)
    }
  })
  $('#addToList').addEventListener('click', toggleListMenu)
  $('#list-modal').addEventListener('click', toggleListMenu)
  $('#listShare').addEventListener('click', sendListEmail)

  $('.menu__dropdown .promotion').addEventListener('click', (e) => {
    filterProductBoxes('promotion')
    toggleMenu(e)
  })
  $('.menu__dropdown .points').addEventListener('click', (e) => {
    filterProductBoxes('points')
    toggleMenu(e)
  })
  $('.menu__dropdown .seasonal').addEventListener('click', (e) => {
    featureFilter('secondary', 'bbq weekend')
    toggleMenu(e)
  })
  $('.menu__dropdown .weekly').addEventListener('click', (e) => {
    featureFilter('primary', 'back to school')
    toggleMenu(e)
  })

  $$('.submenu__trigger').forEach(node => node.addEventListener('click', toggleSubMenu))
  $$('.submenu__dropdown [data-category]').forEach(node => node.addEventListener('click', (e) => {
    filterProductBoxes(node.dataset.category)
    toggleMenu(e)
  }))

  $$('.filter-section form input').forEach(node => node.addEventListener('click', (e) => {
    filterProductBoxes2(e.target.value)
  }))

  $('.header__right').addEventListener('keyup', toggleMenu)
  $('.menu__click-away').addEventListener('click', toggleMenu)
  $$('.all-offers').forEach(node => node.addEventListener('click', viewAllOffers))
  $$('.product-box--category').forEach(node => node.addEventListener('click', (e) => {
    filterProductBoxes(e.target.closest('.product-box--category').dataset.category)
  }))
  $$('.video-btn').forEach(node => node.addEventListener('click', toggleModal))
  $$('.modal-wpr').forEach(node => node.addEventListener('click', toggleModal))
  $$('.interactive-badge').forEach(node => node.addEventListener('click', toggleModal))
  $$('.expandable').forEach(node => node.addEventListener('click', toggleDescription))
  $$('video').forEach(node => node.addEventListener('click', (e) => e.stopPropagation()))
  $$('.all-offers__section .product-box').forEach(node => node.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-button')) {
      addToList(e)
    } else {
      const productBox = e.target.closest('.product-box')
      if (!productBox.classList.contains('next-department') && !productBox.classList.contains('promotion')) addToCart(productBox)
    }
  }))

  $('#ttt').addEventListener('click', ttt)
  $('#search').addEventListener('keyup', function (e) {
    const query = e.target.value
    if (e.key === 'Enter') {
      search(e)
      if (window.innerWidth > 1250) {
        e.target.blur()
      }
      e.target.value = query
    }
  })
  $('.close-icon').addEventListener('mousedown', () => {
    if ($('.categories__section').classList.contains('hidden')) {
      resetInitialView()
    }
    $('#search').value = null
  })
  $('#search').addEventListener('blur', (e) => e.target.value = null)

  $$('.product-disclaimer').forEach(node => node.addEventListener('click', toggleDisclaimer))
  $('.next-department').addEventListener('click', viewNextDepartment)


  addedToList = JSON.parse(window.localStorage.getItem('addedToList'))
  if (!addedToList) addedToList = []
  else {
    checkAddedToList()
    checkExistingListOnLoad()
  }

  // if (window.innerWidth > 628) {
  //   triggerLandingAnimations()
  // }

  $('.product-box--weekly-feature video').addEventListener('click', weeklyFeature)
  $('.primary-feature').addEventListener('click', featureFilter.bind(null, 'primary', 'back to school'))
  $('.secondary-feature').addEventListener('click', featureFilter.bind(null, 'secondary', 'bbq weekend'))

  document.getElementById('home').addEventListener('click', resetInitialView)
}

window.addEventListener('resize', () => {
  fixAllDescriptionOverflows()
})

window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight / 2) {
    $('#ttt').classList.add('hidden')
  } else {
    $('#ttt').classList.remove('hidden')
  }
})

function throttle(cb, interval) {
  var now = Date.now();
  return function () {
    if ((now + interval - Date.now()) < 0) {
      cb();
      now = Date.now();
    }
  }
}
window.onscroll = throttle(callScrollFuncs, 100);
function callScrollFuncs() {
  if (window.innerWidth < 628) {
    categoriesInViewport()
    showHomeButton()
  }

  videoInViewport()
  vendorAdInViewport()
}

const videos = document.getElementsByClassName('slider-video');
function videoInViewport() {
  for (let i = 0; i < videos.length; i++) {
    let video = videos[i];
    if (!video.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('hidden')) {
      checkViewport(video)
    }
  }

  function checkViewport(video) {
    let rect = video.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      video.play()
    } else {
      video.pause()
    }
  }
}

const vendorAds = document.querySelectorAll('.product-box--vendor-ad,.product-box--zevia')
function vendorAdInViewport() {
  for (let i = 0; i < vendorAds.length; i++) {
    let vendorAd = vendorAds[i];
    let parent = vendorAd.parentNode
    let parentParent = vendorAd.parentNode.parentNode
    if (!parent.classList.contains('hidden') && !parentParent.classList.contains('hidden')) {
      let rect = vendorAd.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        if (vendorAd.classList.contains('product-box--vendor-ad') && !vendorAd.classList.contains('animating')) {
          triggerVendorAdCarousel(vendorAd)
        } else if (!vendorAd.classList.contains('animating')) {
          vendorAd.classList.add('animating')
        }
      }
    }
  }
}

function triggerVendorAdCarousel(vendorAd) {
  vendorAd.classList.add('animating')
  if (vendorAd.children[1].classList.contains('vendor-slider')) {
    sliders.push(tns({
      container: vendorAd.children[1],
      autoHeight: true,
      ...sliderOptions
    }));
  }
}

function disclaimerTiming() {
  const disclaimers = document.getElementsByClassName('product-disclaimer')
  for (let i = 0; i < disclaimers.length; i++) {
    let node = disclaimers[i].childNodes[1]
    let height = node.offsetHeight
    if (height > 16) node.style.animationDuration = height / 3 + 's';
  }
}

function toggleDisclaimer(e) {
  const node = e.target.parentElement
  if (!node.classList.contains('active')) {
    node.classList.add('active')
  } else {
    node.classList.remove('active')
    node.classList.add('viewed')
  }
}

function getNextDepartmentCategory(department) {
  const categories = generateCategoryList()
  const next = categories[categories.indexOf(department) + 1]
  if (next) return next
  else return categories[0]
}

function viewNextDepartment(e) {
  const department = e.target.closest('.next-department').classList[3]
  filterProductBoxes(department)
}

function addToList(e) {
  let id = e.target.closest('.product-box').id
  if (!id) return

  if (!e.target.classList.contains('added')) {
    e.target.classList.add('added')
    addedToList.push(id)
  }
  else {
    e.target.classList.remove('added')
    addedToList = addedToList.filter(ids => ids != id)
  }
  window.localStorage.setItem('addedToList', JSON.stringify(addedToList))
  checkAddedToList()
}

function checkAddedToList() {
  if (addedToList.length) {
    document.getElementById('addToList').innerHTML = addedToList.length
  } else {
    document.getElementById('addToList').innerHTML = '0'
  }
}

function toggleListMenu(e) {
  const id = e.target.id
  if (id != 'addToList' && id != 'list-modal' && id != 'list-close') return
  const classes = document.getElementById('list-modal').classList
  if (classes.contains('hidden')) {
    classes.remove('hidden')
    generateListItems()
  } else {
    classes.add('hidden')
    document.getElementById('list-container').innerHTML = null
  }
}

function generateListItems() {
  for (let i = 0; i < addedToList.length; i++) {
    let node = document.getElementById(addedToList[i]).cloneNode(true)

    // node.querySelector('.price-box').remove()
    let badge = node.querySelector('.points-badge')
    if (badge) badge.remove()
    let logo = node.querySelector('.logo-badge')
    if (logo) logo.remove()
    let price = node.querySelector('.price-box__price')
    node.querySelector('.product-description').prepend(price)

    let priceBox = node.querySelector('.price-box')
    if (priceBox) priceBox.remove()

    let disclaimer = node.querySelector('.product-disclaimer')
    if (disclaimer) disclaimer.remove()
    let cart = node.querySelector('.cart-button')
    if (cart) cart.remove()

    let child = document.createElement('div')
    child.innerHTML = '<div class="product-box" id="' + node.id + '">' + node.innerHTML + '<i class="remove-list"></i></div>'
    child.classList.add('col')
    document.getElementById('list-container').appendChild(child)

    $$('.remove-list').forEach(node => node.addEventListener('click', removeFromList))
  }
}

function checkExistingListOnLoad() {
  for (let i = 0; i < addedToList.length; i++) {
    document.getElementById(addedToList[i]).querySelector('.cart-button').classList.add('added')
  }
}

function removeFromList(e) {
  const id = e.target.parentNode.id
  e.target.parentNode.remove()
  addedToList = addedToList.filter(listIds => listIds != id)
  window.localStorage.setItem('addedToList', JSON.stringify(addedToList))
  checkAddedToList()
}

function sendListEmail() {
  console.log('sendListEmail', $('#shareEmail').value)
  const email = $('#shareEmail').value
  let body = 'Here is your shopping list: %0D%0A here is a new line %0D%0A and a nother'
  body += document.getElementById('list-container').innerHTML
  window.location.href = `mailto:${email}?subject=Loblaws Shopping List&body=${body}`
}

const categories = $('.categories__section').children
function triggerLandingAnimations() {
  let categoriesArr = Array.prototype.slice.call(categories)
  categoriesArr = categoriesArr.filter(node => !node.classList.contains('hidden') && !node.classList.contains('all-offers'))

  let i = 0;
  setInterval(function () {
    if (i > 0) categoriesArr[i - 1].querySelector('.product-box').classList.remove('active')
    else categoriesArr[categoriesArr.length - 1].querySelector('.product-box').classList.remove('active')
    categoriesArr[i].querySelector('.product-box').classList.add('active')
    if (i === categoriesArr.length - 1) {
      i = 0
    } else {
      i++
    }
  }, 2000);
}

function categoriesInViewport() {
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i]

    if (!category.classList.contains('hidden') && !category.classList.contains('all-offers')) {
      let rect = category.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        category.querySelector('.product-box').classList.add('active')
      } else {
        category.querySelector('.product-box').classList.remove('active')
      }
    }
  }
}

function weeklyFeature() {
  $$(`.all-offers__section .col`).forEach(node => {
    node.classList.add('hidden')
  })

  let matches = document.querySelectorAll('[data-page="Front Cover"], [data-page="Back Cover"], [data-page="Flap 1"], [data-page="Flap 2"], .next-department-col')
  matches.forEach(node => node.classList.remove('hidden'))

  $('.next-department-col').childNodes[1].classList.add('product-box--category', 'produce');
  $('.all-offers__section').classList.add('filtered');

  $('.features__section').classList.add('hidden')
  resetOffers()
  window.scrollTo(0, 0)
}

function featureFilter(target, feature) {
  console.log('featureFilter', feature)
  $$('.all-offers__section .col:not(.all-offers):not(.next-department-col)').forEach(node => {
    node.classList.add('hidden')
  })

  $$('[data-' + target + '-feature="' + feature + '"]').forEach(node => node.classList.remove('hidden'))
  $('.features__section').classList.add('hidden')
  resetOffers()
  window.scrollTo(0, 0)
}

var scrollPos = 0;
function showHomeButton() {
  if ($('.all-offers__section').classList.contains('hidden')) {
    return
  } else {
    let home = document.getElementById('home');
    if ((document.body.getBoundingClientRect()).top > scrollPos) {
      home.classList.add('active');
    } else {
      home.classList.remove('active');
    }
    scrollPos = (document.body.getBoundingClientRect()).top;
  }
}

window.setTimeout(function () {
  document.getElementById('ThisWeeksFeaturesVideo').play()
}, 15000);

window.setTimeout(function () {
  document.querySelector('#mainViewAll .product-box--view-all').classList.add('animating')
}, 20000);

window.setTimeout(function () {
  triggerLandingAnimations()
}, 25000);



const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  })
}, options)

const images = document.querySelectorAll('.lazy');
images.forEach((el) => {
  io.observe(el);
})

const options = {
  root: null,
  rootMargin: '0px 0px 30px 0px',
  threshold: 0
}


//-----NEW FUNCTIONS-----


$('.ecom').addEventListener('click', ecompopup)

function ecompopup() {
  var x = document.getElementById("garmin");
  if (x.style.display === "none") {
    x.style.display = "block";
    console.log('HIIIblock')
  } else {
    x.style.display = "none";
    console.log('HIIInone')
  }
}

document.querySelector('.automo').addEventListener('click', function () {
  document.querySelector('.grid').style.display = 'none';
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
  document.querySelector('#traingle').classList.remove('hidden');
  document.querySelector('#motomaster1').classList.remove('hidden');
  document.querySelector('#garmin1').classList.remove('hidden');
  document.querySelector('#auto1').classList.remove('hidden');
  document.querySelector('#auto2').classList.remove('hidden');
  document.querySelector('#auto3').classList.remove('hidden');
  document.querySelector('#auto4').classList.remove('hidden');
  document.querySelector('#auto5').classList.remove('hidden');
  document.querySelector('#auto6').classList.remove('hidden');
  
})

document.querySelector('.garmin-btn').addEventListener('click', function () {
  document.querySelector('.screen').classList.remove('hidden');
})



document.querySelector('#autodropdown').addEventListener('click', function () {
  document.querySelector('.grid').style.display = 'none';
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
  // document.querySelector('.menu__dropdown').classList.add('hidden');
})

document.querySelectorAll('.modal-close2').forEach(function(e) {
  e.addEventListener('click', function() {
    document.querySelector('.screen').classList.add('hidden');
    console.log('screenshotclose')
  })
});


$('.menu__click-away').addEventListener('click', function () {
  document.querySelector('.menu__click-away').style.display = 'none';
})

document.querySelectorAll('.menu__click-away').forEach(function(e) {
  e.addEventListener('click', function() {
    this.classList.add('hidden');
    console.log('clickaway')
  })
});

document.querySelector('.cart-button').addEventListener('click', function () {
  document.querySelector('#garmin').classList.remove('hidden');
})

//addtolist
var cartbtn = document.querySelectorAll('.cart-button'),
  count = 0;
  cartbtn.onclick = function() {
  count += 1;
  var addtolistbtn = document.getElementById("addToList")
  addtolistbtn.innerHTML = count;
  console.log('+')
};

// //removefromlist
// var cartbtn1 = document.querySelector('.cart-button added'),
//   count1 = 1;
//  cartbtn1.onclick = function() {
//   cartbtn1.classList.remove('added');
//   count1 -= 1;
//   var addtolistbtn1 = document.getElementById("addToList")
//   addtolistbtn1.innerHTML = count1;
//   console.log('-')
// };

var cartbtnmoto = document.querySelector('#motocartbtn'),
  count = 0;
 cartbtnmoto.onclick = function() {
  cartbtnmoto.classList.add('added');
  count += 1;
  var addtolistbtn = document.getElementById("addToList")
  addtolistbtn.innerHTML = count;
  console.log('+')
};

// var cartbtnmoto = document.querySelector('#motocartbtngarmin'),
//   count = 0;
//  cartbtnmoto.onclick = function() {
//   cartbtnmoto.classList.add('added');
//   count += 1;
//   var addtolistbtn = document.getElementById("addToList")
//   addtolistbtn.innerHTML = count;
//   console.log('+')
// };

// var cartbtnmoto1 = document.querySelector('.cart-button added'),
//   count1 = 1;
//  cartbtnmoto1.onclick = function() {
//   cartbtnmoto1.classList.remove('added');
//   count1 -= 1;
//   var addtolistbtn = document.getElementById("addToList")
//   addtolistbtn.innerHTML = count1;
//   console.log('+')
// };

// document.querySelector('.cart-button').addEventListener('click', function(){
//     document.querySelector('.screen').classList.remove('hidden');})


document.querySelector('.view-all-button').addEventListener('click', function () {
  document.querySelector('.grid').classList.add('hidden');
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
})

document.querySelector('.home-btn').addEventListener('click', function () {
  document.querySelector('.grid').style.display = 'block';
  document.querySelector('#auto').style.display = 'block';
  document.querySelector('#toolshardware').style.display = 'block';
  document.querySelector('#homeessentials').style.display = 'block';
  document.querySelector('#sportsrecreation').style.display = 'block';
  document.querySelector('#outdoorliving').style.display = 'block';
  document.querySelector('#frankid').style.display = 'block';
  document.querySelector('#canvasid').style.display = 'block';
  document.querySelector('#mastercraftid').style.display = 'block';
  document.querySelector('#motomaster').classList.add('hidden');
  document.querySelector('#ceilingfan').classList.add('hidden');
  document.querySelector('#nestingtote').classList.add('hidden');
  document.querySelector('#maxdrill').classList.add('hidden');
  document.querySelector('#dashcamera').classList.add('hidden');
  document.querySelector('#traingle').classList.add('hidden');
  document.querySelector('#motomaster1').classList.add('hidden');
  document.querySelector('#garmin1').classList.add('hidden');
  document.querySelector('#garmin').classList.add('hidden');
  document.querySelector('#deals1').classList.add('hidden');
  document.querySelector('#deals2').classList.add('hidden');
  document.querySelector('#deals3').classList.add('hidden');;
  document.querySelector('#auto1').classList.add('hidden');
  document.querySelector('#auto2').classList.add('hidden');
  document.querySelector('#auto3').classList.add('hidden');
  document.querySelector('#auto4').classList.add('hidden');
  document.querySelector('#auto5').classList.add('hidden');
  document.querySelector('#auto6').classList.add('hidden');
})

document.querySelector('.biggestsavings').addEventListener('click', function () {
  document.querySelector('.searchbysavings').classList.remove('hidden');
  console.log('savings')
  document.querySelector('.menu__dropdown').classList.add('hidden');
})

document.querySelectorAll('.modal-close1').forEach(function(e) {
  e.addEventListener('click', function() {
    document.querySelector('.searchbysavings').classList.add('hidden');
    console.log('close')
  })
});

//Search
document.querySelector('#search').addEventListener('click', function () {
  document.querySelector('.searchbysavings').classList.remove('hidden');
  console.log('savings')
})



function search(e) {

  var input = document.getElementById("search");

  if (input="abc") {
    searchProductBoxes(query)
    e.target.previousSibling.previousSibling.value = null
  } else {
    resetInitialView()
  }
}

document.querySelectorAll('.modal-close1').forEach(function(e) {
  e.addEventListener('click', function() {
    document.querySelector('.searchbysavings').classList.add('hidden');
    console.log('close')
  })
});

document.querySelectorAll('.modal-close2').forEach(function(e) {
  e.addEventListener('click', function() {
    document.querySelector('.popuplist').classList.add('hidden');
    console.log('close')
  })
});

document.querySelectorAll('#addToList').forEach(function(e) {
  e.addEventListener('click', function() {
    document.querySelector('.popuplist').classList.remove('hidden');
    console.log('close')
  })
});


document.querySelector('.menu__trigger').addEventListener('click', toggleMenu);

document.querySelector('.submenu__trigger').addEventListener('click', toggleSubMenu);


