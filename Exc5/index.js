/*
Api lorem.picsum blocked
В итоге я нашел другое API с котами
*/

let photoPageInput = document.querySelector("#photo-page");
let photoLimitInput = document.querySelector("#photo-limit");
let getPhotosButton = document.querySelector("#get-photo-button");
let errorTextDiv = document.querySelector("#error-text");

function validateInput(value) {
	let parsedValue = parseFloat(value);
	let result = { value: parsedValue };

	if (parsedValue >= 1 && parsedValue <= 10) {
		result.check = true;
	} else {
		result.check = false;
	}

	return result;
}

function getPhoto(page = 1, limit = 5) {
	return fetch(
		`https://api.thecatapi.com/v1/images/search?page=${page}&limit=${limit}`
	).then((response) => {
		return response.json();
	});
}

getPhotosButton.addEventListener("click", async (e) => {
	errorTextDiv.style.height = "0";
	const pageValue = validateInput(photoPageInput.value);
	const limitValue = validateInput(photoLimitInput.value);
	let imgContainer = document.querySelector("#img-container");
	imgContainer.innerHTML = "";
	localStorage.photos = [];

	if (!pageValue.check || !limitValue.check) {
		errorTextDiv.style.height = "15px";
		errorTextDiv.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
	} else {
		let photos = await getPhoto(pageValue.value, limitValue.value);

		/*
		API багует и не ограничивает по лимиту
		Пришлось ограничить самому в цикле for
		*/
		let photoUrls = [];
		for (let i = 0; i < limitValue.value; i++) {
			let photoDiv = document.createElement("div");
			photoDiv.style.backgroundImage = `url(${photos[i].url})`;
			imgContainer.append(photoDiv);
			photoUrls.push(photos[i].url);
		}
		localStorage.setItem("photoUrls", JSON.stringify(photoUrls));
	}
});

window.onload = () => {
	photoPageInput.focus();
	drawLocalPhotos();
};

function drawLocalPhotos() {
	if (localStorage.photoUrls) {
		let imgContainer = document.querySelector("#img-container");
		JSON.parse(localStorage.photoUrls).forEach((photoUrl) => {
			let photoDiv = document.createElement("div");
			photoDiv.style.backgroundImage = `url(${photoUrl})`;
			imgContainer.append(photoDiv);
		});
	}
}
/*
Написать код приложения, интерфейс которого состоит из двух input и кнопки.
В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом —
выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;

Если число во втором input не попадает в диапазон от 1 до 10 или не является числом —
выводить ниже текст «Лимит вне диапазона от 1 до 10»;

Если и первый, и второй input не в диапазонах или не являются числами —
выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;

Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10,
где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.

Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу,
то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
  */
