document.getElementById('button').addEventListener("click", (event) => {

    const min = document.getElementById('min').value;
    const max = document.getElementById('max').value;
    
    let error = null;
    
    if (!min) {
        error = 'No min value'
    }
    
    if (!max && !error) {
        error = 'No max value'
    }
    
    if (min === max && !error) {
        error = 'Values are equal'
    }

    if (min > max && !error) {
        error = 'Min is more than max'
    }

    if (error) {
        document.getElementById('error').textContent = error;

        document.getElementById('error').classList.remove('d-none');

        setTimeout(() => {
            document.getElementById('min').value = null;
            document.getElementById('max').value = null;
            document.getElementById('error').classList.add('d-none');
        }, 3000);

        return;
    }

    const random = randomInteger(min, max)

    document.getElementById('result').textContent = random;

    getRandomMeme().then((joke) => {
        document.getElementById('joke').textContent = joke;
    });


});

function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function getRandomMeme() {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            'Accept': 'application/json',
        }
    });
    const joke = await response.json();

    return joke.joke;
}