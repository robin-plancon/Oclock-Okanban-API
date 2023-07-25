const { List } = require('../services/models');

const controller = {
    createList: async (req, res) => {
        // Toute erreur générée dans le try sera attrapée par le catch.
        try {
            const { name, position } = req.body;

            // Je choisis de ne pas vérifér si mes datas sont vides ou non, je laisse à la bdd le soin de générer une erreur si besoin.
            const newList = await List.create({
                name,
                position
            });

            // res.json permet de renvoyer une réponse sous forme de json.
            res.json(newList);
        } catch (error) {
            // console.log(error);
            res.status(500).json(error.toString());
        }
    },
    deleteList: async (req, res) => {
        try {
            const { id } = req.params;

            await List.destroy({
                where: {
                    // En Javascript, si on donne une variable dans un objet, on peut l'écrire de ma manière raccourcie en donnant juste le nom de la variable. id <=> id: id
                    id
                }
            });

            res.json("List deleted");
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    getList: async (req, res) => {
        try {
            const { id } = req.params;

            const list = await List.findByPk(id, {
                include: {
                    association: 'cards',
                    include: 'tags'
                },
                order: [
                    ['cards', 'position', 'DESC']
                ]
            });

            res.json(list);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    getLists: async (req, res) => {
        try {
            // le await bloque l'exécution de ma fonction jusqu'à la réponse de la bdd.
            const lists = await List.findAll({
                include: {
                    association: 'cards',
                    include: 'tags'
                },
                order: [
                    // Je dis à Sequelize d'organiser mes listes dans un ordre croissant selon leur position (la propriété position).
                    ['position', 'ASC'],
                    // Même chose, mais pour les cartes. Je précise le tableau à trier en rajoutant un troisième paramètre (rajouté en première position).
                    ['cards', 'position', 'ASC']
                ]
            });
            // Ici, on renvoit les données récupérées depuis la BDD (avec sequelize). On les renvoit sous forme JSON.
            res.json(lists);
        } catch (error) {
            // console.log(error);
            res.status(500).json(error.toString());
        }
    },
    getListCards: async (req, res) => {
        try {
            const { id } = req.params;

            const list = await List.findByPk(id, {
                include: {
                    association: "cards",
                    include: "tags"
                },
                order: [
                    ['cards', 'position', 'ASC']
                ]
            });

            res.json(list);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    modifyList: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, position } = req.body;

            const updatedList = await List.update({
                // Quand vous utilisez cette écriture, si la variable est undefined, alors c'est comme si elle n'était pas ajoutée (c'est une fonctionnalité de Javascript, et pas de la méthode update).
                name,
                position
            }, {
                where: {
                    id
                },
                returning: true
            });

            res.json(updatedList);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    }
}

module.exports = controller;