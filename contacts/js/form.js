const errors={name:true,email:true,phone:true,message:true};
const inputAddError=(input)=>{
    input.parentElement.parentElement.querySelector('.not-error').classList.remove('active');
    input.parentElement.parentElement.querySelector('.error').classList.add('active');
    input.classList.add('active');
}
const formValidate=(input)=>{
  const inputAddNotError=(input)=>{
    input.parentElement.parentElement.querySelector('.error').classList.remove('active');
    input.parentElement.parentElement.querySelector('.not-error').classList.add('active');
    input.classList.remove('active');
  }
  const validateName=(input)=>{
    return /[А-Яа-яЁё]/.test(input.value);
  }
  const validateEmail=(input)=>{
    return  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value)
  }
  const validateNumber=(input)=>{
    return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value)
  }
  if (input.classList.contains('text')){
    if (input.value.length<3 || input.value.length>10 || validateName(input) || input.value.search(/[0123456789]/)!=-1){
      inputAddError(input);
      errors.name=true;
    }
    else{
      inputAddNotError(input);
      errors.name=false
    }
  }
  else if (input.classList.contains('email')){
    console.log('1'+validateEmail(input));
    if (input.value.length<3 || !validateEmail(input)){
      inputAddError(input);
      errors.email=true
    }
    else {
      inputAddNotError(input);
      errors.email=false
    }
  }
  else if (input.classList.contains('mobile')){
    if (validateNumber(input)){
      inputAddError(input)
      errors.phone=true
    }
    else{
      inputAddNotError(input)
      errors.phone=false;
    }
  }
  else if (input.classList.contains('textarea')){
    if (input.value.length<3){
      inputAddError(input);
      errors.message=true;
    }
    else{
      inputAddNotError(input);
      errors.message=false;
    }
  }
  checkAllInputs();
  overflowBar();
}
const inputs=document.querySelectorAll('.input');
const button=document.querySelector('.button');
const bar=document.querySelector('.progress');
inputs.forEach(item=>{
  item.addEventListener('input',()=>{
    formValidate(item)
  });
});
const createTemplate=(name,email,phone)=>{
  return `
    <div class="section__header">
            <div class="section__li">
                <h3 class=section__tile>First name</h3>
            </div>
            <div class="section__li">
                <h3 class="section__title">Email</h3>
            </div>
            <div class="section__li">
                <h3 class="section__title">Mobile</h3>
            </div>
        </div>
        <div class="section__body">
            <div class="section__caption">
                <h3 class="section__title">${name}</h3>
            </div>
            <div class="section__caption">
                <h3 class="section__title">
                   ${email}
                </h3>
            </div>
            <div class="section__caption">
                <h3 class="section__title">
                    +${phone}
                </h3>
            </div>
        </div>
    `
}
const checkAllInputs=()=>{
  for (let k in errors){
    if (errors[k]===true){
      button.classList.remove('opened')
      return false
    }
  }
  button.classList.add('opened');
  return true
}
const overflowBar=()=>{
  let count=0;
  for (let k in errors){
    if (!errors[k]){
      count++
    }
  }
  bar.style.width=count*100/inputs.length+"%";
}
