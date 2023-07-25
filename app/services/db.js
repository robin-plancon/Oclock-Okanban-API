const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Première étape, je crée une connexion avec ma BDD via Sequelize.
// new permet de créer une nouvelle instance d'une classe. Ex: j'ai une classe Guerrier, avec new je crée un nouveau personnage qui sera de type guerrier.
// Dans l'ordre on renseigne: le nom de la bdd, le nom de l'utilisateur, le mot de passe.
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    // Je précise l'adresse du serveur, pour nous c'est en localhost.
    host: DB_HOST,
    // Je précise le port de la db, par défaut il est à 5432. 
    port: DB_PORT,
    // J'annonce le type de la BDD, pour nous c'est postgres.
    dialect: 'postgres',
    // Le define permet de configurer le fonctionnement de Sequelize.
    define: {
        // Par défaut Sequelize fonction en kamelCase, alors que nous on travaille en snake_case. On active donc cette option pour passer en snake_case.
        underscored: true,
        // On précise le nom a utiliser lorsque Sequelize crée les timestamps.
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = sequelize;