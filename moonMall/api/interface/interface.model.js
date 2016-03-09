var mongoose = require('bluebird').promisifyAll(require('mongoose'),{multiArgs:true});


var InterfaceSchema = new mongoose.Schema({
    project:String,
    userName:String,
    url:String,
    description:String,
    successTpl:mongoose.Schema.Types.Mixed,
    failTpl:mongoose.Schema.Types.Mixed,
    params:mongoose.Schema.Types.Mixed
})
module.exports = mongoose.model('Interface',InterfaceSchema);
