const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks  = require('nunjucks');
const models = require('./models');
const routes = require('./routes');

const app = express();
const logger = morgan();
const env = nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(logger);
app.use(express.static(__dirname + '/public'));


//do we need both body parsers?
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use('/', routes);

//{force: true} creates new tables everytime its synced
models.db.sync()
    .then(() => {
        console.log('All tables created!');
        app.listen(3000, function(){
            console.log('Server is listening on port 3000');
        })
    })
    .catch(console.error.bind(console));
