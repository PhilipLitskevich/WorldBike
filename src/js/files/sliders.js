/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Pagination, Autoplay, Controller, Navigation } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

let mainSlider
let secondSliderPar = {
	slider: undefined,
	breakpoint: window.matchMedia('(max-width: 479.98px)'),
	selector: '.hero-banner__slider_second',
	init: false,
}
let thirdSliderPar = {
	slider: undefined,
	breakpoint: window.matchMedia('(max-width: 766.98px)'),
	selector: '.hero-banner__slider_third',
	init: false,
}
const breakpointChecker = function (sliderPar) {
	if (sliderPar.breakpoint.matches === true) {
		if (sliderPar.init) {
			sliderPar.slider.detachEvents();
			// sliderPar.slider.destroy(true, true);
			sliderPar.init = false;
		}
		return sliderPar;
	} else if (sliderPar.breakpoint.matches === false) {
		createSlider(sliderPar);
	}
};
// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.hero-banner__slider_main')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		mainSlider = new Swiper('.hero-banner__slider_main', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Pagination, Autoplay, Controller],

			observer: true,
			observeParents: true,
			slidesPerView: 1,

			// autoHeight: true,
			speed: 1500,
			loop: true,
			freeMode: {
				enabled: false,
			},
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},

			// Пагинация
			pagination: {
				el: '.hero-banner__slider-paginations',
				clickable: true,
			},
			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: 1.4,
					allowTouchMove: true,
				},
				// when window width is >= 480px
				479.98: {
					slidesPerView: 1,
					allowTouchMove: false,
					allowTouchMove: true,
				}
			},
			// События
			on: {

			}
		});
		// end
	}

	if (document.querySelector('.offers-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		const offersSlider = new Swiper('.offers-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],

			observer: true,
			observeParents: true,
			// allowTouchMove: false,
			autoHeight: false,
			speed: 800,
			// loop: true,
			// loopAdditionalSlides: 7,
			freeMode: {
				enabled: false,
			},

			navigation: {
				nextEl: '.offers__button-next',
				prevEl: '.offers__button-prev',
			},

			a11y: {
				prevSlideMessage: 'Previous slide',
				nextSlideMessage: 'Next slide',
			},
			slidesPerView: 3,
			spaceBetween: 40,
			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: 1,
					centeredSlides: true,
				},
				// when window width is >= 480px
				650: {
					slidesPerView: 2,
					centeredSlides: false,
				},
				991.98: {
					slidesPerView: 3,
				},
			},
		});
		// end
	}
}



window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();

	// keep an eye on viewport size changes
	secondSliderPar.breakpoint.addEventListener('change', () => {
		breakpointChecker(secondSliderPar);
		// console.log(secondSliderPar)
	});
	thirdSliderPar.breakpoint.addEventListener('change', () => {
		breakpointChecker(thirdSliderPar);
		// console.log(thirdSliderPar)
	});

	// kickstart
	breakpointChecker(secondSliderPar);
	breakpointChecker(thirdSliderPar);
	// breakpointChecker(thirdSlider, breakpointThird);

});
//Begin
function createSlider(sliderPar) {
	// Создаем слайдер
	sliderPar.slider = new Swiper(sliderPar.selector, { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Controller],
		allowTouchMove: false,
		// observer: true,
		// observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		// speed: 800,
		loop: true,
		freeMode: {
			enabled: false,
		},
		on: {

		}
	});
	// console.log(mainSlider, 'Первый слайдер')
	// console.log(secondSliderPar.slider, 'Второй слайдер')
	// console.log(thirdSliderPar.slider, 'Третий слайдер')
	// // // let a = undefined;
	// // if (mainSlider && a) {
	// // 	// console.log('Работает')
	// // } else {
	// // 	console.log('не Работает')

	// }

	sliderPar.init = true;
	//End
	if (mainSlider && secondSliderPar.init && thirdSliderPar.init) {
		mainSlider.controller.control = [secondSliderPar.slider, thirdSliderPar.slider];
		// console.log('Все слайдеры существуют')
	} else if (mainSlider && secondSliderPar.init) {
		mainSlider.controller.control = [secondSliderPar.slider];
		// console.log('Существует только второй слайдер')
	} else if (mainSlider && thirdSliderPar.init) {
		mainSlider.controller.control = [thirdSliderPar.slider]
		// console.log('Существует только третий слайдер')
	};
	if (mainSlider && secondSliderPar.init) {
		secondSliderPar.slider.controller.control = [mainSlider];
		// console.log('Существует второй слайдер')
	}
	if (mainSlider && thirdSliderPar.init) {
		thirdSliderPar.slider.controller.control = [mainSlider];
		// console.log('Существует третий слайдер')
	}
}


