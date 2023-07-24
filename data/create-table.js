require('dotenv').config();
// pour réaliser une création de table avec sequelize
// on part de notre objet connecté à la bdd
// un require va executer le code du module ciblé
const sequelize = require('../app/database');
// on définit déjà les modèles, sans ça impossible pour sequelize de les connaitre
const { List, Card, Tag } = require('../app/models');

const db = {
	create: async () => {
		try {
			await sequelize.drop();
			await sequelize.sync();
			// seulement après avoir crée les tables, je peux mettre des choses dedans
			db.seeding();
		} catch (error) {
			console.log(error);
		}
	},
	seeding: async () => {
		try {
			const enCours = await List.create({
				name: 'En Cours',
				position: 1,
			});
			const fini = await List.create({
				name: 'Fini',
				position: 2,
			});
			const test1 = await Card.create({
				name: 'test1',
				position: 1,
				list_id: enCours.id,
			});
			const test2 = await Card.create({
				name: 'test',
				position: 1,
				list_id: fini.id,
			});
			const tag1 = await Tag.create({
				name: 'tag1',
			});
			const tag2 = await Tag.create({
				name: 'tag2',
			});

			enCours.addCard(test1);
			fini.addCard(test2);
			test1.addTagCards(tag1);
			test1.addTagCards(tag2);
			test2.addTagCards(tag1);
		} catch (error) {
			console.log(error);
		}
	},
};

// on execute la fonction qui appelle sequelize.sync qui s'occupe de crée des tables à partir des modèles
db.create();
