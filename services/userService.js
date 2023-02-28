const { User } = require('../db/usersModel');
const { 
    AuthorizationError
 } = require('../helpers/errors');

 const updateSubscription = async (userId, subscriptonType) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { $set: { subscription: subscriptonType } }
    )

    if (!user) {
        throw new AuthorizationError("Not Authorized");
    }

    return user;
 }

 module.exports = {
    updateSubscription
 }