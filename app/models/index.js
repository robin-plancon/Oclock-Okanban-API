const Card = require('./card');
const List = require('./list');
const Tag = require('./tag');

// on définit les relations entre les modèles
// une liste peut avoir plusieurs cartes
List.hasMany(Card, {
	foreignKey: 'list_id',
});
// une carte appartient à une liste
Card.belongsTo(List, {
	foreignKey: 'list_id',
});
// une carte peut avoir plusieurs tags
Card.belongsToMany(Tag, {
	through: 'card_has_tag',
	foreignKey: 'card_id',
	otherKey: 'tag_id',
});
// un tag peut avoir plusieurs cartes
Tag.belongsToMany(Card, {
	through: 'card_has_tag',
	foreignKey: 'tag_id',
	otherKey: 'card_id',
});

module.exports = {
	Card,
	List,
	Tag,
};
