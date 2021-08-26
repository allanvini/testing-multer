const express = require('express');
const port = 4001;
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, ()=>{
    console.log(`Server running ou port: ${port}`);
});