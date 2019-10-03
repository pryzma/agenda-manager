const contact_type =  (sequelize, Sequelize) => {
    const ContactType = sequelize.define('ContactType',{
        id: {
            type: Sequelize.STRING,
            notEmpty: true,
            primaryKey: true
        },
        type: {type: Sequelize.STRING},
    })
    return ContactType;
}
module.exports = contact_type;