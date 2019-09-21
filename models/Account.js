const account = (sequelize, Sequelize) => {
    const Account = sequelize.define('account',{
        id: {
            type: Sequelize.STRING,
            notEmpty: true,
            primaryKey: true
        },
        // email is username
        email: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        firstName: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastName: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        isActivated: {
            type: Sequelize.INTEGER,
            notEmpty : true
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });
    return Account;
}
module.exports = account;