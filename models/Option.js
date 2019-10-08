module.exports =  (sequelize, Sequelize) => {
    return sequelize.define('Option',{
        id: {
            type: Sequelize.STRING,
            notEmpty: true,
            primaryKey: true
        },
        name: {
            type : Sequelize.STRING,
            notEmpty: true
        },
        date: {
            type : Sequelize.DATE,
            notEmpty: true
        },
        time: {
            type : Sequelize.DATE
        },
        timePresence: {
            type : Sequelize.DATE
        },
        timeSoundcheck: {
            type : Sequelize.DATE
        },
        timeStart: {
            type : Sequelize.DATE
        },
        dateDeadline : {
            type : Sequelize.DATE
        },
        participant: {
            type : Sequelize.STRING
        },
        isConfirmed: {
            type : Sequelize.INTEGER
        },
        createdBy: {
            type : Sequelize.STRING
        },
        contact: {
            type : Sequelize.STRING,
            notEmpty: true
        }

    })
}
 