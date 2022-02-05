// Включаем переключение выбранного макета
let gridSelectBtn = document.querySelectorAll('.grid-select__btn');
let links = ['landing', 'blog', 'shop'];
	gridSelectBtn[0].onclick = function () {
		window.location.href = `index.html`;
	}
for (let i = 1; i < gridSelectBtn.length; i++) {
	gridSelectBtn[i].onclick = function () {
		window.location.href = `${links[i]}-empty.html`;
	}
}

// Список переменных глобальных
let addBtn = document.querySelectorAll('.add-btn');
let chooseElem = document.querySelectorAll('.choose-elem');
let change;
let changeForPopup;

// Скрываем панели добавления элементов
hideElem();
function hideElem () {
	for (let i = 0; i < addBtn.length; i++) {
			chooseElem[i].style.display = 'none';
	}
}

//================================================================================================
for (let i = 0; i < addBtn.length; i++) {
// Обработка плюса
			addBtn[i].addEventListener('click', openBar);
			function openBar (e) {
				if (addBtn[i].contains(e.target)) {
					hideElem();
					chooseElem[i].style.display = '';
					change = 1;
				};
			}
// Обработка бара элементов
	chooseElem[i].addEventListener('click', elemBar);
	function elemBar (e) {
		let buttons = chooseElem[i].querySelectorAll('button');
		if (e.target === buttons[0]) {
			createWrapper(i);
			chooseElem[i].parentNode.lastChild.append(h1.cloneNode(true));
		}
		if (e.target === buttons[1]) {
			createWrapper(i);
			chooseElem[i].parentNode.lastChild.append(h2.cloneNode(true));
		}
		if (e.target === buttons[2]) {
			createWrapper(i);
			chooseElem[i].parentNode.lastChild.append(h3.cloneNode(true));
		}
		if (e.target === buttons[3]) {
			createWrapper(i);
			chooseElem[i].parentNode.lastChild.append(text.cloneNode(true));
		}
		if (e.target === buttons[4]) {
			createWrapper(i);
			chooseElem[i].parentNode.lastChild.append(img.cloneNode(true));
			imgPopup (i);
		}
		change = 1;
		changeForPopup = 1;
		deleteBlock ();
	}
}
//==================================================================================================

function deleteBlock () {
  for (let dlt of document.querySelectorAll('.delete-btn')) {
    dlt.addEventListener('click', function () {
      dlt.parentNode.style.display = 'none'
    })
  }
}

function imgPopup(i) {
  let imgBlock = document.querySelectorAll('.add-img-btn');
  for (let b=0; b < imgBlock.length; b++) {
    imgBlock[b].addEventListener('click', function () {
      imgBlock[b].parentNode.querySelector('.img-upload').style.display = 'block';
      imgBlock[b].parentNode.querySelector('.img-upload').addEventListener('click', function() {
	    changeForPopup = 1;
      });
      uploadImg();
	    changeForPopup = 1;
    })
  }
	changeForPopup = 1;
}
function uploadImg () {
  for (let label of document.querySelectorAll('.img-upload__label')) {
  	label.addEventListener('click', function (e) {
		e.preventDefault();
		let urlImg = label.parentNode.querySelector('input[type="url"]').value;
		
			label.parentNode.parentNode.className = 'element element--uploaded image';
			label.parentNode.parentNode.innerHTML = `
						  <button type="button" class="delete-btn">
						  <span class="visually-hidden">Удалить элемент</span>
						</button>

						      <button type="button" class="add-img-btn">
						        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						          <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2V8H0V12H6V18H10V12H16V8H10V2H6ZM12 14V20H6V40C6 42.2 7.8 44 10 44H42C44.2 44 46 42.2 46 40V16C46 13.8 44.2 12 42 12H35.66L32 8H18V14H12ZM26 38C31.52 38 36 33.52 36 28C36 22.48 31.52 18 26 18C20.48 18 16 22.48 16 28C16 33.52 20.48 38 26 38ZM26 34C22.68 34 20 31.32 20 28C20 24.68 22.68 22 26 22C29.32 22 32 24.68 32 28C32 31.32 29.32 34 26 34Z"></path>
						        </svg>
						      </button>
						      <div class="img-upload">
						  <p>Загрузите изображение</p>
						  <input type="url" placeholder="Вставьте ссылку на изображение">
						  <label class="img-upload__label">Загрузить
						    <input class="visually-hidden" type="file" accept="image/png, image/jpeg">
						  </label>
						</div>

						      <img src="${urlImg}">
						`;
	})
  }
}

