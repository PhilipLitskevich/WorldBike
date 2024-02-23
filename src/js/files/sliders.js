/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Pagination, Autoplay, Controller, Navigation, FreeMode, Thumbs } from 'swiper/modules';
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
			sliderPar.slider.disable();
			// sliderPar.slider.destroy(true, true);
			sliderPar.init = false;
		}
		return sliderPar;
	} else if (sliderPar.breakpoint.matches === false) {
		createSlider(sliderPar);
		// sliderPar.slider.enable()
	}
};
// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.hero-banner__slider_main')) { // Указываем скласс нужного слайдера

		shiftChildrenOrder('.hero-banner__slider_main', secondSliderPar.selector, 'hero-banner__text');
		shiftChildrenOrder(secondSliderPar.selector, thirdSliderPar.selector, 'hero-banner__text')

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
				320: {
					slidesPerView: 1.4,
					allowTouchMove: true,
				},
				479.98: {
					slidesPerView: 1,
					allowTouchMove: false,
				}
			},
		});
		// end
	}
	if (document.querySelector('.offers-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.offers-slider', { // Указываем скласс нужного слайдера
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
	if (document.querySelector('.similar__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.similar__slider', { // Указываем скласс нужного слайдера
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
				nextEl: '.similar__button-next',
				prevEl: '.similar__button-prev',
			},

			a11y: {
				prevSlideMessage: 'Previous slide',
				nextSlideMessage: 'Next slide',
			},
			spaceBetween: 40,
			breakpoints: {
				320: {
					slidesPerView: 1,
					centeredSlides: true,
				},
				// when window width is >= 480px
				650: {
					slidesPerView: 2,
					centeredSlides: false,
				},
				929.98: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				}
			},
		});
		// end
	}
	if (document.querySelector('.articles-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.articles-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [],

			observer: true,
			observeParents: true,
			autoHeight: false,
			speed: 800,
			freeMode: {
				enabled: false,
			},
			spaceBetween: 40,
			breakpoints: {
				320: {
					slidesPerView: 1.3,
					spaceBetween: 8,
				},
				650: {
					slidesPerView: 2.3,
					centeredSlides: false,
					spaceBetween: 20,
				},
				991.98: {
					slidesPerView: 3.3,
					spaceBetween: 40,
				},
				1280: {
					slidesPerView: 3.6,
				},
				1800: {
					slidesPerView: 4.6,
				},
			},
		});
		// end
	}

	copyChildrenAndAddClasses('.mountains__container_grid', '.mountains__wrapper', ['mountains__slide', 'swiper-slide']);
	if (document.querySelector('.mountains-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.mountains-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [FreeMode],
			observer: true,
			observeParents: true,
			autoHeight: false,
			speed: 800,
			freeMode: {
				enabled: true,
				sticky: true,
				momentumVelocityRatio: 0.4,
			},
			spaceBetween: 40,
			breakpoints: {
				320: {
					slidesPerView: 1.05,
					spaceBetween: 16,
				},
				450: {
					slidesPerView: 1.15,
				},
				635: {
					slidesPerView: 1.4,
					spaceBetween: 25,
				}
			},
		});
		// end
	}
	copyChildrenAndAddClasses('.advantages__body', '.advantages-slide__wrapper', ['advantages__slide', 'swiper-slide']);
	if (document.querySelector('.advantages-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.advantages-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [FreeMode],
			observer: true,
			observeParents: true,
			autoHeight: false,
			speed: 800,
			freeMode: {
				enabled: true,
				sticky: true,
				momentumVelocityRatio: 0.4,
			},
			spaceBetween: 40,
			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 16,
				},
				450: {
					slidesPerView: 1.35,
				},
				635: {
					slidesPerView: 1.5,
					spaceBetween: 25,
				}
			},
		});
		// end
	}
	copyChildrenAndAddClasses('.bike__wrapper', '.bike-slide__wrapper', ['bike__slide', 'swiper-slide']);
	if (document.querySelector('.bike-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.bike-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [FreeMode],
			observer: true,
			observeParents: true,
			autoHeight: false,
			speed: 800,
			freeMode: {
				enabled: true,
				sticky: true,
				momentumVelocityRatio: 0.4,
			},
			spaceBetween: 40,
			breakpoints: {
				320: {
					slidesPerView: 1.1,
					spaceBetween: 8,
				},
				450: {
					slidesPerView: 1.2,
					spaceBetween: 16,
				},
				635: {
					slidesPerView: 1.5,
					spaceBetween: 40,
				}
			},
		});
		// end
	}
	if (document.querySelector('.thumbs-images')) {
		const thumbsSwiper = new Swiper('.thumbs-images', {
			modules: [Navigation, Thumbs],
			observer: true,
			observeParents: true,
			autoHeight: false,
			speed: 800,
			spaceBetween: 28,
			slidesPerView: 3,
		});
	
		new Swiper('.images-merchandise__slider', {
			modules: [Navigation, Thumbs],
			thumbs: {
				swiper: thumbsSwiper,
			},
			observer: true,
			observeParents: true,
			autoHeight: false,
			speed: 800,
			navigation: {
				nextEl: '.thumbs-images__button-next',
				prevEl: '.thumbs-images__button-prev',
			},
			spaceBetween: 40,
			slidesPerView: 1,
		});
	}

	if (document.querySelector('.about-gallery__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.about-gallery__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [FreeMode, Autoplay],
			observer: true,
			observeParents: true,
			autoHeight: false,
			speed: 3000,
			loop: true,
			freeMode: {
				enabled: true,
				// sticky: true,
				disableOnInteraction: true,
				momentum: false,
				// momentumVelocityRatio: 0.4,
			},

			autoplay: {
				delay: 1,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},

			spaceBetween: 40,
			breakpoints: {
				320: {
					slidesPerView: 1.5,
					spaceBetween: 8,
				},
				635: {
					slidesPerView: 2.5,
					spaceBetween: 16,
				},
				935: {
					slidesPerView: 3.5,
					spaceBetween: 25,
				},
				1300: {
					slidesPerView: 4.5,
					spaceBetween: 40,
				}
			},
		});
		// end
	}

	if (document.querySelector('.best__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.best__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [FreeMode],

			observer: true,
			observeParents: true,
			autoHeight: false,
			speed: 800,
			freeMode: {
				enabled: true,
				sticky: true,
				momentumVelocityRatio: 0.4,
			},
			spaceBetween: 40,
			breakpoints: {
				320: {
					slidesPerView: 1.15,
					spaceBetween: 8,
				},
				650: {
					spaceBetween: 20,
				},
				991.98: {
					slidesPerView:  2.2,
					spaceBetween: 40,
				},
				1800: {
					slidesPerView: 1.8,
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
});
//Begin
function createSlider(sliderPar) {
	// Создаем слайдер
	sliderPar.slider = new Swiper(sliderPar.selector, { // Указываем скласс нужного слайдера
		modules: [Controller],
		allowTouchMove: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		loop: true,
		freeMode: {
			enabled: false,
		},
	});
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

//Скопировать слайды и добавить в слайдер
function copyChildrenAndAddClasses(donorClass, acceptorClass, classNames = ['slider-name__slide', 'swiper-slide']) {
	const donor = document.querySelector(donorClass);
	const acceptor = document.querySelector(acceptorClass);

	if (donor && acceptor) {
		[...donor.children].forEach((child) => {
			const clonedChild = child.cloneNode(true);
			clonedChild.classList.add(...classNames);
			acceptor.appendChild(clonedChild);
		});
	}
}

// Копирование контента слайдов и сдвиг на одну позицию
function shiftChildrenOrder(sourceSelector, targetSelector, className) {
	const sourceElement = document.querySelector(sourceSelector);
	const targetElement = document.querySelector(targetSelector).querySelector('.swiper-wrapper');

	if (sourceElement && targetElement) {
		const children = [...sourceElement.getElementsByClassName(className)];
		const clonedChildren = children.map(child => child.cloneNode(true));

		targetElement.textContent = '';

		const firstElement = clonedChildren.shift();
		clonedChildren.push(firstElement);

		clonedChildren.forEach(child => {
			if (!child.classList.contains('hero-banner__slide')) {
				child.classList.add('hero-banner__slide')
			}
			if (!child.classList.contains('swiper-slide')) {
				child.classList.add('swiper-slide')
			}
			targetElement.appendChild(child);
		});
	}
}



