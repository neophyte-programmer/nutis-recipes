// Variables

const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')
const searchResult = document.querySelector('.search__result')
const container = document.querySelector('.container')
// Stores app ID and app key
const APP_ID = '2343a8e9'
const APP_KEY = '570fa7f53e979dd545cf1eac36c8aed9'

// Stores the search input value
let searchValue = ''

// Functions
const generateHTML = (hits) => {
	let html = ''
	// Display error message if no results are found
	if (hits.length === 0) {
		html += `
        <div class="error__container">
                    <p class="error__message">
                        Oops. No results found. Try Again
                    </p>
                    <div class="error__image">
                        <img src="/not-found.svg" alt="" class="error__img">
                    </div>

                </div>
        `
	}

	hits.map((hit) => {
		html += `
            <div class="search__item">
            <div class="rating">
                <ion-icon name="hourglass-outline" class="time__icon"></ion-icon>
                <span class="duration">
                    ${hit.recipe.totalTime}
                    <span class="duration-string">m</span>
                </span>
            </div>
            <img src="${hit.recipe.image}" alt="" class="search__item-img">
            <div class="flex__container">
                <h1 class="search__item-title">${hit.recipe.label}</h1>
                <a href="${hit.recipe.url}" class="btn">View </a>

            </div>
            <div class="search__item-data">
                <div class="calories">
                    <ion-icon name="flame-outline" class="calories__icon"></ion-icon>
                    <span class="calories-value">
                        ${Math.round(hit.recipe.calories)}
                        <span class="calories-string">kcal</span>
                </div>
                <div class="meal__type">
                    <ion-icon name="pizza-outline" class="meal__type-icon"></ion-icon>
                    <span class="meal__type-value">
                        ${hit.recipe.mealType}
                    </span>
                </div>
            </div>
            <div class="search__item-nationality">
                <ion-icon name="flag-outline" class="meal__type-icon" ></ion-icon>
                <span class="nationality">
                    ${hit.recipe.cuisineType}
                </span>
            </div>
        </div>
            `
	})
	searchResult.innerHTML = html
}

// Using async await because we are fetching API data
const fetchAPI = async () => {
	const baseURL = `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`
	const response = await fetch(baseURL)
	const data = await response.json() // Convert the data to JSON
	generateHTML(data.hits)
	console.log(data)
}

const search = (e) => {
	e.preventDefault()
	searchValue = searchInput.value
	console.log(searchValue)
	fetchAPI()
}

// Event Listeners

searchForm.addEventListener('submit', search)
