const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class List extends Model {}

List.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		position: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'list',
	}
);

module.exports = List;
