const express = require('express');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes');

const app = express();
const swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
