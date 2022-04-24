const SCRIPT = {
    urls: {
        base: 'https://swapi.dev/api/',
        people: 'people/',
        planets: 'planets/',
        films: 'films/',
        species: 'species/',
        vehicles: 'vehicles/',
        starships: 'starships/',
    },
    init: () => {
        SCRIPT.addListeners();
        SCRIPT.buildNav();
    },
    addListeners: () => {
        let nav = document.getElementById('nav');
        nav.addEventListener('click', SCRIPT.getData);
        footer.addEventListener('click', SCRIPT.getData);
    },
    buildNav: () => {
        let df = new DocumentFragment();
        for (let nm in SCRIPT.urls) {
            if (nm != 'base') {
                let link = document.createElement('a');
                link.href = `${SCRIPT.urls.base}${SCRIPT.urls[nm]}`;
                link.textContent = nm;
                link.setAttribute('data-link', `${SCRIPT.urls.base}${SCRIPT.urls[nm]}`);
                df.append(link);
            }
        }
        document.getElementById('nav').append(df);
    },

    getData: (ev) => {
        if (ev) ev.preventDefault();

    },
    buildList: (data) => {
        let m = document.getElementById('main');
        console.log(data);

        let footer = document.getElementById('footer');
        footer.innerHTML = '';

        if (data.previous) {

        }
        if (data.next) {

        }
    },
};

document.addEventListener('DOMContentLoaded', SCRIPT.init);