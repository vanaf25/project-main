const isMobile = {
  Android: function() {return navigator.userAgent.match(/Android/i);},
  BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
  iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
  Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
  Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
  any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
const determineTypeOfDevice=()=>{
  const width=window.innerWidth;
  if (width<=767){
    document.body.classList.remove('mouse');
    document.body.classList.add('touch')
  }
  if (isMobile.any()){
    document.body.classList.remove('mouse');
    document.body.classList.add('touch')
  }
  if (!isMobile.any() && width>767){
    document.body.classList.remove('touch');
    document.body.classList.add('mouse')
  }

}
window.addEventListener('resize',determineTypeOfDevice)
determineTypeOfDevice()
if (document.body.classList.contains('touch')){
  const menuArrows=document.querySelectorAll('.menu__arrow');
  for (let i=0; i<menuArrows.length;i++){
    const menuArrow=menuArrows[i];
    menuArrow.addEventListener('click',function () {
      menuArrow.parentElement.classList.toggle('active');
    })
  }

}
const burger=document.querySelector('.menu__burger');
const menu=document.querySelector('.menu');
const openMenu=()=>{
 burger.classList.toggle('active');
 if (menu.classList.contains('active')){
   menu.classList.remove('active');
   stickyMenu();
 }
 else{
   menu.classList.add('active');
   menu.classList.add('fixed');
 }
 document.body.classList.toggle('lock');
}
burger.addEventListener('click',openMenu)
const stickyMenu=()=> {
  if (pageYOffset>0){
    menu.classList.add('fixed')
  }
  else {
    menu.classList.remove('fixed');
  }
}
window.addEventListener('scroll', stickyMenu);
const tabLinks=document.querySelectorAll('.tab__li');
let tabElements=document.querySelectorAll('.tab__body');
tabLinks.forEach((item,index)=>{
  item.addEventListener('click',function () {
    tabElements.forEach((item,index)=>{
      item.classList.remove('active');
      tabLinks[index].classList.remove('active');
    });
    tabLinks[index].classList.add('active');
    tabElements[index].classList.add('active');
  })
});
const scrollToElement=e=>{
  const navigationElem=document.querySelector(e.target.getAttribute('href'));
  if (navigationElem && e.target.getAttribute('href')){
const navigationElemValue=navigationElem.getBoundingClientRect().top+pageYOffset-menu.offsetHeight;
scrollTo({
  top:navigationElemValue,
  behavior:"smooth"
})
  }
  e.preventDefault();
}

const navigationLinks=document.querySelectorAll('a.navigation-link[href^="#"]');
if (navigationLinks.length>0){
  for (let i=0;i<navigationLinks.length;i++){
    const navigationLink=navigationLinks[i];
    navigationLink.addEventListener('click',scrollToElement)
  }

}
