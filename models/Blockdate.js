module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Blockdate',{
        id: {
            type: Sequelize.STRING,
            notEmpty: true,
            primaryKey: true
        },
        account: {type: Sequelize.STRING},
        date : { type : Sequelize.DATE},
        name: {type: Sequelize.STRING},
        description: {type: Sequelize.STRING}
    });
}