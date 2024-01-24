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

const formSearchBtn = document.querySelector('.search-header__button');
const formSearch = document.querySelector('.search-header__form');
if (formSearch && formSearchBtn) {
	formSearchBtn.addEventListener('click', () => {
		formSearch.classList.toggle('_active')
	})
}

// ScrollUp

const offset = 500;
const scrollUp = document.querySelector('.scroll-up')
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
