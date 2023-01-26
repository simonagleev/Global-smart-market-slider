const numInputsList = document.querySelectorAll(".number-input")
const form = document.querySelector(".form")
const progressElement = document.querySelector(".slider-progress")
const rangeInputs = document.querySelectorAll(".slider-input")

const sliderInputsDifference = 100

const inputsHandler = () => {
	numInputsList.forEach((input) => {
		const rangeInputHandler = (e) => {
			const min = parseInt(numInputsList[0].value)
			const max = Math.floor(parseInt(numInputsList[1].value))

			if (max - min > sliderInputsDifference && max <= rangeInputs[0].max) {
				if (e.target.id === "min-input") {
					rangeInputs[0].value = min
					progressElement.style.left = `${(min / rangeInputs[0].max) * 100}%`
				} else {
					rangeInputs[1].value = max
					progressElement.style.right = `${100 - (max / rangeInputs[0].max) * 100}%`
				}
			}
		};

		input.addEventListener("input", rangeInputHandler)
	});
};

const sliderHandler = () => {
	rangeInputs.forEach((input) => {
		const rangeInputHandler = (e) => {
			const min = parseInt(rangeInputs[0].value);
			const max = Math.floor(parseInt(rangeInputs[1].value))

			const progressLeft = (min / rangeInputs[0].max) * 100
			const progressRight = 100 - (max / rangeInputs[0].max) * 100

			if (max - min < sliderInputsDifference) {
				if (e.target.id === "min-range") {
					rangeInputs[0].value = max - sliderInputsDifference;
					numInputsList[0].value = max - sliderInputsDifference;
				} else {
					rangeInputs[1].value = min + sliderInputsDifference;
					numInputsList[1].value = min + sliderInputsDifference;
				}
			} else {
				progressElement.style.left = `${progressLeft}%`
				progressElement.style.right = `${progressRight}%`
				numInputsList[0].value = min;
				numInputsList[1].value = max;
			}
		};

		input.addEventListener("input", rangeInputHandler)
	});
};

const submitHandler = () => {
	const submitForm = (e) => {
		e.preventDefault()
		const result = {
			min: numInputsList[0].value,
			max: numInputsList[1].value,
		};

		const formData = JSON.stringify(result);

		const postData = async (url, data) => {
			try {
				const res = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
					body: data,
				});
			} catch (error) {
				console.log(error)
			}
		};

		postData("url", formData);
	};

	form.addEventListener("submit", submitForm)
};

inputsHandler()
sliderHandler()
submitHandler()

