const mongoose = require("mongoose");


const carbonSchema = new mongoose.Schema({

    userId:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User"

    },


    emission:{

        type:Number,

        required:true

    },


    credits:{

        type:Number,

        default:0

    },


    trees:{

        type:Number,

        default:0

    },


    date:{

        type:Date,

        default:Date.now

    }

});


module.exports = mongoose.model(
    "Carbon",
    carbonSchema
);