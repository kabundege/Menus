const path = require('path');
const express = require('express');
const  dotenv =  require('dotenv');

dotenv.config();

const publicPath = path.join(__dirname, '../', 'build');
const app = express();

const PORT = process.env.PORT || 9000;

app.use( express.static(publicPath) );

app.get('*', (req,res)=>{
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${ PORT }`);
})
