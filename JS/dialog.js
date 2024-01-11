const ctas = document.querySelectorAll('.cta-open');
const closeDialog = document.querySelector('#close-dialog');
const radioBtn = document.querySelectorAll('input[type="radio"]');
const dialogCards = document.querySelectorAll('.card[data-variant="dialog-card"]')
const label = document.querySelectorAll('label')
const cardsArray = Array.from(dialogCards)
const radioName = Array.from(document.querySelectorAll('.radio-and-name'))


const inputText = Array.from(document.querySelectorAll('input[type="text"]'))
const counters = Array.from(document.querySelectorAll('.counter'));
const progressBar = document.querySelector('#progress-bar')
const quantity = Array.from(document.querySelectorAll('.card-quantity'))
const quantityDialog = Array.from(document.querySelectorAll('.card-quantity[data-type="dialog-quantity"]'))
const cardBtn = Array.from(document.querySelectorAll('.cta[data-type="cta-card"]'))
const plansDialog = document.querySelector('dialog[data-type="dialog-plans"]');
const successDialog = document.querySelector('dialog[data-type="success"]');
const successBtn = successDialog.querySelector('button');

//open and close plans dialog (with cards inside)
ctas.forEach((cta) => {
  cta.addEventListener('click', () => {
    plansDialog.showModal();
  })
})

closeDialog.addEventListener('click', () => {
  plansDialog.close();
})

/////////////////////////////////////////////////////

//to select correct card and stylize correct element - step 01
 radioName.forEach((radio) => {
  radio.addEventListener('click', (e) => {
    e.preventDefault();
    const currentCard = radio.parentNode;
    const cardBox = currentCard.parentNode;
    const allCards = cardBox.querySelectorAll('.card');
    const arrCards = Array.from(allCards)
    hideContents(arrCards);
    showContents(currentCard);
  })
})

//to hide all card's element - step 02
function hideContents(arrCards){
  arrCards.forEach((arr) => {
    arr.querySelector('.accordion').setAttribute('aria-hidden', true)
    arr.style.borderColor = 'rgba(0, 0, 0, 0.15)';
    arr.querySelector('input[type="radio"]').setAttribute('data-active', false)
    arr.setAttribute('data-active', false)
  })
}

//to show only selected card - step 02
function showContents(currentCard){
  currentCard.style.borderColor = 'rgba(60, 179, 171, 1)';
  currentCard.querySelector('.accordion').setAttribute('aria-hidden', false)
  currentCard.querySelector('input[type="radio"]').setAttribute('data-active', true)
  currentCard.setAttribute('data-active', true)
}

//after select a plans card, click btn "Continue" to close dialog and update counters - step 03
cardBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let currentBtn = e.target;
    let currentInput = currentBtn.previousElementSibling.previousElementSibling;
    checkInput(currentBtn, currentInput)
  })
})

//to check if user add correct import in input text - step 04
function checkInput(currentBtn, currentInput){
  let valueInput = currentInput.value;

  let pledgeBox = currentInput.parentNode.parentNode;
  let limitDollar = currentInput.getAttribute('data-variant');

  if((limitDollar == 25 && valueInput < 25) || (limitDollar == 75 && valueInput < 75) || (limitDollar == 200 && valueInput < 200)){
    currentInput.style.borderColor = 'red'
    pledgeBox.querySelector('.error').style.opacity = '1';

  }else if(currentBtn.classList.contains('no-reward') && valueInput != 0){
    updateCounter(currentInput);
    plansDialog.close();
    const success = setTimeout(completeTask, 500);
  }  else {
    currentInput.style.borderColor = 'rgba(0, 0, 0, 0.15)';
    valueInput = '';
    pledgeBox.querySelector('.error').style.opacity = '0';
    updateCounter(currentInput);
    updateCardQuantity(pledgeBox)
    plansDialog.close();
    const success = setTimeout(completeTask, 500);
  }
}

 //If amount of dollars is correct, first, update number of quantity plans card - step 04 (2)
function updateCardQuantity(pledgeBox){
  const typeCard = pledgeBox.closest('.card').querySelector('.card-quantity').getAttribute('data-connect');
  
  const body = document.querySelector('body');
  
    body.querySelectorAll(`.card-quantity[data-connect="${typeCard}"]`).forEach((type) => {
      type.innerText = Number(type.innerText - 1);
  
      if(type.innerText < 1){
        body.querySelectorAll(`.card[data-type="${typeCard}"]`).forEach((card) => {
          card.style.opacity = '0.5'
          card.style.pointerEvents = 'none'
          card.querySelector('.cta-open[data-disabled="false"]').setAttribute('data-disabled', true)
        })
      }
    })  
}

//second, after first dialog is close, show up the dialog with success feedback
function completeTask(){
  successDialog.showModal();
}

//to close dialog with success feedback
successBtn.addEventListener('click', () => {
  successDialog.close();
})

//to update every counters - step 05
function updateCounter(currentInput){
  let currentToNumber = Number(currentInput.value);
  let numb = [];
  console.log(currentToNumber)
  counters.forEach((count) => {
    let convertToNumb = count.innerText.replace(/[^0-9]/g, '');
    console.log(convertToNumb)
    numb.push(Number(convertToNumb));
  })

  let counter1 = numb[0] + currentToNumber;
  let counter2 = numb[1] + 1;
  counters[0].innerText = `$` + counter1.toLocaleString().replace(".", ",");
  counters[1].innerText = counter2.toLocaleString().replace(".", ",");
  console.log(counter1)
  console.log(counter2)
  let newWidth = (50 + currentToNumber) / 1000;

  //and last step, update the length of progress bar
  progressBar.style.width = 50 + newWidth + `%`;
}