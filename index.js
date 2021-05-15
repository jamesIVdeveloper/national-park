'use: strict';

const apiKey = 'W25gwW17bgVHafeKaGgweVVGcDGR1LHvuofiG210';

const requiredURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson, limit) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length & i < limit; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">Link</a>`
        )};
    $('#results').removeClass('hidden');
}

function getParks(query, limit=10) {
    const params = {
        stateCode: query,
        limit,
        api_key: apiKey 
    };

    const queryString = formatQueryParams(params)
    const url = requiredURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, limit))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        })
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let stateCode = $('#js-state-search').val();
        let limit = $('#js-number-results').val();
        getParks(stateCode, limit);
    });
}

$(watchForm);