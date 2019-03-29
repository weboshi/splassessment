
module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Jobs", {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
            len: [1, 500]
            }
        },
            username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
            len: [1, 50]
            }
        },
        posting: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
            len: [0, 500]
            }
        },
        inactive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Job;
  }
  