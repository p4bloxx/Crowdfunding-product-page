
//active bookmark button
const bookBox = document.querySelector('#bookmark-box')
const book = document.querySelector('#icon-book');
const bookCircle = document.querySelector('#icon-book circle');
const bookPath = document.querySelector('#icon-book path');
const bookText = document.querySelector('#bookmark');

//for toggle active Bookmark button
bookBox.addEventListener('click', () => {
  bookCircle.classList.toggle('circle-active')
  bookPath.classList.toggle('bookmark-active')
  bookText.classList.toggle('bookmark-text')
})

//Mobile menu
const nav = document.querySelector('#primary-nav')
const btnNav = [document.querySelector('#open'), document.querySelector('#close')]
const gradient = document.querySelector('.gradient-to-top');

btnNav.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if(e.target === btnNav[0]){
      btnNav[0].setAttribute('data-active', 'false')
      btnNav[1].setAttribute('data-active', 'true')
      nav.setAttribute('data-visible', 'true')
      gradient.setAttribute('data-visible', 'true')
      document.querySelector('body').style.overflowY = 'hidden'
    } else if(e.target === btnNav[1]){
      btnNav[0].setAttribute('data-active', 'true')
      btnNav[1].setAttribute('data-active', 'false')
      nav.setAttribute('data-visible', 'false')
      gradient.setAttribute('data-visible', 'false')
      document.querySelector('body').style.overflowY = 'auto';
    }
  })
})