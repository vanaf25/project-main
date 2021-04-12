let requestURL="js/goods.json";
let request=new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
const templateItem=(item,array,size)=>{
  return `
   <div class="page__item">
            <div class="item__content">
              <div class="item__image">
                <a href=""><img src="${array[item].image}" alt=""></a>
              </div>
              <div class="item__text">
                <div class="item__title">
                  <h3>${array[item].name}</h3>
                </div>
                <div class="item__data">
                  <div class="item__weight">${ size==="medium" ? array[item].mediumSizeWeight:array[item].bigSizeWeight}<span>г</span></div>
                <div class="item__size-wrapper">
                 <span>Средняя</span><div class="item__size ${size==="big" ? "active":""}" data-checked="false"><div class="item__switch"></div></div><span>Большая</span>
                </div>
                </div>
                <div class="item__description">
                  <p class="item__p">
                   ${array[item].description}
                  </p>
                </div>
                <div class="item__cost">
                  <h4>${ size==="medium" ? array[item].mediumSizeCost:array[item].bigSizeCost}грн</h4>
                </div>
                <div class="item__button">
                  <button>Купить</button>
                </div>
              </div>
            </div>
          </div>
  `
}
const goodsWrapper=document.querySelector('.page__items');
let goodsSizes={};
const rerenderGoodSizes=(index)=>{
  if (!goodsSizes[index]){
    goodsSizes[index]="medium";
  }
  else if (goodsSizes[index]==="medium"){
    goodsSizes[index]="big"
  }
  else if (goodsSizes[index]==="big"){
    goodsSizes[index]="medium";
  }
}
request.onload = function() {
  let superHeroes = request.response;
  function rerenderGoods() {
    goodsWrapper.innerHTML="";
    for (let key in superHeroes){
      rerenderGoodSizes(key);
      console.log(goodsSizes.key);
      goodsWrapper.innerHTML+=templateItem(key,superHeroes,goodsSizes[key]);
    }
  }
  rerenderGoods()
  const changeElem=document.querySelectorAll('.item__size');
  const changeSize=(elem,index)=>{
    if (elem.classList.contains('active')){
      goodsSizes[index]="big";
    }
    else{
      goodsSizes[index]="medium";``
    }
    rerenderGoods()
  }
  changeElem.forEach((elem,index)=>{
    elem.addEventListener('click',()=>{
      changeSize(elem,index);
    });
  });
}
