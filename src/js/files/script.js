// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


const products = document.querySelectorAll('.product');

if (products) {
	products.forEach(el => {
		let currentProduct = el;
		const imageSwitchItems = currentProduct.querySelectorAll('.image-switch__item');
		const imagePagination = currentProduct.querySelector('.image-pagination');
		if (imageSwitchItems.length > 1) {
			imageSwitchItems.forEach((el, index) => {
				el.setAttribute('data-index', index);
				imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
				el.addEventListener('mouseenter', (e) => {
					currentProduct.querySelectorAll('.image-pagination__item').forEach(el => { el.classList.remove('image-pagination__item--active') });
					currentProduct.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active');
				});

				el.addEventListener('mouseleave', (e) => {
					currentProduct.querySelectorAll('.image-pagination__item').forEach(el => { el.classList.remove('image-pagination__item--active') });
					currentProduct.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active');
				});
			});
		}
	});
}

//Работа с выпадающим списком
if (isMobile.any) {
	let arrow = document.querySelectorAll('.menu-spoller__button');
	for (let i = 0; i < arrow.length; i++) {
		let subMenu = arrow[i].nextElementSibling;

		arrow[i].addEventListener('click', function () {
			if (window.innerWidth >= 767.98) {
				let open = document.querySelectorAll('._sub-menu-open');
				let active = document.querySelectorAll('._sub-menu-active');
				if (open.length > 0 || active.length > 0) {
					open.forEach((elem) => {
						if (elem !== subMenu) {
							elem.classList.remove('_sub-menu-open')
						}
					})
					active.forEach((elem) => {
						if (elem !== arrow[i]) {
							elem.classList.remove('_sub-menu-active')
						}
					})
				}
				subMenu.classList.toggle('_sub-menu-open');
				arrow[i].classList.toggle('_sub-menu-active');
			}
		})
	}
}

function formSearchInit() {
	const formSearchBtn = document.querySelector('.search-header__button');
	const formSearch = document.querySelector('.search-header__form');
	const searchInput = formSearch.querySelector('.search-header__input')
	const searchSubmit = formSearch.querySelector('.search-header__form-button')

	function formSearchDeactivate() {
		formSearch.classList.remove('_active')
		searchInput.setAttribute('tabindex', -1);
		searchSubmit.setAttribute('tabindex', -1);
		formSearchBtn.focus();
	}

	function formSearchActivate() {
		formSearch.classList.add('_active')
		searchInput.setAttribute('tabindex', 0);
		searchSubmit.setAttribute('tabindex', 0);
		searchInput.focus();
	}
	if (formSearch && formSearchBtn) {
		document.addEventListener("click", function (e) {
			if (e.target.closest('.search-header__button')) {
				if (!formSearch.classList.contains('_active')) {
					formSearchActivate()
				} else {
					formSearchDeactivate()
				}
			} else if (!e.target.closest('.search-header__form') && formSearch.classList.contains('_active')) {
				formSearchDeactivate()
			}
		})
	}
}
formSearchInit()

// ScrollUp
const offset = 500;
const scrollUp = document.querySelector('.scroll-up')
if (scrollUp) {
	const getTop = () => document.documentElement.scrollTop;

	window.addEventListener('scroll', () => {
		if (getTop() > offset) {
			scrollUp.classList.add('scroll-up--active');
		} else {
			scrollUp.classList.remove('scroll-up--active');
		}
	});

	scrollUp.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	})
}

// Клонирование элементов слайдера партнеров
function partnersInit() {
	const partnersSections = document.querySelectorAll('.partners');
	if (partnersSections) {
		partnersSections.forEach((partners) => {
			const originalSlide = partners.querySelector('.partners__slide:not(.clone)');
			// Копируем указанный элемент со всеми его дочерними элементами
			const cloneSlide = originalSlide.cloneNode(true);
			// Добавляем класс .clone к склонированному элементу
			cloneSlide.classList.add('clone');
			// Вставляем склонированный элемент после оригинального
			originalSlide.parentNode.insertBefore(cloneSlide, originalSlide.nextSibling);
			partners.classList.add('_active')
		})
	} else {
		console.log('Ой, кажется на странице нет секции партнеров')
	}
}
partnersInit();
function initSort() {
	const sort2 = document.getElementById('2x2')
	const sort3 = document.getElementById('3x3')
	const catalog = document.querySelector('.catalog__cards')

	if (sort2 && sort3 && catalog) {
		sort2.addEventListener('click', () => {
			if (sort2.hasAttribute('disabled')) {
				return
			}
			catalog.classList.add('sort-two')
			sort2.setAttribute('disabled', true)
			sort3.removeAttribute('disabled')
		})
		sort3.addEventListener('click', () => {
			if (sort3.hasAttribute('disabled')) {
				return
			}
			catalog.classList.remove('sort-two')
			sort3.setAttribute('disabled', true)
			sort2.removeAttribute('disabled')
		})
	}
}
initSort();

function initFilterResetBtn() {
	const filterResetBtn = document.querySelector('.filter__button-reset')
	const filter = document.querySelector('.filter')
	if (filterResetBtn && filter) {
		filterResetBtn.addEventListener('click', () => {
			filter.querySelectorAll('input[type=checkbox]').forEach((chk) => {
				chk.checked = false
			})
		})
	}
}
initFilterResetBtn()

