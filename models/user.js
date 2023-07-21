const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    emailToken:{
        type:String,
        required:true
    }, 
    confirmation:{
        type:Boolean,
        required:false
    },
    forgotPasswordCode:{
        type:String,
    
    }
})

const User = mongoose.model('User',userSchema);
/* 
the first argument is the collection name, and the second one
is about what type of object we will keep in the db.
*/
module.exports = User;