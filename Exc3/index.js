/*
В задании сказано что нужно выводить ошибку
Я не стал этого делать, написал валидацию и ограничил
пользователя в вводе неверных символов.
В 4 задании сделал как нужно.

Также метод не работал который был приложен в задании
который lorem.picsum
В итоге я нашел другое API
и сделал на промисах + xmlhttprequest.

С fetch было бы лучше наверное, но я специально поставил
задачу сделать именно с xmlhttprequest

Также использовал классы для практики.
*/

class ImageLoader {
	loadImages = async (count) => {
		let promises = [];
		let imageLoader = new ImageLoader();

		for (let i = 0; i < count; i++) {
			promises.push(imageLoader.getPhoto());
		}

		return Promise.all(promises).then((values) => {
			return values;
		});
	};

	drawImages = (container, imageUrls = []) => {
		if (imageUrls.length > 0) {
			container.innerHTML = "";

			let images = [];
			imageUrls.forEach((item) => {
				let imgElement = document.createElement("div");

				imgElement.classList.add("loaded-image");
				imgElement.style.cssText = `
			background-image:url(${item.url});
			background-size:cover;
			background-position:50% 50%;
		  `;

				images.push(imgElement);
			});

			images.forEach((img) => {
				container.appendChild(img);
			});
		}
	};

	getPhoto(url = "https://dog.ceo/api/breeds/image/random") {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			xhr.onload = function () {
				let img = {};
				if (xhr.status !== 200) {
					img.url = xhr.status;
				} else {
					const result = JSON.parse(xhr.response);
					img.url = result.message;
				}

				resolve(img);
			};

			xhr.onerror = function () {
				console.log("Ошибка! Статус ответа: ", xhr.status);
			};

			xhr.send();
		});
	}

	static initInput(input, container) {
		let inputValue = parseFloat(input.value);

		if (inputValue < input.min) {
			input.value = input.min;
		}

		if (inputValue > input.max) {
			input.value = input.max;
		}

		if (isNaN(inputValue)) {
			input.value = "";
		}

		if (input.value !== "") {
			let imgLoader = new ImageLoader();

			new Promise((resolve, reject) => {
				resolve(imgLoader.loadImages(input.value));
			}).then((images) => {
				imgLoader.drawImages(container, images);
			});
		}
	}
}

let photoNumberInput = document.querySelector("#photo-number");
//let errorTextBtn = document.querySelector("#error-text");
let imgContainer = document.querySelector("#img-container");

let delayTimer;
photoNumberInput.addEventListener("input", (e) => {
	clearTimeout(delayTimer);
	delayTimer = setTimeout(function () {
		ImageLoader.initInput(e.target, imgContainer);
	}, 300);
});

window.onload = function () {
	photoNumberInput.focus();
};

/* Напишите код приложения,
  интерфейс которого представляет собой input и кнопку.
  В input можно ввести любое число.
  При клике на кнопку происходит следующее:

  Если число не попадает в диапазон от 1 до 10 —
  выводить ниже текст «число вне диапазона от 1 до 10».

  Если число попадает в диапазон от 1 до 10 — с
  делать запрос c помощью XHR
  по URL https://picsum.photos/v2/list?limit=10,
  где get-параметр limit — это введённое число.

  Пример. Если пользователь ввёл 5,
  то запрос будет
  вида: https://picsum.photos/v2/list?limit=5.
  После получения данных вывести ниже картинки на экран. */
