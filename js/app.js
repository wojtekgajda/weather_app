let weather = {
  apiKey: "b44e615cadeb473384284604202209",
  fetchWeather: function (city) {

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${weather.apiKey}&q=${city}&days=3`)
      .then((response) => response.json())
      .then(data => {
          this.displayWeather(data);
          this.displayForecast(data);
        }
      )
      .catch(err => console.log('Error: ' + err))
  },
  displayWeather: function (data) {
    const {name} = data.location
    const {temp_c, wind_kph, humidity, pressure_mb, is_day} = data.current
    let {icon} = data.current.condition
    let timeOfDay = is_day ? 'day' : 'night'
    let iconNum = icon.slice(-7)

    document.querySelector('.city__name').innerText = name
    document.querySelector('.temperature__value').innerHTML = temp_c
    document.querySelector('.pressure__value').innerHTML = pressure_mb
    document.querySelector('.humidity__value').innerHTML = humidity
    document.querySelector('.wind-speed__value').innerHTML = wind_kph
    document.querySelector('.weather__icon img').src = `assets/icons/${timeOfDay}/${iconNum}`
  },

  displayForecast: function (data) {

    const list = document.querySelector('.weather__forecast')

    function getDayName(dateStr, locale) {
      let date = new Date(dateStr);
      return date.toLocaleDateString(locale, {weekday: 'long'})
    }

    const infoForecast = data.forecast.forecastday

    let liList = ''
    for (let i = 0; i < infoForecast.length; i++) {
      let obj = infoForecast[i]
      let date = obj.date
      let icon = obj.day.condition.icon
      let temp = obj.day.avgtemp_c
      let dayName = getDayName(date)
      let iconNum = icon.slice(-7)
      console.log(dayName)
      console.log(iconNum)
      console.log(temp)
      let newLiElement = document.createElement('li')
      newLiElement = `<li>
          <span class="day">${dayName}</span><img src="assets/icons/day/${iconNum}"/>
          <span class="temperature"><span class="temperature__value">${temp}</span>&deg;C</span>
        </li>`
      liList = [...liList, newLiElement]
    }
    list.innerHTML = liList.join('')
  },

  search:
    function () {
      const cityToFind = document.getElementById('search').value
      return this.fetchWeather(cityToFind)
    }
}
const add_city_button = document.querySelector('#add-city')
const find_city_button = document.querySelector('.find-city button')
const app_container = document.querySelector('#app')
const module_weather = document.querySelector('.module__weather')
const close_search_button = document.querySelector('.close-search')
const close_weather_display = document.querySelector('.close_weather_display')

add_city_button.addEventListener('click', function (e) {
  e.preventDefault();
  app_container.style.display = 'flex'
})

find_city_button.addEventListener('click', function (e) {
  e.preventDefault()
  weather.search()
  module_weather.style.display = 'flex'
})

close_search_button.addEventListener('click', (e) => {
  e.preventDefault()
  app_container.style.display = 'none'
})

close_weather_display.addEventListener('click', (e) => {
  e.preventDefault()
  module_weather.style.display = 'none'
})


