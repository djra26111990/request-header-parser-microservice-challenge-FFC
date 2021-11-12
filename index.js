import express from 'express';
import cors from 'cors';
import publicIp from 'public-ip';

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'

app.use(cors());
app.use(cors({optionsSuccessStatus: 200})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const __dirname = process.cwd();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/api/whoami', async (req, res) => {

    const ip = await publicIp.v4().then(ip => ip).catch(err => err);

    console.log(ip);

    res.status(200).json({
        ipaddress: ip,
        language: req.get('Accept-Language'),
        software: req.get('User-Agent')
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});
