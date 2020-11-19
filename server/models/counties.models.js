const mongoose = require('mongoose')

const CountySchema = new mongoose.Schema({
    name:String,
    population:Number,
    cases_last_14:Array,
    mask:Boolean,
    area:Number,
    state:String,
    hist_ave_temp:Number,
    risk_factor:Number,
    county_code:Number,
})

const County = mongoose.model('county',CountySchema)
const USSchema = new mongoose.Schema({
    max_area:Number,
    min_area:Number,
    max_cases:Number,
    min_cases:Number,
    max_pop:Number,
    min_pop:Number,
})

const US = mongoose.model('usa',USSchema)

module.exports = County,US