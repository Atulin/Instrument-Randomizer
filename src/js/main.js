new Vue({
    el: '#app',
    data: {
        instruments: [],
        randomized: [],
        amount: 5
    },
    methods: {
        randomize: function () {
            this.randomized = [];
            for (let i = 0; i < this.amount; i++) {
                this.randomized.push(this.instruments.random());
            }
        }
    },
    mounted() {
        axios.get('data/instruments.json')
            .then(res => {
                this.instruments = res.data;
                this.randomize();
            })
            .catch(console.error);
    }
})

Array.prototype.random = function () {
    let rand = Math.round(Math.random() * (this.length - 1));
    return this[rand];
}
