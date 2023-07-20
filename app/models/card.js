const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Card extends Model {}

Card.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		position: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		color: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		tableName: 'card',
	}
);

module.exports = Card;