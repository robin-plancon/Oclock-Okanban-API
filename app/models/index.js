const Card = require('./card');
const List = require('./list');
const Tag = require('./tag');

// on définit les relations entre les modèles
// une liste peut avoir plusieurs cartes
List.hasMany(Card, {
	as: 'cards',
	foreignKey: {
		name: 'list_id',
		// allowNull: false,
	},
});
// une carte appartient à une liste
Card.belongsTo(List, {
	as: 'list',
	foreignKey: {
		name: 'list_id',
		// allowNull: false,
	},
});
// une carte peut avoir plusieurs tags
Card.belongsToMany(Tag, {
	as: 'tag_cards',
	through: 'card_has_tag',
	foreignKey: 'card_id',
	otherKey: 'tag_id',
});
// un tag peut avoir plusieurs cartes
Tag.belongsToMany(Card, {
	as: 'card_tags',
	through: 'card_has_tag',
	foreignKey: 'tag_id',
	otherKey: 'card_id',
});

module.exports = {
	Card,
	List,
	Tag,
};
