
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const applicationRoutes = require('./routes/application');

const corsOptions ={
   origin:'*', 
   credentials:true,       
   optionSuccessStatus:200,
}

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions))

app.use('/api/application', applicationRoutes);

const PORT = 3000

app.listen(PORT, () => console.log(`[api] Api launched, port ${PORT}`))
