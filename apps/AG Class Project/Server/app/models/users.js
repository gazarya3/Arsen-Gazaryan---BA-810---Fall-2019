var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
const Bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    active: { type: Boolean, default: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateRegistered: { type: Date, default: Date.now }
});
UserSchema.pre('save', function (next) {
    var person = this;
    if (this.isModified('password') || this.isNew) {
        Bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                person.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// router.put('/users/password/:id', function (req, res, next) {
//     logger.log('info', 'Update user ' + req.params.id);
//     User.findById(req.params.id)
//         .exec()
//         .then(function (user) {
//             if (req.body.password !== undefined) {
//                 user.password = req.body.password;
//             }
//             user.save()
//                 .then(function (user) {
//                     res.status(200).json(user);
//                 })
//                 .catch(function (err) {
//                     return next(err);
//                 });
//         })
//         .catch(function (err) {
//             return next(err);
//         });
// });


module.exports =
    Mongoose.model('User', UserSchema);

