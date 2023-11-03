const express = require("express");
const sequelize = require('./config/connnection')

const PORT = 3001;
const app = express();

app.get('/', (req, res)=>{
    res.send("Hi, we are connected!")
})

sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
})

