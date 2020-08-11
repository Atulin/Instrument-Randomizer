const { JSDOM } = require('jsdom');
const axios = require('axios');
const fs = require('fs');

async function main() {
    let res = await axios.get('https://en.wikipedia.org/wiki/List_of_musical_instruments').catch(console.error)
    let jsd = new JSDOM(res.data).window;

    let rows = jsd.document.querySelectorAll('tr');

    let instruments = [];
    for (let row of rows) {
        let cols = row.querySelectorAll('td');
        let offset = cols.length > 6 ? 1 : 0;

        if (cols.length < 6) continue;

        let inner = cols[0].querySelectorAll('a')

        for (let inn of inner) {
            instruments.push({
                name: inn.textContent.trim(),
                link: inn.getAttribute('href'),
                classification: cols[1 + offset].textContent.trim(),
                origin: cols[3 + offset].textContent.trim()
            });
        }

    }
    fs.writeFile('./instruments.json', JSON.stringify(instruments, null, 2), err => {
        if (err) throw err;
        'done'.log();
    });
}

// Utilities
Object.prototype.log = function () {
    console.log(this);
}

main().then(_=>{});
