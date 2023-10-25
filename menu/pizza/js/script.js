let requestURL="js/goods.json";
let request=new XMLHttpRequest();
request.open('GET', requestURL);
let cart={}
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
                  <div class="item__weight">${ size ? array[item].bigSizeWeight:array[item].mediumSizeWeight}<span>г</span></div>
                <div class="item__size-wrapper">
                 <span>Средняя</span><div class="item__size ${size ? "active":""}" data-checked="false"><div class="item__switch"></div></div><span>Большая</span>
                </div>
                </div>
                <div class="item__description">
                  <p class="item__p">
                   ${array[item].description}
                  </p>
                </div>
                <div class="item__cost">
                  <h4>${array[item].endCost}грн</h4>
                </div>
                <div class="item__button">
                  <button data-id="${item}" class="buy">Купить</button>
                </div>
              </div>
            </div>
          </div>
  `
}
const goodsWrapper=document.querySelector('.page__items');
let goodsSizes={};
request.onload = function() {
  let superHeroes = request.response;
  function rerenderGoods() {
    goodsWrapper.innerHTML="";
    for (let key in superHeroes){
      if (goodsSizes[key]){
        superHeroes[key].endCost=superHeroes[key].bigSizeCost
      }
      else{
        superHeroes[key].endCost=superHeroes[key].mediumSizeCost
      }
      goodsWrapper.innerHTML+=templateItem(key,superHeroes,goodsSizes[key]);
    }
   const changeElem=document.querySelectorAll('.item__size');
    changeElem.forEach((elem,index)=>{
      elem.addEventListener('click',()=>{
        changeSize(elem,index);
      });
    });
    const buttons=document.querySelectorAll('.buy');
    buttons.forEach((item)=>{
      item.addEventListener('click',()=>{
        addToCart(item.getAttribute('data-id'))
      })
    })
  }
  rerenderGoods()
const addToCart=(articul)=>{
    if (!cart[articul]){
      cart[articul]=1
    }
    else {
      cart[articul]++
    }
    console.log(cart);
}
  const changeSize=(elem,index)=>{
    if (!goodsSizes[index]){
      goodsSizes[index]=true;
    }
    else if (goodsSizes[index]){
      goodsSizes[index]=false
    }
    rerenderGoods()
  }

}
