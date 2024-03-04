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
				popupProductId.value = product.dataset.productId
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
// Копирование артикула товара
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
	if (currentForm.classList.contains('form-quick')) {
		flsModules.popup.close()
		setTimeout(() => {
			flsModules.popup.open('#thankfulness')
		}, 500)
	} else if (currentForm.classList.contains('contact-us__form')) {
		alert('Сообщение успешно отправлено')
	} else if (currentForm.classList.contains('personal-information__form')) {
		alert('Данные успешно изменены')
	} else if (currentForm.classList.contains('account-password__form')) {
		alert('Пароль успешно изменен')
	}
});

//========================================================================================================================================================
//Избранное
//========================================================================================================================================================

function favoriteInit() {
	const favoriteButton = document.querySelectorAll('.favorite-button');
	const favoriteQuantity = document.querySelector('.actions-header__favorites-quantity');
	const favoriteList = document.querySelector('.account-favorites__cards');
	const merchendiseFavoriteButton = document.querySelector('.merchendise-favorite-button')

	//Загрузка данных из localStorage
	function loadFavoriteItems() {
		// Получаем данные из localStorage
		let storedItems = localStorage.getItem('favorite-items');
		// Проверяем, есть ли данные в localStorage
		if (storedItems) {
			// Если данные есть, парсим их обратно в массив
			return JSON.parse(storedItems);
		} else return [];
	}
	let favoriteItems = loadFavoriteItems();

	//Вывод в header количества продукта в корзине
	function printQuantity() {
		let quantity = favoriteItems.length;
		favoriteQuantity.textContent = quantity;
		quantity > 0 ? favoriteQuantity.parentNode.classList.add('active') : favoriteQuantity.parentNode.classList.remove('active');
	};
	printQuantity()

	//Удаление элемента по id
	function removeObjectById(id) {
		favoriteItems = favoriteItems.filter(function (obj) {
			return obj.id !== id;
		});
	}

	// Удаление продукта из избранных
	const deleteProducts = (productParent) => {
		if (productParent) {
			let id = productParent.dataset.productId;
			if (favoriteList) {
				favoriteList.querySelector(`.product[data-product-id="${id}"]`).remove()
			}

			const deletedProductCard = document.querySelector(`.product[data-product-id="${id}"]`)
			if (deletedProductCard) {
				deletedProductCard.querySelector('.favorite-button').dataset.selected = false;
			}
			removeObjectById(id)
			printQuantity()
			updateCartItemsInLocalStorage()
		}
	};

	//Изменение кнопок продукта, занесенных в Избранное
	function selecteButton(id) {
		const selectedProductCards = document.querySelectorAll(`.product[data-product-id="${id}"]`)
		if (selectedProductCards.length) {
			selectedProductCards.forEach(card => { card.querySelector('.favorite-button').dataset.selected = true });
		}
		if (merchendiseFavoriteButton) {
			merchendiseFavoriteButton.dataset.selected = true
		}
	}

	if (favoriteItems) {
		favoriteItems.forEach(item => {
			selecteButton(item.id)
		})
	}

	// Обновление данных в LocalStorage
	function updateCartItemsInLocalStorage() {
		if (favoriteItems.length < 1) {
			localStorage.removeItem('favorite-items');
			return
		}
		localStorage.setItem('favorite-items', JSON.stringify(favoriteItems));
	}

	// Добавление продуктов в Избранные
	function addProductToFavorites(product) {
		let copyProduct = Object.assign({}, product);
		if (favoriteList) {
			favoriteList.insertAdjacentHTML('afterbegin', generateFavoriteProduct(copyProduct));
		}
		printQuantity();
	}
	favoriteItems.forEach(item => {
		addProductToFavorites(item)
	})

	//Создание карточки продукта в избранных 
	function generateFavoriteProduct(product) {
		let copyProduct = Object.assign({}, product);
		function productItems(copyProduct) {
			let productItems = ''
			for (let index = 0; index < copyProduct.images.length; index++) {
				const element = copyProduct.images[index];
				productItems += `
							<div class="image-switch__item">
								<div class="image-switch__img"><img src="${element.url}" alt="${element.alt}"></div>
							</div>
							`;
			}
			return productItems
		}
		function productVerification(copyProduct) {
			if (copyProduct.status) {
				return `<div class="product__status ${copyProduct.status.class}">${copyProduct.status.text}</div>`
			} else {
				return ''
			}
		}
		function countryVerification(copyProduct) {
			if (copyProduct.country) {
				return `<div class="product__country">
				<img src="${copyProduct.country.url}" alt="${copyProduct.country.alt}">
			</div>`
			} else {
				return ''
			}
		}

		//Загрузка данных корзины из localStorage
		function loadCartItems() {
			// Получаем данные из localStorage
			let storedItems = localStorage.getItem('cart-items');
			// Проверяем, есть ли данные в localStorage
			if (storedItems) {
				// Если данные есть, парсим их обратно в массив
				return JSON.parse(storedItems);
			} else return [];
		}
		let cartItems = loadCartItems();
		let disabled;
		if (cartItems.some(item => item.id === copyProduct.id)) {
			disabled = 'disabled'
		} else {
			disabled = '';
		};

		return `
			<article class="product" data-product-id="${copyProduct.id}">
			${productVerification(copyProduct)}
			${countryVerification(copyProduct)}
			<a href="${copyProduct.link}" class="product__image">
				<div class="product__switch image-switch">		
					${productItems(copyProduct)}		
				</div>
				<ul class="product__image-pagination image-pagination" aria-hidden="true"></ul>
			</a>
			<div class="product__content">
				<h3 class="product__title">
					<a href="${copyProduct.link}">${copyProduct.title}</a>
				</h3>
				<div class="product__content-row">
					<div class="product__price product-price">
						<span class="product-price__current">${copyProduct.currentPrice}</span>
						<span class="product-price__old">${copyProduct.oldPrice}</span>
					</div>
		
					<div class="product__content-action">
						<button class="product__action-button favorite-button" data-selected="true">
							<svg class="product__action-icon">
								<use xlink:href="img/icons/icons.svg#svg-heart"></use>
							</svg>
						</button>
		
						<button class="product__action-button cart-button" ${disabled}>
							<svg class="product__action-icon">
								<use xlink:href="img/icons/icons.svg#svg-cart"></use>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<button class="product__btn button-hover" data-popup="#quick">
				<svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
					<path
						d="M9.875 2.5C10.0408 2.5 10.1997 2.56585 10.3169 2.68306C10.4342 2.80027 10.5 2.95924 10.5 3.125V5.625C10.5 5.79076 10.4342 5.94973 10.3169 6.06694C10.1997 6.18415 10.0408 6.25 9.875 6.25C9.70924 6.25 9.55027 6.18415 9.43306 6.06694C9.31585 5.94973 9.25 5.79076 9.25 5.625V3.125C9.25 2.95924 9.31585 2.80027 9.43306 2.68306C9.55027 2.56585 9.70924 2.5 9.875 2.5ZM5.0125 4.5125C5.07056 4.4543 5.13953 4.40812 5.21546 4.37661C5.29139 4.3451 5.37279 4.32888 5.455 4.32888C5.53721 4.32888 5.61861 4.3451 5.69454 4.37661C5.77047 4.40812 5.83944 4.4543 5.8975 4.5125L7.665 6.28125C7.72469 6.3389 7.77231 6.40787 7.80506 6.48412C7.83782 6.56037 7.85506 6.64239 7.85578 6.72537C7.8565 6.80836 7.84069 6.89066 7.80926 6.96747C7.77784 7.04428 7.73143 7.11406 7.67275 7.17275C7.61406 7.23143 7.54428 7.27784 7.46747 7.30926C7.39066 7.34069 7.30836 7.3565 7.22537 7.35578C7.14239 7.35506 7.06037 7.33782 6.98412 7.30506C6.90787 7.27231 6.8389 7.22469 6.78125 7.165L5.01375 5.3975C4.89658 5.28029 4.83076 5.12135 4.83076 4.95563C4.83076 4.7899 4.89658 4.63095 5.01375 4.51375L5.0125 4.5125ZM14.7375 4.5125C14.7957 4.57056 14.8419 4.63953 14.8734 4.71546C14.9049 4.79139 14.9211 4.87279 14.9211 4.955C14.9211 5.03721 14.9049 5.11861 14.8734 5.19454C14.8419 5.27047 14.7957 5.33944 14.7375 5.3975L12.9675 7.165C12.9098 7.22469 12.8409 7.27231 12.7646 7.30506C12.6884 7.33782 12.6064 7.35506 12.5234 7.35578C12.4404 7.3565 12.3581 7.34069 12.2813 7.30926C12.2045 7.27784 12.1347 7.23143 12.076 7.17275C12.0173 7.11406 11.9709 7.04428 11.9395 6.96747C11.9081 6.89066 11.8922 6.80836 11.893 6.72537C11.8937 6.64239 11.9109 6.56037 11.9437 6.48412C11.9764 6.40787 12.0241 6.3389 12.0837 6.28125L13.8512 4.51375C13.9685 4.39658 14.1274 4.33076 14.2931 4.33076C14.4589 4.33076 14.6178 4.39658 14.735 4.51375L14.7375 4.5125ZM3 9.375C3 9.20924 3.06585 9.05027 3.18306 8.93306C3.30027 8.81585 3.45924 8.75 3.625 8.75H6.125C6.29076 8.75 6.44973 8.81585 6.56694 8.93306C6.68415 9.05027 6.75 9.20924 6.75 9.375C6.75 9.54076 6.68415 9.69973 6.56694 9.81694C6.44973 9.93415 6.29076 10 6.125 10H3.625C3.45924 10 3.30027 9.93415 3.18306 9.81694C3.06585 9.69973 3 9.54076 3 9.375ZM11.3 9.125C11.1176 8.97306 10.8957 8.8762 10.6602 8.84578C10.4248 8.81535 10.1855 8.8526 9.97045 8.95318C9.75539 9.05376 9.57343 9.2135 9.44584 9.41371C9.31826 9.61393 9.25033 9.84634 9.25 10.0838V21.46C9.25 22.615 10.6813 23.1525 11.4412 22.2837L13.9738 19.3888C14.1499 19.1879 14.3669 19.027 14.6103 18.9168C14.8537 18.8067 15.1178 18.7498 15.385 18.75H19.3988C20.5675 18.75 21.0975 17.2875 20.1987 16.54L11.3 9.12375V9.125ZM10.5 21.4625V10.0838L19.3988 17.5H15.385C14.9394 17.4999 14.499 17.5952 14.0933 17.7793C13.6875 17.9634 13.3259 18.2321 13.0325 18.5675L10.5 21.4625Z"
						fill="white" />
				</svg>
				<span>В 1 клик</span>
			</button>
		</article>
		`;
	};

	if (favoriteButton || document.querySelector('.account-favorites')) {
		document.addEventListener("click", function (e) {
			if (e.target.closest('.favorite-button')) {
				let button = e.target.closest('.favorite-button');
				// проверка на наличие в избранном
				if (button.dataset.selected !== 'true') {
					let parent = button.closest('.product');

					let priceCurrent = parent.querySelector('.product-price__current').innerText;
					let priceOld = parent.querySelector('.product-price__old').innerText;
					if (!priceOld) {
						priceOld = '';
					}

					let imageSwitch = parent.querySelector('.image-switch')
					let images = [];

					imageSwitch.querySelectorAll('img').forEach(img => {
						let obj = {
							url: img.getAttribute('src'),
							alt: img.getAttribute('alt')
						}
						images.push(obj)
					})

					//Проверка наличия страны изготовления продукта
					let country
					if (parent.querySelector('.product__country') !== null) {
						country = {
							url: parent.querySelector('.product__country img').getAttribute('src'),
							alt: parent.querySelector('.product__country img').getAttribute('alt'),
						}
					} else {
						country = false
					}

					// Добавление класса при отсутствии товара в наличии
					function statusCheck(parent) {
						const status = parent.querySelector('.product__status');
						if (status.classList.contains('_out-in-stock')) {
							return '_out-in-stock'
						} else {
							return ''
						}
					}

					//Проверка наличия статуса продукта
					let status
					if (parent.querySelector('.product__status') !== null) {
						status = {
							text: parent.querySelector('.product__status').innerText,
							class: statusCheck(parent),
						}
					} else {
						status = false
					}

					//Создание объекта данных продукта
					let product = {
						link: parent.querySelector(".product-link").getAttribute('href'),
						id: parent.dataset.productId,
						country: country,
						images: images,
						title: parent.querySelector('.product__title').innerText,
						currentPrice: priceCurrent,
						oldPrice: priceOld,
						status: status
					};

					// Добавление объекта продукта в массив всех избранных продуктов
					favoriteItems.push(product)

					updateCartItemsInLocalStorage()
					addProductToFavorites(product);
					selecteButton(product.id)
					printQuantity()

					if (favoriteItems) {
						favoriteItems.forEach(item => {
							setTimeout(
								selecteButton, 1000, item.id
							)
						})
					}
				} else {
					deleteProducts(button.closest('.product'))
				}
			}
		})
	}

	if (merchendiseFavoriteButton) {
		merchendiseFavoriteButton.addEventListener('click', () => {
			// проверка на наличие в избранном
			if (merchendiseFavoriteButton.dataset.selected !== 'true') {

				let priceCurrent = document.querySelector('.merchandise-price__current').innerText;
				let priceOld = document.querySelector('.merchandise-price__old').innerText;
				if (!priceOld) {
					priceOld = '';
				}

				let imageSlider = document.querySelector('.images-merchandise__slider')
				let images = [];

				imageSlider.querySelectorAll('img').forEach(img => {
					let obj = {
						url: img.getAttribute('src'),
						alt: img.getAttribute('alt')
					}
					images.push(obj)
				})

				//Проверка наличия страны изготовления продукта
				let country
				let countryElem = document.querySelector('[data-country-url]')
				if (countryElem) {
					if (countryElem.dataset !== null) {
						country = {
							url: countryElem.dataset.countryUrl,
							alt: countryElem.textContent,
						}
					} else {
						country = false
					}
				}

				// Добавление класса при отсутствии товара в наличии
				function statusCheck() {
					const status = document.querySelector('.header-merchandise__status');
					if (status.classList.contains('_out-in-stock')) {
						return '_out-in-stock'
					} else {
						return ''
					}
				}

				//Проверка наличия статуса продукта
				let status
				if (document.querySelector('.header-merchandise__status') !== null) {
					status = {
						text: document.querySelector('.header-merchandise__status').innerText,
						class: statusCheck(),
					}
				} else {
					status = false
				}

				//Создание объекта данных продукта
				let product = {
					link: window.location.href,
					id: document.getElementById('articleElement').textContent.replace('-', ''),
					country: country,
					images: images,
					title: document.querySelector('.header-merchandise__title').innerText,
					currentPrice: priceCurrent,
					oldPrice: priceOld,
					status: status
				};

				// Добавление объекта продукта в массив всех избранных продуктов
				favoriteItems.push(product)

				updateCartItemsInLocalStorage()
				addProductToFavorites(product);
				selecteButton(product.id)
				printQuantity()

				if (favoriteItems) {
					favoriteItems.forEach(item => {
						setTimeout(
							selecteButton, 1000, item.id
						)
					})
				}
			} else {
				merchendiseFavoriteButton.dataset.selected = false;
				removeObjectById(document.getElementById('articleElement').textContent.replace('-', ''))
				printQuantity()
				updateCartItemsInLocalStorage()
			}
		})
	}

};
favoriteInit()

