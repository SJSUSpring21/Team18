const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var appMetricsSchema = new Schema({
    _id: {type: Number, required: true},
    custId: {type: Number,  ref: 'customers',required: true},
    appId:{type: Number,  ref: 'userApplications',required: true},
    podId:{type:Number,ref:'podsConfig',required:true},
    metricsTypeId:{type: Number, ref: 'metricsType',required: true},
    metricsData:{type:Number,required:false},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false
  
});

const appMetricsModel = mongoose.model('appMetrics', appMetricsSchema);
module.exports = appMetricsModel;