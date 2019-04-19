const searchButton = document.getElementById('search');
const input = document.getElementById('userInput');
const returnData = document.getElementById('returnData');

const fetchArray = apiArr => Promise.all(apiArr.map(url => fetch(url).then(r => r.json())));

const makeRequest = async () => {
  try {
    returnData.innerHTML = 'Loading ...';

    const { value } = input;
    const response = await fetch(`https://swapi.co/api/people/?search=${value}`);
    const data = await response.json();

    const { name, films } = data.results[0];
    const titleArr = await fetchArray(films);
    const formattedList = new Intl.ListFormat('en');
    let movie;
    let they;
    if (films.length > 1) {
      movie = 'movies';
      they = '. They are';
    } else {
      movie = 'movie';
      they = ',';
    }

    returnData.innerHTML = `${name} has appeared in ${
      films.length
    } ${movie}${they} ${formattedList.format(titleArr.map(film => ` ${film.title}`))}.`;

    if (data.results.length > 1) {
      const multipleNameArr = [];
      for (let i = 0; i < data.results.length; i++) {
        multipleNameArr.push(data.results[i].name);
      }
      console.log(multipleNameArr);
      returnData.innerHTML = `${data.results.length} results returned: ${formattedList.format(
        multipleNameArr.map(d => `${d}`),
      )}. Please provide a more specific name.`;
    }

    console.log(titleArr);
  } catch (err) {
    console.log('What Happened???', err);
    returnData.innerHTML = 'That name could not be found in the database.';
  }
};

const addElementAfterEnter = (e) => {
  if (e.keyCode === 13) {
    makeRequest();
  }
};

searchButton.addEventListener('click', makeRequest);
input.addEventListener('keypress', addElementAfterEnter);
