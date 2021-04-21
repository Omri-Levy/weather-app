window.addEventListener(`load`, () => {
	const temperatureDescription = document.querySelector(
		`.temperature__description`);
	const temperatureDegree = document.querySelector(
		`.temperature__degree`);
	const locationTimezone = document.querySelector(
		`.location__timezone`);
	const temperatureSection = document.querySelector(
		`.temperature__degree-section`);
	const temperatureSpan = document.querySelector(
		`.temperature__degree-section span`);
	const weatherIcon = document.querySelector(
		`.weather-icon`);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
			const longitude = position.coords.longitude;
			const latitude = position.coords.latitude;


			const apiKey = `aa23e3f27da64f06bd3192603212004`;
			const apiUrl = `https://api.weatherapi.com/v1/current.json?key=` +
				`${apiKey}&q=${latitude},${longitude}`
			const res = await fetch(apiUrl);
			const data = await res.json();


			const { temp_c, temp_f } = data?.current;
			const { country, region } = data?.location;
			const { text, icon } = data?.current?.condition;

			temperatureDegree.textContent = temp_c;
			temperatureDescription.textContent = text;
			locationTimezone.textContent = `${country}, ${region}`;
			weatherIcon.src = `https://${icon}`;

			// change temperature unit
				temperatureSection.addEventListener(`click`,
					() => {
					if (temperatureSpan.textContent === `F`) {
						temperatureSpan.textContent = `C`;
						temperatureDegree.textContent = temp_c;
					} else {
						temperatureSpan.textContent = `F`;
						temperatureDegree.textContent = temp_f;
					}
				})
		})
	} else {
		temperatureDescription.textContent = `Please enable geolocation ` +
			`and try again.`;
	}
})
