/*Key de la Api del Clima*/
const API_KEY = '565eae8b69f8f140f3a6b99cb10369d3'

/*Recive la data de la posición del usuario*/
const fetchData = position =>{
    /*Obtener la Latitud y Longitud de la consulta*/
    const {latitude,longitude} = position.coords;

    /*Las comillas invertidas `` se hacen con Alt+96*/
    /*Pasar el parámetro de longitud y latitud a la api de clima*/
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

const setWeatherData = data => {

    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),

    }

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanUp();

}

const cleanUp = () =>{

    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display = 'flex';

}

/*Obtener el date en JS */
const getDate = () =>{
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`;
}

/*Obtener Información de la Ubicación del Usuario*/
const OnLoad = () =>{
    navigator.geolocation.getCurrentPosition(fetchData);
}


