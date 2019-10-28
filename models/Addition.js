const addition = (sequelize, Sequelize) => {
    const Profile = sequelize.define('Addition',{
        id: {
            type: Sequelize.STRING,
            notEmpty: true,
            primaryKey: true
        },
        module: {type: Sequelize.STRING},
        account: {type: Sequelize.STRING},
        date : { type : Sequelize.DATE}
    });
    return Profile;
}
module.exports = addition;