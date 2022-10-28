const axios = require('axios');

const getTodaysPastEvents = async() => {
    console.log(`fetching today's events...`)
    await axios.get('https://history.muffinlabs.com/date')
        .then((res) => {
            const { Events } = res.data.data;
            console.log(Events[Math.floor(Math.random() * 25)])
            return Events[Math.floor(Math.random() * 25)];
        })
        .catch((err) => {
            return err;
        });
};

module.exports = { getTodaysPastEvents };