// Создание пустого враппера-обертки
function createWrapper(numOfWrap) {	
			let wrapper = document.createElement('div');
			wrapper.className = `${chooseElem[numOfWrap].parentNode.tagName.toLowerCase()}__elements-wrapper`;
			if (wrapper.className === 'div__elements-wrapper') {
				wrapper.className = 'content__elements-wrapper';
			}
				if (chooseElem[numOfWrap].parentNode.querySelectorAll(`.${wrapper.className}`).length < 1) {
					chooseElem[numOfWrap].parentNode.append(wrapper);
					chooseElem[numOfWrap].parentNode.querySelector('.placeholder').style.display = 'none';
					chooseElem[numOfWrap].parentNode.classList.remove(`header--empty`, `content--empty`, `footer--empty`);
				}
}

// Обработчик на все клики по странице с удалением открытых баров выбора элементов
document.addEventListener('click', global);
function global() {
	if (change === 0) {
		hideElem();
	};
	change = 0;
	
	if (changeForPopup === 0) {
		for (let elem of document.querySelectorAll('.img-upload')) {
			elem.style.display = 'none';
		}
	}
	changeForPopup = 0;
	
}

// Создаем блоки для добавления
			let h1 = document.createElement('div');
			h1.className = 'element title';
			h1.innerHTML = `
							  <h1 contenteditable="true" data-placeholder="Заголовок H1"></h1>
							  <button type="button" class="delete-btn">
							  <span class="visually-hidden">Удалить элемент</span>
							</button>
							`;
			let h2 = document.createElement('div');
			h2.className = 'element title';
			h2.innerHTML = `
							  <h2 contenteditable="true" data-placeholder="Заголовок H2"></h2>
							  <button type="button" class="delete-btn">
							  <span class="visually-hidden">Удалить элемент</span>
							</button>
							`;
			let h3 = document.createElement('div');
			h3.className = 'element title';
			h3.innerHTML = `
							  <h3 contenteditable="true" data-placeholder="Заголовок H3"></h3>
							  <button type="button" class="delete-btn">
							  <span class="visually-hidden">Удалить элемент</span>
							</button>
							`;
			let text = document.createElement('div');
			text.className = 'element text';
			text.innerHTML = `
							  <p contenteditable="true" data-placeholder="Абзац текста"></p>
							  <button type="button" class="delete-btn">
							  <span class="visually-hidden">Удалить элемент</span>
							</button>
							`;
			let img = document.createElement('div');
			img.className = 'element element--image  image';
			img.innerHTML = `
							  <button type="button" class="delete-btn">
							  <span class="visually-hidden">Удалить элемент</span>
							</button>

							  <button type="button" class="add-img-btn">
							    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2V8H0V12H6V18H10V12H16V8H10V2H6ZM12 14V20H6V40C6 42.2 7.8 44 10 44H42C44.2 44 46 42.2 46 40V16C46 13.8 44.2 12 42 12H35.66L32 8H18V14H12ZM26 38C31.52 38 36 33.52 36 28C36 22.48 31.52 18 26 18C20.48 18 16 22.48 16 28C16 33.52 20.48 38 26 38ZM26 34C22.68 34 20 31.32 20 28C20 24.68 22.68 22 26 22C29.32 22 32 24.68 32 28C32 31.32 29.32 34 26 34Z"></path>
							    </svg>
							  </button>
							  <div class="img-upload">
							  <p>Загрузите изображение</p>
							  <input type="url" placeholder="Вставьте ссылку на изображение">
							  <label class="img-upload__label">Загрузить
							    <input class="visually-hidden" type="file" accept="image/png, image/jpeg">
							  </label>
							</div>
							`;


