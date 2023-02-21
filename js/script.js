'use strict'

window.addEventListener('DOMContentLoaded', () => {


   // Tabs
   const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items')

   const hideTabContent = function() {

      tabsContent.forEach( item => {
         item.classList.add('hide')
         item.classList.remove('show', 'fade')
      })

      tabs.forEach( item => {
         item.classList.remove('tabheader__item_active');
      })

   }

   const showTabContent = function(i = 0) {
      tabsContent[i].classList.add('show', 'fade')
      tabsContent[i].classList.remove('hide')
      tabs[i].classList.add('tabheader__item_active')
   }

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if ( target && target.classList.contains('tabheader__item')){
         tabs.forEach( (item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         })
      }
   })

   // Timer

   const deadLine = '2023-03-17'

   function getTimeRemaining(endTime){
      const time = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(time / (1000 * 60 * 60 * 24) ),
      hours = Math.floor(time / (1000 * 60 * 60) % 24),
      minutes = Math.floor( (time / 1000 / 60) % 60),
      seconds = Math.floor( (time / 1000) % 60)

      return {
         'total': time,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      }
   }

   function setZero (num){
      if(num >= 0 && num < 10){
         return `0${num}`
      }else{
         return num
      }
   }

   function setClock(selector, endTime){
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
      let timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock(){
         const time = getTimeRemaining(endTime) 

         days.textContent = setZero(time.days)
         hours.textContent = setZero(time.hours)
         minutes.textContent = setZero(time.minutes)
         seconds.textContent = setZero(time.seconds)

         if(time.total == 0){
            clearInterval(time);
         }
      }
   }

   setClock('.timer', deadLine)

   // Modal

   const modalButtons = document.querySelectorAll('[data-modal]');

   function modalShow(){
      const modalButtons = document.querySelectorAll('[data-modal]'),
            modalContent = document.querySelector('.modal');

      function toggleModal(){
         modalContent.classList.toggle('show');
         modalContent.classList.toggle('fade');
         if(!document.body.style.overflow){
            document.body.style.overflow = 'hidden'
         }else{
            document.body.style.overflow = '';
         }

         clearInterval(showModalTimer)
      }

      modalButtons.forEach(button => {
         button.addEventListener('click', event =>{
            event.preventDefault()

            toggleModal()
         })
      })

      modalContent.addEventListener('click', event => {
         if (event.target === modalContent){
            toggleModal();
         }
      })
      
      document.addEventListener('keydown', event => {
         if (event.key === 'Escape'){
            toggleModal();
         }
      });


      let showModalTimer = setTimeout( () => {
         toggleModal()
         clearInterval(showModalTimer)
      }, 3000)

      let i = 0;
      window.addEventListener('scroll', event => {
         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 && i === 0){
            toggleModal()
            i++
         }
      })

   }

   modalShow();

   // Using classes

   class MenuCard {
      constructor(src, alt, title, description, price, parentSelector, ...classes){
         this.src = src
         this.alt = alt
         this.title = title
         this.description = description
         this.price = price
         this.classNames = classes;
         this.KGSCurrency = 86.9
         this.parent = document.querySelector(parentSelector);
         this.changeToKGS()
      }

      changeToKGS() {
         this.price = +this.price * this.KGSCurrency
      }

      render() {
         const menuCard = document.createElement('div')

         if(this.classNames.length === 0){
            this.menuCard = 'menu__item'
            menuCard.classList.add(this.menuCard)
            console.log(this)
         }else{
            this.classNames.forEach(className => menuCard.classList.add(className))
         }

         menuCard.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${Math.floor(this.price)}</span> сом/день</div>
            </div>`
         this.parent.append(menuCard)
      }
   }

   new MenuCard(
      'img/tabs/vegy.jpg',
      `vegy`,
      `Меню "Фитнес"`,
      `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
      9.99,
      `.menu .container`
   ).render()
   new MenuCard(
      'img/tabs/elite.jpg',
      `elite`,
      `Меню “Премиум”`,
      `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
      29.99,
      `.menu .container`
   ).render()
   new MenuCard(
      'img/tabs/post.jpg',
      `post`,
      `Меню "Постное"`,
      `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
      24.99,
      `.menu .container`
   ).render()
})