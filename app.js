const express = require('express');
const config = require('./config/server');

const app = config(express());

/*=============================================
=                 APP.JS                      =
=============================================*/

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Serve on port: ', app.get('port'));
})