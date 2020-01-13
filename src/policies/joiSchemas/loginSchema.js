let joi = require('joi');
console.log("in JOI");
let getEmployeeSchema = joi.object().keys({
    name: joi.string().min(3).required().options({
        language: {
            any: {
                required: 'Please provide valid name'
            },
            string: {
                min: 'name should have minimum 3 characters'
            }
        }
    }),
    password: joi.string().min(6).max(16).required().options({
        language: {
            any: {
                required: 'Please provide password'
            },
            string: {
                min: 'Password must be more than 6 chareacters',
                max: 'Password must be less than 16 characters'
            }
        }
    }),
    email: joi.string().email().required().options({
        language: {
            any: {
                required: 'Please provide Email'
            },
            string: {
                email: 'Please provide valid emailId'
            }
        }
    })
});

module.exports = getEmployeeSchema;