function spollersFilterInit() {
	const spollersFilter = document.querySelector('.spollers-filter')
	if (spollersFilter) {
		const spollersFilterItem = spollersFilter.querySelectorAll('.spollers-filter__item:not(.spollers-filter__item_price, spollers-filter__item_colors)')

		spollersFilterItem.forEach((item) => {
			const spollerBody = item.querySelector('.spollers-filter__body')
			const spoilersItemChilds = spollerBody.children
			function createButton() {
				var button = document.createElement('button');
				button.classList.add('filter__more-btn');
				button.textContent = 'Показать ещё';
				return button;
			}
			if (spoilersItemChilds.length > 5) {
				var button = createButton();

				// Добавляем слушатель события клика
				button.addEventListener('click', function () {
					// Обработка события клика на кнопку
					// console.log('Кнопка нажата!');
					if (spollerBody.classList.contains('_open')) {
						button.textContent = 'Показать ещё'
					} else (
						button.textContent = 'Скрыть'
					);
					spollerBody.classList.toggle('_open')
				});
				spollerBody.appendChild(button);
			}
		})
	}
}
spollersFilterInit();


function filterInit() {
	const filter = document.querySelector('.filter')
	if (filter) {
		function handleViewportChange(mq) {
			if (mq.matches) {
				// Функция, которую нужно выполнить, когда размер вьюпорта соответствует брейкпоинту
				filter.style.display = 'none'
				console.log('Размер вьюпорта соответствует брейкпоинту');
			} else {
				// Функция, которую нужно выполнить, когда размер вьюпорта не соответствует брейкпоинту
				filter.removeAttribute('style');
				console.log('Размер вьюпорта не соответствует брейкпоинту');
			}
		}
		var breakpoint = '(max-width: 767.98px)'; // Установите нужный брейкпоинт
		var mql = window.matchMedia(breakpoint);

		// Выполняем функцию при загрузке страницы
		handleViewportChange(mql);
		// Добавляем слушателя событий, чтобы функция выполнилась каждый раз, когда размер вьюпорта проходит брейкпоинт
		mql.addEventListener('change', handleViewportChange);
	}
}
filterInit()
// console.log(spollersFilterItem.length)

// function handleViewportChange(mq) {
// 	if (mq.matches) {
// 		// Функция, которую нужно выполнить, когда размер вьюпорта соответствует брейкпоинту
// 		console.log('Размер вьюпорта соответствует брейкпоинту');
// 	} else {
// 		// Функция, которую нужно выполнить, когда размер вьюпорта не соответствует брейкпоинту
// 		console.log('Размер вьюпорта не соответствует брейкпоинту');
// 	}
// }

// var breakpoint = '(min-width: 768px)'; // Установите нужный брейкпоинт
// var mql = window.matchMedia(breakpoint);

// // Выполняем функцию при загрузке страницы
// handleViewportChange(mql);

// // Добавляем слушателя событий, чтобы функция выполнилась каждый раз, когда размер вьюпорта проходит брейкпоинт
// mql.addEventListener('change', handleViewportChange);

//========================================================================================================================================================
//pop-up Quick
//========================================================================================================================================================

function popupQuickInit() {
	const popup = document.getElementById('quick')
	const products = document.querySelectorAll('.product')

	if (popup && products) {
		products.forEach((product) => {
			const button = product.querySelector('.product__btn');
			const productTitle = product.querySelector('.product__title');
			const productImage = product.querySelector('.image-switch__img img');
			const productId = product.querySelector('.product-id');


			const popupProductTitle = popup.querySelector('.product-popup-quick__name');
			const popupProductImageWrapper = popup.querySelector('.product-popup-quick__image-wrapper');
			const popupProductId = popup.querySelector('.product-id');


			function resetPopup() {
				popupProductTitle.textContent = '';
				popupProductImageWrapper.innerHTML = '';
				popupProductId.value = '';
			}
			button.addEventListener('click', () => {
				resetPopup()

				popupProductTitle.textContent = productTitle.textContent
				popupProductImageWrapper.appendChild(productImage.cloneNode(true))
				popupProductId.value = productId.textContent
			})

			// document.addEventListener("beforePopupOpen", function (e) {
			// 	const currentPopup = e.detail.popup;
			// 	if (document.querySelector(currentPopup.targetOpen.selector).id === popup.id){
			// 		resetPopup()
			// 	}
			// });
		})

	}


}
popupQuickInit()

//========================================================================================================================================================
// Получаем элемент артикула товара по идентификатору
var articleElement = document.getElementById('articleElement');

if (articleElement) {
	// При щелчке на элементе
	articleElement.addEventListener('click', function () {
		// Получаем текст из элемента
		var articleText = articleElement.textContent;

		// Удаляем символ "-" из текста артикула
		var cleanText = articleText.replace('-', '');

		// Создаем временный элемент textarea
		var tempTextArea = document.createElement('textarea');

		// Устанавливаем в текстовое поле значение текста артикула без символа "-"
		tempTextArea.value = cleanText;

		// Добавляем временный элемент textarea в документ
		document.body.appendChild(tempTextArea);

		// Выделяем текст в textarea
		tempTextArea.select();

		// Копируем выделенный текст в буфер обмена
		document.execCommand('copy');

		// Удаляем временный элемент textarea
		document.body.removeChild(tempTextArea);

		// Выводим сообщение об успешном копировании
		alert('Номер артикула товара скопирован в буфер обмена: ' + cleanText);
	});
}

//========================================================================================================================================================
// Действия после отправки форм
//========================================================================================================================================================

document.addEventListener("formSent", function (e) {
	const currentForm = e.detail.form;
	if (currentForm.classList.contains('form-quick')){
		flsModules.popup.close()
		setTimeout(()=>{
			flsModules.popup.open('#thankfulness')
		}, 500)
	} else if (currentForm.classList.contains('contact-us__form')){
		alert('Сообщение успешно отправлено')
	}
});
