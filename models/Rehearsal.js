module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Rehearsal',{
        id: {
            type: Sequelize.STRING,
            notEmpty: true,
            primaryKey: true
        },
        name: {type: Sequelize.STRING},
        date: {type: Sequelize.DATE},
        event : {type: Sequelize.STRING},
        participants : {type: Sequelize.STRING}
    });
}