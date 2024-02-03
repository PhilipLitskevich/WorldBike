// Создаем элемент тега script
var script = document.createElement('script');
// Устанавливаем атрибуты src и другие параметры скрипта API
script.src = 'https://api-maps.yandex.ru/v3/?apikey=fea225af-55b9-4955-bb23-c3187c0c1a7e&lang=en_US';
// Добавляем скрипт в раздел head
document.head.appendChild(script);

import mapCustomization from '../map-customization.json'
// "https://api-maps.yandex.ru/v3/?apikey=fea225af-55b9-4955-bb23-c3187c0c1a7e&lang=ru_RU"

// YA v.3.0:
async function initMap() {
	// Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
	await ymaps3.ready;
	await ymaps3.ready;
	const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls } = ymaps3;
	const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

	if (document.getElementById('map')) {
		// Иницилиазируем карту
		const map = new YMap(
			// Передаём ссылку на HTMLElement контейнера
			document.getElementById('map'),

			// Передаём параметры инициализации карты
			{
				location: {
					// Координаты центра карты
					center: [37.568641, 55.72363806901335],
					// Уровень масштабирования
					zoom: 15,
				},
				behaviors: ['drag', 'pinchZoom', 'mouseTilt', 'dblClick']

			},
			[
				// Add a map scheme layer
				new YMapDefaultSchemeLayer({}),
				// Add a layer of geo objects to display the markers
				new YMapDefaultFeaturesLayer({})
			]
		);

		// Create markers with a custom icon and add them to the map	
		const markerElement = document.createElement('div');
		markerElement.className = 'map__marker';
		map.addChild(new YMapMarker({
			coordinates: [37.568641, 55.72363806901335],
		},
			markerElement
		));
		map.addChild(
			// Using YMapControls you can change the position of the control
			new YMapControls({ position: 'right' })
				// Add the zoom control to the map
				.addChild(new YMapZoomControl({}))
		);

		// Добавляем слой для отображения схематической карты
		map.addChild(new YMapDefaultSchemeLayer({
			theme: "dark",
			customization: mapCustomization,
		}));
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации карты
	initMap();
});