import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

const API_URL = "https://api.blockchain.com/v3/exchange/tickers/";
const API_KEY = 'bc3187eb-072c-4ca3-929a-76831d5f2f99';

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const option = req.query.Currency || 'BTC-USD';
        const response = await axios.get(`${API_URL}${option}`, {
            headers: {
                'x-api-key': API_KEY,
            },
        });

        res.render('index.ejs', {
            content: response.data,
        });

    } catch (err) {
        console.log("unable to fetch data", err.message);
        res.status(500).send("Check API key or currency pair");
    }
});

app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});
