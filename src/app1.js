
import './styles/main.scss'

$('.ecom').addEventListener('click', ecompopup)

function ecompopup(){
  var x = document.getElementById("garmin");
  if (x.style.display === "none") {
    x.style.display = "block";
    console.log('HIIIblock')
  } else {
    x.style.display = "none";
    console.log('HIIInone')
  }
}

document.querySelector('.automo').addEventListener('click', function() {
  document.querySelector('.grid').style.display='none';
  document.querySelector('#auto').style.display='none';
  document.querySelector('#toolshardware').style.display='none';
  document.querySelector('#homeessentials').style.display='none';
  document.querySelector('#sportsrecreation').style.display='none';
  document.querySelector('#outdoorliving').style.display='none';
  document.querySelector('#frankid').style.display='none';
  document.querySelector('#canvasid').style.display='none';
  document.querySelector('#mastercraftid').style.display='none';
  document.querySelector('#motomaster').classList.remove('hidden');
  document.querySelector('#garmin').classList.remove('hidden');
  document.querySelector('#ceilingfan').classList.remove('hidden');
  document.querySelector('#nestingtote').classList.remove('hidden');
  document.querySelector('#maxdrill').classList.remove('hidden');
  document.querySelector('#traingle').classList.remove('hidden');
})

document.querySelector('.garmin-btn').addEventListener('click', function(){
  document.querySelector('.screen').classList.remove('hidden');
})

document.querySelector('.menu__trigger').addEventListener('click', toggleMenu);

document.querySelector('.submenu__trigger').addEventListener('click', toggleSubMenu);

document.querySelector('autodropdown').addEventListener('click', function() {
  document.querySelector('.grid').style.display='none';
  document.querySelector('#auto').style.display='none';
  document.querySelector('#toolshardware').style.display='none';
  document.querySelector('#homeessentials').style.display='none';
  document.querySelector('#sportsrecreation').style.display='none';
  document.querySelector('#outdoorliving').style.display='none';
  document.querySelector('#frankid').style.display='none';
  document.querySelector('#canvasid').style.display='none';
  document.querySelector('#mastercraftid').style.display='none';
  document.querySelector('#motomaster').classList.remove('hidden');
  document.querySelector('#garmin').classList.remove('hidden');
})

document.querySelector('.screen').addEventListener('click', function() {
  document.querySelector('.screen').classList.add('hidden');
});


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