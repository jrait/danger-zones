const County = require('../models/counties.models')
const csv = require('fast-csv')
const fs = require('fs')

module.exports = {
    allCounties : (req,res) =>{
        County.find()
            .then(data => res.json({results:data}))
            .catch(err => res.json(err))
    },

    updateCounties: (req,res) =>{
        var CountyFile = fs.createReadStream('county_data/covid_confirmed_usafacts.csv')
        var counties = []
        var dates = []

            for(var i = 2;i<16;i++){
            var d = new Date()
            var month = d.getMonth()+1
            var year = d.getFullYear()
            if(d.getDate()<=i && month ===1){
                month = 12
                year--
            }
            var str = `${month}/${d.getDate(d.setDate(d.getDate()-i))}/${year}`
            dates.push(str)
            }
            console.log(dates)

        csv
            .parseStream(CountyFile,{
                headers:true,
                ignoreEmpty:true
                })
                .on("error",errors => res.json(errors))
                .on("data",(county) =>{counties.push(county)})
                .on("end",()=>{
                    for(let i = 0; i<counties.length; i++){
                        var countycases = []
                        for(let j = 0; j<dates.length;j++){
                            countycases.push(parseInt(counties[i][dates[j]]))
                        }
                        County.findOneAndUpdate({county_code:counties[i]['countyFIPS']},{$set:{cases_last_14:countycases}},{new:true})
                            .then(data => res.json({results:data}))
                            .catch(err => res.json(err))
                    }
                })

    },
    findCounty: (req,res) =>{
        County.findOne({county_code:req.params.code})
            .then(data => res.json({results:data}))
            .catch(err => res.json(err))
    },
    deleteAll: (req,res) =>{
        County.deleteMany({county_code:6000})
            .then(data => res.json({results:data}))
            .catch(err => res.json(err))
    },
    findState: (req,res) =>{
        County.find({state: req.params.st}).sort({'state': 1})
            .then(data => res.json({results:data}))
            .catch(err => res.json(err))
    },

    // USED TO SET UP DATABASE WITH UNCHANGING COUNTY INFO:
    

    createCounty: (req,res) =>{
        var CountyFile = fs.createReadStream('county_data/covid_county_population_usafacts.csv')
        var counties = []

        csv
            .parseStream(CountyFile,{
                headers:true,
                ignoreEmpty:true
                })
                .on("error",errors => res.json(errors))
                .on("data",(county) =>{counties.push(county)})
                .on("end",()=>{
                    for(let i = 0; i<counties.length;i++){
                        if(counties.countyFIPS !== 0){
                            County.create({
                                name:counties[i]['County Name'],
                                state:counties[i].State,
                                county_code: counties[i].countyFIPS,
                                population:counties[i].population,
                                mask:false,
                                risk_factor:0,
                            })
                                .then(data => res.json(data))
                                .catch(err => res.json(err))
                        }
                    }
                })
        
    },
    // updateCountiesTemp: (req,res) =>{
    //     var CountyFile = fs.createReadStream('county_data/Book1.csv')
    //     var counties = []

    //     csv
    //         .parseStream(CountyFile,{
    //             headers:true,
    //             ignoreEmpty:true
    //             })
    //             .on("error",errors => res.json(errors))
    //             .on("data",(county) =>{counties.push(county)})
    //             .on("end",()=>{
    //                 for(let i = 0; i<counties.length; i++){
    //                     County.findOneAndUpdate({county_code:counties[i]['County Code']},{$set:{hist_ave_temp:counties[i]['Avg Daily Max Air Temperature (F)']}},{new:true})
    //                         .then(data => res.json({results:data}))
    //                         .catch(err => res.json(err))
    //                 }
    //             })

    // },
    // updateCountiesArea: (req,res) =>{
    //     var CountyFile = fs.createReadStream('county_data/LND01.csv')
    //     var counties = []

    //     csv
    //         .parseStream(CountyFile,{
    //             headers:true,
    //             ignoreEmpty:true
    //             })
    //             .on("error",errors => res.json(errors))
    //             .on("data",(county) =>{counties.push(county)})
    //             .on("end",()=>{
    //                 for(let i = 0; i<counties.length; i++){
    //                     County.findOneAndUpdate({county_code:counties[i]['STCOU']},{$set:{area:counties[i]['LND110210D']}},{new:true})
    //                         .then(data => res.json({results:data}))
    //                         .catch(err => res.json(err))
    //                 }
    //             })

    // },
    
}