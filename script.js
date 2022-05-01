// async function getJson(url) {
//     url = `https://swapi.dev/api/films/1/`;
//     let response = await fetch(url);
//     let data = await response.json();
//     return data;
// }
function showMsg() {
    alert('hi');
}
async function loadNames(url) {
    let s;
    await fetch(url)
        .then(res => res.json())
        .then(data => {
            s = data.title;
            let c = document.getElementById('details');
            c.innerHTML = s;
        })

    return s;
}
//     const response = await fetch(url);
//     const names = await response.json();
// const response = await fetch(`${url}`)

// .then(response => response.json());
//     .then(data => respone.title || response.characters);

// x = x.title || x.characters;

// console.log(names.title || names.characters);
//return response.title || response.characters;
// return x;
// }

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
                df.append("   ");
            }
        }
        document.getElementById('nav').append(df);
    },



    getData: (ev) => {
        if (ev) ev.preventDefault();
        //showoverlay / loader
        document.querySelector('.overlay').classList.add('active');
        //get the url
        let link = ev.target;
        let url = link.getAttribute('data-link');
        //fetch data
        fetch(url)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(SCRIPT.buildList)
            .catch((err) => {
                console.error(err);
                document.querySelector('.overlay').classList.remove('active');
            });

    },


    buildList: (data) => {
        let m = document.getElementById('main');
        //console.log(data);
        //hide overlay /loader
        document.querySelector('.overlay').classList.remove('active');
        //add data
        m.innerHTML = data.results.map((item) => {
            let nm = item.name || item.title;
            var filmChar = item.films || item.characters;
            labels = filmChar.toString().split(',');
            // let o = loadNames(`https://swapi.dev/api/films/1`);
            // let o = getJson(`https://swapi.dev/api/films/1`);
            // fetch(`https://swapi.dev/api/films/1`)
            //     .then(res => res.json())
            //     .then(data => console.log(data.title));
            x = `<p>${nm}</p>`;
            let c = document.getElementById('details');
            c.append(nm);
            c.append(document.createElement('br'));
            async function loadNames(url) {
                let s;
                await fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        s = data.title;



                        c.append(s);
                        c.append(document.createElement('br'));

                    })

                return s;
            }
            for (let i = 0; i < labels.length; i++) {
                x += loadNames(labels[i]);

            }
            // c.append(document.createElement('br'));

            // for (let i = 0; i < labels.length; i++) {

            //      fetch(`${labels[i]}`)
            //         .then(res => res.json())
            //         .then(data => x += data.title);
            //     debugger;
            //     //x = x + y + `<br>`;

            // }
            // console.log(x);
            return x;
        }).join(' ');
        //add prev/next nav
        let footer = document.getElementById('footer');
        footer.innerHTML = '';

        if (data.previous) {
            let prev = document.createElement('a');
            prev.href = data.previous;
            let url = new URL(data.previous);
            let labels = url.pathname.split('/');
            let label = labels[labels.length - 2];
            prev.textContent = `<< Previous ${label}`;
            prev.setAttribute('data-link', data.previous);
            footer.append(prev);
            footer.append("     ...     ");
        }
        if (data.next) {
            let next = document.createElement('a');
            next.href = data.next;
            let url = new URL(data.next);
            let labels = url.pathname.split('/');
            let label = labels[labels.length - 2];
            next.textContent = `Next ${label} >>`;
            next.setAttribute('data-link', data.next);
            footer.append(next);
        }
    },
};

document.addEventListener('DOMContentLoaded', SCRIPT.init);