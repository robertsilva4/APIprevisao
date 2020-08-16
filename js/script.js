const URL_CIDADE = 'https://api.hgbrasil.com/stats/find_woeid?key=17284dd0&format=json-cors&sdk_version=console&city_name=';
const URL_WOEID = 'https://api.hgbrasil.com/weather/?format=json-cors&key=development&woeid='

function carregar(cidade) {
    fetch(URL_CIDADE + cidade)
        .then(response => response.json())
        .then(({ woeid }) => encontrarWoeid(woeid))
}

function encontrarWoeid(woeid) {
    fetch(URL_WOEID + woeid)
        .then(response => response.json())
        .then(({ results }) => render(results))
}

function render(res) {
    conteudo.innerHTML =
        '<div class="card">' +
        '<h1>' + res.city_name + '</h1>' +
        '<h2> Temperatura: </h2>' +
        '<p>' + res.temp + ' C° </p>' +
        '<h2> Nascer do Sol: </h2>' +
        '<p>' + res.sunrise + '</p>' +
        '<h2> Por do Sol: </h2>' +
        '<p>' + res.sunset + '</p>' +
        '</div>'+
        '<img src="https://assets.hgbrasil.com/weather/images/' + res.img_id + '.png"/>' 

    res.forecast.map((forecast) => {
        prevSemana.innerHTML +=
            '<div class="card">' +
            '<h4>' + forecast.date + '</h4>' +
            '<h5> Dia da Semana: <span>'+forecast.weekday+'</span></h5>'+
            '<h5> Max: <span>'+forecast.max+' C°</span></h5>'+
            '<h5> Min: <span>'+forecast.min+' C°</span></h5>'+
            '<h5> Descrição: </h5>'+
            '<p>'+forecast.description+' '
            +forecast.condition+'</p>'
            '</div>'
    })
}

carregar('São Roque')

consultar.addEventListener('click', function () {
    var cidade = cidades.value
    carregar(cidade)
})