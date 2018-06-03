const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const commentSchema = new Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    { usePushEach: true },

    {
        timestamps: true
    }
);


const dishSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },
    { usePushEach: true },

    {
        timestamps: true
    }
);

var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;