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
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        full_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });
    return Account;
}
module.exports = account;