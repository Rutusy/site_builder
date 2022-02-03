// Функция поиска открытых img-upload и закрытие их при нажатии +
function closePopup () {
	let openedLoad = document.querySelectorAll('.img-upload');
	for (let h=0; h < openedLoad.length; h++) {
		document.addEventListener('click', function(e) {
			if (e.target !== openedLoad[i]) {
				openedLoad[h].style.display = 'none';
			}
		});
	}
};


// После каждого создания элемента обновляем коллекцию кнопок удаления и вешаем обработчик на каждую иконку
function searchNewElem () {
	closePopup();
	let deleteBtn = document.querySelectorAll('.delete-btn');
	for (let i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].onclick = function () {
			deleteBtn[i].parentNode.style.display = 'none';
		}
	}
	let addImgBtn = document.querySelectorAll('.add-img-btn');
	for (let i = 0; i < addImgBtn.length; i++) {
		addImgBtn[i].onclick = function () {
			addImgBtn[i].parentNode.className = 'element element--image  element--uploading  image';
			addImgBtn[i].parentNode.innerHTML = `
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
			searchNewElem();
		}
	}
	let inputURL = document.querySelectorAll('input[type="url"]');
	for (let i = 0; i < inputURL.length; i++) {
		let uploadLabel = inputURL[i].parentNode.querySelector('.img-upload__label');
		uploadLabel.onclick = function (evt) {
			evt.preventDefault();
			let link = inputURL[i].value;
			inputURL[i].parentNode.parentNode.className = 'element element--uploaded image';
			inputURL[i].parentNode.parentNode.innerHTML = `
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

						      <img src="${link}">
						`;
			searchNewElem();
		}
	}
}

// Включаем переключение выбранного макета
let gridSelectBtn = document.querySelectorAll('.grid-select__btn');
let links = ['landing', 'blog', 'shop'];
for (let i = 0; i < gridSelectBtn.length; i++) {
	gridSelectBtn[i].onclick = function () {
		window.location.href = `${links[i]}-empty.html`;
	}
}

// Скрываем панели добавления элементов и обрабатываем клик по кнопке +
let chooseElem = document.querySelectorAll('.choose-elem');
let addBtn = document.querySelectorAll('.add-btn');
for (let i = 0; i < addBtn.length; i++) {
	chooseElem[i].style.display = 'none';	
	addBtn[i].onclick = function () {
		for (let j = 0; j < addBtn.length; j++) {
			chooseElem[j].style.display = 'none';
		}
		chooseElem[i].style.display = '';

		// Создаем обертку элементов в блоке Хэдер/Контент/Футер по нажатию +. Запрещаем создание более  одной обертки.
		let elementsWrapper = document.createElement('div');
		elementsWrapper.className = `${addBtn[i].parentNode.tagName.toLowerCase()}__elements-wrapper`;
		if (elementsWrapper.className === 'div__elements-wrapper') {
			elementsWrapper.className = 'content__elements-wrapper';
		}
		if (addBtn[i].parentNode.querySelectorAll(`.${elementsWrapper.className}`).length < 1) {
			addBtn[i].parentNode.append(elementsWrapper);
		}

		// Очистка плэйсхолдера пустого глобального блока
		function clearBlock () {
			addBtn[i].parentNode.querySelector('.placeholder').style.display = 'none';
			addBtn[i].parentNode.classList.remove(`header--empty`);
			addBtn[i].parentNode.classList.remove(`content--empty`);
			addBtn[i].parentNode.classList.remove(`footer--empty`);
		}

		// Обработчики кнопок-элементов
		let chooseElemBtn = addBtn[i].parentNode.querySelectorAll('.choose-elem__btn');
		let wrap = addBtn[i].parentNode.querySelector(`.${elementsWrapper.className}`);
		chooseElemBtn[0].onclick = function () {
			let h1 = document.createElement('div');
			h1.className = 'element title';
			h1.innerHTML = `
							  <h1 contenteditable="true" data-placeholder="Заголовок H1"></h1>
							  <button type="button" class="delete-btn">
							  <span class="visually-hidden">Удалить элемент</span>
							</button>
							`;
			clearBlock();
			wrap.append(h1);
			searchNewElem();
		}
		chooseElemBtn[1].onclick = function () {
			let h2 = document.createElement('div');
			h2.className = 'element title';
			h2.innerHTML = `
							  <h2 contenteditable="true" data-placeholder="Заголовок H2"></h2>
							  <button type="button" class="delete-btn">
							  <span class="visually-hidden">Удалить элемент</span>
							</button>
							`;
			clearBlock();
			wrap.append(h2);
			searchNewElem();
		}
		chooseElemBtn[2].onclick = function () {
			let h3 = document.createElement('div');
			h3.className = 'element title';
			h3.innerHTML = `
							  <h3 contenteditable="true" data-placeholder="Заголовок H3"></h3>
							  <button type="button" class="delete-btn">
							  <span class="visually-hidden">Удалить элемент</span>
							</button>
							`;
			clearBlock();
			wrap.append(h3);
			searchNewElem();
		}
		chooseElemBtn[3].onclick = function () {
		let text = document.createElement('div');
		text.className = 'element text';
		text.innerHTML = `
						  <p contenteditable="true" data-placeholder="Абзац текста"></p>
						  <button type="button" class="delete-btn">
						  <span class="visually-hidden">Удалить элемент</span>
						</button>
						`;
			clearBlock();
			wrap.append(text);
			searchNewElem();
		}
		chooseElemBtn[4].onclick = function () {
		let img1 = document.createElement('div');
		img1.className = 'element element--image  image';
		img1.innerHTML = `
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
			clearBlock();
			wrap.append(img1);
			searchNewElem();
		}
	}
}