//========================================================================================================================================================
// Корзина
//========================================================================================================================================================

function cartInit() {
	const cartButton = document.querySelectorAll('.cart-button');
	const merchendiseСartButton = document.querySelector('.merchendise-cart-button');
	const cartQuantity = document.querySelector('.actions-header__cart-quantity');

	const fullPrice = document.getElementById('full-price');
	const discount = document.getElementById('discount');
	const totalPrice = document.getElementById('total-price');

	const cartList = document.querySelector('.content-cart__list');
	const cleanCart = document.getElementById('clean-cart')

	let fullPriceVar = 0;
	let discountVar = 0;
	let totalPriceVar = 0;

	//Загрузка данных из localStorage
	function loadCartItems() {
		// Получаем данные из localStorage
		let storedItems = localStorage.getItem('cart-items');
		// Проверяем, есть ли данные в localStorage
		if (storedItems) {
			// Если данные есть, парсим их обратно в массив
			return JSON.parse(storedItems);
		} else return [];
	}
	let cartItems = loadCartItems();

	//Удаление элемента по id
	function removeObjectById(id) {
		cartItems = cartItems.filter(function (obj) {
			return obj.id !== id;
		});
	}

	//Удаление пробелов с цены
	const priceWithoutSpaces = (str) => {
		return str.replace(/\s/g, '');
	};

	//Добавление пробелов к цене и символа валюты
	function normalPrice(str) {
		const formattedNumber = String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u00A0');
		return formattedNumber + ' ₽'; // Добавляем символ рубля
	};

	//Сложение цен
	function plusPrice(priceVar, price) {
		return parseInt(priceVar) + parseInt(price);
	};
	//Вычитание цен
	const minusPrice = (priceVar, price) => {
		return parseInt(priceVar) - parseInt(price);
	};

	// Вычисление сумм цен
	function calculationPrices(product) {
		let copyProduct = Object.assign({}, product);
		totalPriceVar = plusPrice(totalPriceVar, copyProduct.currentPrice * copyProduct.quantity);
		fullPriceVar = plusPrice(fullPriceVar, copyProduct.oldPrice * copyProduct.quantity);
		discountVar = fullPriceVar - totalPriceVar;
	}

	//Вывод в header количества продукта в корзине
	function printQuantity() {
		let quantity = cartItems.reduce((accumulator, obj) => accumulator + parseInt(obj.quantity), 0);
		cartQuantity.textContent = quantity;
		quantity > 0 ? cartQuantity.parentNode.classList.add('active') : cartQuantity.parentNode.classList.remove('active');
	};
	printQuantity()

	//Отключение кнопок продукта, занесенных в корзину
	function disabledButton(id) {
		const disabledProductCards = document.querySelectorAll(`.product[data-product-id="${id}"]`)
		if (disabledProductCards.length > 0) {
			disabledProductCards.forEach(card => {
				if (card) {
					card.querySelector('.cart-button').disabled = true;
				}
			})
		}
		if (merchendiseСartButton) {
			let merchendiseId = document.getElementById('articleElement').textContent.replace('-', '')
			if (id === merchendiseId) {
				merchendiseСartButton.disabled = true;
			}
		}
	}
	if (cartItems) {
		cartItems.forEach(item => {
			disabledButton(item.id)
		})
	}

	// Обновление данных в LocalStorage
	function updateCartItemsInLocalStorage() {
		if (cartItems.length < 1) {
			localStorage.removeItem('cart-items');
			return
		}
		localStorage.setItem('cart-items', JSON.stringify(cartItems));
	}

	// Обновление, пересчет и вывод данных
	function updateCart() {
		totalPriceVar = 0;
		fullPriceVar = 0;
		discountVar = 0;

		cartItems.forEach(item => {
			calculationPrices(item)
		})

		printQuantity();
		if (cartList) {
			printAllPrice()
		}
	}
	// навешишание события Change на input элемента quantity
	function addInputChange(item) {
		const product = item.querySelector('.cart-product')
		const quantityElem = product.querySelector('.quantity')
		const quantityInput = quantityElem.querySelector('input')
		const id = product.dataset.productId

		if (!quantityInput.onchange) {
			quantityInput.addEventListener('change', () => {
				updateProductQuantity(id, quantityInput.value);
			});
		}
	}
	// Добавление продуктов в корзину
	function addProductToCart(product) {
		let copyProduct = Object.assign({}, product);
		calculationPrices(product)

		if (cartList) {
			printAllPrice();
			cartList.insertAdjacentHTML('afterbegin', generateCartProduct(copyProduct));

			const items = cartList.querySelectorAll('.content-cart__item')
			if (items.length > 0) {
				items.forEach(item => {
					addInputChange(item)
				})
			}
		}
		printQuantity();
	}
	if (cartList) {
		cartItems.forEach(item => {
			addProductToCart(item)
		})
	}

	//Вывод полной суммы цен товаров, итоговой суммы скидок и итоговой суммы со скидками
	function printAllPrice() {
		fullPrice.textContent = `${normalPrice(fullPriceVar)}`;
		discount.textContent = `${normalPrice(discountVar)}`;
		totalPrice.textContent = `${normalPrice(totalPriceVar)}`;
	};

	//Создание разметки продукта в корзине 
	function generateCartProduct(product) {
		let copyProduct = Object.assign({}, product);
		if (copyProduct.oldPrice === copyProduct.currentPrice) {
			copyProduct.oldPrice = ''
		} else {
			copyProduct.oldPrice = normalPrice(copyProduct.oldPrice)
		};

		if (copyProduct.currentPrice === 0) {
			copyProduct.currentPrice = ''
		} else {
			copyProduct.currentPrice = normalPrice(copyProduct.currentPrice)
		};

		return `
	<li class="content-cart__item">
	<article class="content-cart__product cart-product" data-product-id="${copyProduct.id}">
		<img src="${copyProduct.img}" alt="${copyProduct.alt}" class="cart-product__image">
		<h3 class="cart-product__name">
			${copyProduct.title}
		</h3>
		<div class="cart-product__quantity quantity">
			<button type="button" class="quantity__button quantity__button_minus"></button>
			<div class="quantity__input">
				<input autocomplete="off" type="number" name="form[]" value="${copyProduct.quantity}" maxlength="4">
			</div>
			<button type="button" class="quantity__button quantity__button_plus"></button>
		</div>
		<div class="cart-product__price">
			<span class="cart-product__current-price">${copyProduct.currentPrice}</span>
			<span class="cart-product__old-price">${copyProduct.oldPrice}</span>
		</div>
		<button class="cart-product__delete-button">
			<svg class="cart-product__delete-icon">
				<use xlink:href="img/icons/icons.svg#svg-close"></use>
			</svg>
		</button>
	</article>
</li>
	`;
	};

	// Удаление продукта из корзины
	const deleteProducts = (productParent) => {
		let id = productParent.querySelector('.cart-product').dataset.productId;
		const deletedProductCard = document.querySelector(`.product[data-product-id="${id}"]`)
		if (deletedProductCard) {
			deletedProductCard.querySelector('.cart-button').disabled = false;
		}
		removeObjectById(id)
		updateCartItemsInLocalStorage()
		updateCart()
		productParent.remove();
	};

	if (cartButton || document.querySelector('.account-favorites')) {
		document.addEventListener('click', (e) => {
			let self = e.target;
			if (self.closest('.cart-button')) {
				let parent = self.closest('.product');
				let priceCurrentNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').innerText));
				let priceOldString = priceWithoutSpaces(parent.querySelector('.product-price__old').innerText);
				let priceOldNumber;
				if (priceOldString.length > 0) {
					priceOldNumber = parseInt(priceOldString)
				} else { priceOldNumber = priceCurrentNumber }

				let product = {
					id: parent.dataset.productId,
					img: parent.querySelector('.image-switch__img img').getAttribute('src'),
					alt: parent.querySelector('.image-switch__img img').getAttribute('alt'),
					title: parent.querySelector('.product__title').innerText,
					currentPrice: priceCurrentNumber,
					oldPrice: priceOldNumber,
					quantity: 1,
				};

				cartItems.push(product)

				updateCartItemsInLocalStorage()
				addProductToCart(product);
				disabledButton(product.id);
			}
		});
	}

	if (merchendiseСartButton) {
		merchendiseСartButton.addEventListener('click', () => {
			let priceCurrentNumber = parseInt(priceWithoutSpaces(document.querySelector('.merchandise-price__current').innerText));
			let priceOldString = priceWithoutSpaces(document.querySelector('.merchandise-price__old').innerText);
			let priceOldNumber;
			if (priceOldString.length > 0) {
				priceOldNumber = parseInt(priceOldString)
			} else { priceOldNumber = priceCurrentNumber }
			console.log(document.querySelector('.quantity__input input'))
			let quantity = document.querySelector('.quantity__input input').value
			const size = document.querySelector('.merchandise-size__input:checked + .merchandise-size__label .merchandise-size__text').textContent
			const color = document.querySelector('.merchandise-colors__label:has(.merchandise-colors__input:checked) .color-name').textContent
			let product = {
				id: document.getElementById('articleElement').textContent.replace('-', ''),
				img: document.querySelector('.images-merchandise__slide img').getAttribute('src'),
				alt: document.querySelector('.images-merchandise__slide img').getAttribute('alt'),
				title: document.querySelector('.header-merchandise__title').innerText,
				currentPrice: priceCurrentNumber,
				oldPrice: priceOldNumber,
				quantity: quantity,
				size: size,
				color: color
			};

			cartItems.push(product)

			updateCartItemsInLocalStorage()
			addProductToCart(product);

			// Отключение кнопки в козину
			disabledButton(product.id);
		})
	}

	function updateProductQuantity(id, quantity) {
		const index = cartItems.findIndex(obj => obj.id === id);
		if (index !== -1) {
			// Объект найден, выполните необходимые изменения:
			cartItems[index].quantity = quantity;

			updateCartItemsInLocalStorage()
			updateCart()

		} else {
			console.error('Ошибка')
			// Обработка ситуации, когда объект не найден
		}
	}

	// Очищение всей корзины
	if (cleanCart && cartList) {
		cleanCart.addEventListener('click', () => {
			cartList.querySelectorAll('.content-cart__item').forEach(item => {
				if (item) { deleteProducts(item) }
			})
		})

		cartList.addEventListener('click', (e) => {
			let targetElement = e.target;
			// Удаление проодукта из корзины по нажатию
			if (targetElement.classList.contains('cart-product__delete-button')) {
				deleteProducts(targetElement.closest('.content-cart__item'));
			}
			// Изменение количества продукта по клику
			if (targetElement.closest('.quantity')) {
				const product = targetElement.closest('.cart-product')
				const quantityElem = targetElement.closest('.quantity')
				const quantityInput = quantityElem.querySelector('input')
				const id = product.dataset.productId
				setTimeout(() => {
					updateProductQuantity(id, quantityInput.value)
				}, 5)
			}
		});


	}
}

cartInit();
//========================================================================================================================================================

