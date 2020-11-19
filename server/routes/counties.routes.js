const CountyController = require('../controllers/counties.controllers')

module.exports = app =>{
    app.get('/api/counties',CountyController.allCounties);
    app.post('/api/counties/create',CountyController.createCounty);
    app.put('/api/counties/update',CountyController.updateCounties);
    app.delete('/api/counties/delete',CountyController.deleteAll);
    app.get('/api/counties/find/:code',CountyController.findCounty);
    app.get('/api/states/find/:st',CountyController.findState);
}