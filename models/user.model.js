var mongoose = require('mongoose');
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId },
        userID: { type: String, index: true },
        firstName: { type: String, maxlength: 32 },
        lastName: { type: String, maxlength: 32 },
        emailID: { type: String, trim: true, required: true },
        passwordHash: { type: String },
        phoneCode: { type: String },
        phoneNumber: { type: String },
        city: { type: String },
        state: String,
        country: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deletedAt: { type: Date, default: null },                  // for soft deletion of data
    },
    { versionKey: false, timestamps: true },
    { collection: 'user' }
);

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.passwordHash = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    comparePassword: function (password) {
        return bcrypt.compareSync(password, this.passwordHash);
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return '';
        try {
            const SALT_ROUNDS = 10;
            return bcrypt.hashSync(plainpassword, SALT_ROUNDS);
        } catch (err) {
            console.log(err);
            return '';
        }
    }
};

module.exports = mongoose.model('user', UserSchema);
