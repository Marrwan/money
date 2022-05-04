const mongoose = require('mongoose');

// create type schema
const postSchema = new mongoose.Schema({
    amount : { type: Number, required: true },
    category : { type: String, required: true },
    type : { type: String, required: true },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
     date: {
        type: Date,
     }
}, {timestamps: true});

// postSchema.pre(/^find/, async function (next) {
//     this.populate({
//         path: 'author',
//     });
//     next();
// });



// export model
module.exports = mongoose.model('Post', postSchema);