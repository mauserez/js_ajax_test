/*
Api lorem.picsum blocked
В итоге я нашел другое API
*/

let photoWidthInput = document.querySelector("#photo-width");
let photoHeightInput = document.querySelector("#photo-height");
let getPhotoButton = document.querySelector("#get-photo-button");
let errorTextDiv = document.querySelector("#error-text");
let img = document.querySelector("#img-container img");

function validateInput(value) {
	let parsedValue = parseFloat(value);
	let result = { value: parsedValue };

	if (parsedValue >= 100 && parsedValue <= 300) {
		result.check = true;
	} else {
		result.check = false;
	}

	return result;
}

function getPhoto(width = 100, height = 100) {
	return fetch(`https://loremflickr.com/${width}/${height}`).then(
		(response) => {
			return response.url;
		}
	);
}

getPhotoButton.addEventListener("click", async (e) => {
	errorTextDiv.style.height = "0";
	const widthValue = validateInput(photoWidthInput.value);
	const heightValue = validateInput(photoHeightInput.value);

	if (!widthValue.check || !heightValue.check) {
		errorTextDiv.style.height = "15px";
		errorTextDiv.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
		img.setAttribute("src", "");
	} else {
		let photoUrl = await getPhoto(widthValue.value, heightValue.value);
		img.setAttribute("src", photoUrl);
	}
});

window.onload = () => {
	photoWidthInput.focus();
};

/*
Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit.
В input можно ввести любое число.

При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число —
выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;

Если числа попадают в диапазон от 100 до 300 — сделать запрос
c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
. */
