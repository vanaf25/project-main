window.onload=function () {
  let popupLinks=document.querySelectorAll('.popup-links');
  console.log(popupLinks);
  let body=document.querySelector('body');
  let lockPadding=document.querySelectorAll('.lock-padding');
  let unlock=true;
  let  timeout=800;
  if (popupLinks.length>0){
    for (let i=0;i<popupLinks.length;i++){
      let popupLink=popupLinks[i];
      popupLink.addEventListener("click",function (e) {
        const popupName=popupLink.getAttribute('href').replace('#','');
        const currentPopup=document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      })
    }
  }

  const popupCloseIcon=document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length >0){
    for (let i=0;i<popupCloseIcon.length;i++){
      const el=popupCloseIcon[i];
      el.addEventListener("click",function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      })
    }
  }
  function popupOpen(currentPopup) {
    if (currentPopup && unlock){
      const popupActive=document.querySelector('.popup.open');
      if (popupActive){
        popupClose(popupActive,false)
      }
      else {
        bodyLock();
      }
      currentPopup.classList.add('open');
      currentPopup.addEventListener("click",function (e) {
        if (!e.target.closest('.popup__content') && !e.target.closest('#menuPhone') && !e.target.closest('#mini-cart')){
          popupClose(e.target.closest('.popup'))
        }
      });
    }
  }
  function popupClose(popupActive,doUnlock=true) {
    if (unlock){
      popupActive.classList.remove('open');
      if (doUnlock){
        bodyUnlock()
      }
    }


  }
  function  bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    if (lockPadding.length > 0) {


      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = '0px'
      }
      body.style.paddingRight = lockPaddingValue;
      body.classList.add('lock');
      body.style.overflow='hidden';
      document.querySelector('html').classList.add('lock')
      unlock = false;
      setTimeout(function () {
        let unlock = true
      }, timeout)
    }
  }
  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length>0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i];
          el.style.paddingRight = '0px';

        }
        body.style.paddingRight = '0px';

        body.classList.remove('lock');
      }
    },timeout)

  }
  document.addEventListener('keydown',function (e) {
    if (e.which===27){
      const popupActive=document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });
}
