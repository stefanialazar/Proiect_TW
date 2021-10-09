const url = 'http://localhost:5000/quizresults';

const getResults = async() => {

    const response = await fetch(url, { method: 'GET' });
    const results = await response.json();

    return results;
}


window.onload = async() => {
    const results = await getResults();
    console.log(results);
}