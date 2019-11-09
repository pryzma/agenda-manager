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
        participants : {
            type : Sequelize.STRING,
            notEmpty: true
        },
        time: {
            type : Sequelize.STRING
        },
        timePresence: {
            type : Sequelize.STRING
        },
        timeSoundcheck: {
            type : Sequelize.STRING
        },
        timeSets: {
            type : Sequelize.STRING
        },
        timeStart: {
            type : Sequelize.STRING
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
 