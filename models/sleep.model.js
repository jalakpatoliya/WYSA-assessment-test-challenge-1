module.exports = (mongoose) => {
    const sleepDataSchema = new mongoose.Schema(
        {
            id: { type: mongoose.Schema.Types.ObjectId },
            userID: { type: String, index: true },
            sleepStruggleFrom: {
                min:{type:Number,enum:[0,2,8]},                     // in weeks
                max:{type:Number,enum:[2,8,-1]},
             },
            bedTime: Date,
            wakeTime: Date,
            sleepDuration: { type: Number, min: 0, max: 24 },   
            dataCollectionStep: {type:Number,min:1,max:4},          // to continue with same screen from which user left
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
            deletedAt: { type: Date,default:null},                  // for soft deletion of data
        },
        { timestamps: true, versionKey: false },
        { collection: 'sleepData' }
    );
    return mongoose.model('sleepData', sleepDataSchema);
};
