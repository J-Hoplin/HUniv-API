const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            nickname: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            role: {
                type: Sequelize.ENUM(['admin', 'user']),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: false,
            paranoid: false,
            underscored: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) { }
}

module.exports = User;
