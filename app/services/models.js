// Sequelize nous permet de manipuler nos BDDs, mais sous formes d'objets, donc avec des méthodes (méthode = Une fonction définie dans un objet).
// J'importe le module depuis les node_modules (ne pas oublier de l'installer).
const { DataTypes, Model } = require('sequelize');
const sequelize = require("./db");

// Cette ligne nous permet de récupérer par héritage toutes les méthodes définies dans la Classe Model (qui est fourni par le module sequelize).
class List extends Model { };
// La méthode init est une de ces méthodes.
List.init({
    name: DataTypes.STRING,
    position: DataTypes.INTEGER,
}, {
    // On lui donne la connexion à la BDD (fait au dessus) pour que Sequelize sache où chercher.
    sequelize,
    // On précise au cas où le nom de la table, car Sequelize peut parfois chercher le nom des tables en se basant sur le nom du model (List).
    tableName: "list"
});

class Card extends Model { };
Card.init({
    name: DataTypes.STRING,
    position: DataTypes.INTEGER,
    color: DataTypes.STRING,
    list_id: DataTypes.INTEGER
}, {
    sequelize,
    tableName: "card"
});

class Tag extends Model { };
Tag.init({
    name: DataTypes.STRING,
    color: DataTypes.STRING
}, {
    sequelize,
    tableName: "tag"
});

// Les associations

// as => permet de spécifier le nom de cette assiociation lors de son utilisation avec Sequelize.
// foreignKey => on précise le nom de la propriété qui fait office de "liaison" (la clé étrangère).
List.hasMany(Card, { as: "cards", foreignKey: "list_id" });
// Lorsqu'on définie une association avec Sequelize, on doit la spécifier dans les deux sens.
// Donc si une List peut avoir (hasMany) plusieurs Card, plusieurs Cards peuvent appartenir (belongsTo) à une liste.
Card.belongsTo(List, { as: "list", foreignKey: "list_id" });

// through => On précise dans quelle table chercher la liaison entre les Card et les Tag.
// Pour définir la foreignKey, on va se baser sur la table pour laquelle on définie l'association.
// Le otherKey, c'est tout simplement l'autre clé pas encore utilisée.
// On précise timestamps a false, pour que sequelize ne nous génère pas les timestamps automatiquent.
Card.belongsToMany(Tag, { as: "tags", through: "card_has_tag", foreignKey: "card_id", otherKey: "tag_id", timestamps: false });
Tag.belongsToMany(Card, { as: "cards", through: "card_has_tag", foreignKey: "tag_id", otherKey: "card_id", timestamps: false });

module.exports = { List, Card, Tag };