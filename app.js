async function getJSON() {
    return fetch('https://swapi.dev/api/films/6/')
        .then((response) => response.json())
        .then((responseJson) => { return responseJson });
}

async function caller() {
    const json = await this.getJSON();  // command waits until completion
    console.log(json.hello);            // hello is now available
}

caller();