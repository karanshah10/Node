let joi = require('joi');
let getLoginSchema = require('./joiSchemas/loginSchema');

module.exports = function(req,res,next){
    joi.validate(req.body,getLoginSchema,function(err,resp){
        if(err){
            res.status(400);
            res.send({
                msg:"BAd request",
                details:err.details[0].message.toString()
            });
        }else{
            next();
        }
    })
}