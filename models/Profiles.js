const profile = (sequelize, Sequelize) => {
    const Profile = sequelize.define('Profile',{
        id: {
            type: Sequelize.STRING,
            notEmpty: true,
            primaryKey: true
        },
        name: {type: Sequelize.STRING},
        auth : {type: Sequelize.STRING}
    });
    return Profile;
}
module.exports = profile