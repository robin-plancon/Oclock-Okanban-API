const { Card } = require("../services/models");

const controller = {
    addTagToCard: async (req, res) => {
        try {
            // Quand on utilise la destructuration, on doit nommé nos variables du même noms que les propriétés qu'on va destructurer depuis l'objet.
            const { card_id } = req.params;
            const { tag_id } = req.body;

            const card = await Card.findByPk(card_id);
            // addTag est une méthode créée automatiquement par Sequelize, il a nommé cette méthode en se référant aux associations qu'on a défini dans nos models.
            await card.addTag(tag_id);

            res.json("Tag added");
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    createCard: async (req, res) => {
        try {
            // const { name, position, color, list_id } = req.body;

            const newCard = await Card.create({
                // name, position, color, list_id
                // Ici, j'utilise le spread operator, il me permet d'éclater un objet. Pour l'exemple, voir au dessus. Le spread operator va éclater req.body, et fournir chacune de ses propriétés à Card.create (comme écris ligne du dessus).
                ...req.body
            });

            res.json(newCard);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    deleteCard: async (req, res) => {
        try {
            const { id } = req.params;

            await Card.destroy({
                where: {
                    // Ecriture raccourci en JS. Il va créé une propriété avec comme clé le nom de la variable et comme valeur, la valeur de la variable.
                    id
                }
            })

            res.json("Card deleted");
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    getCard: async (req, res) => {
        try {
            const { id } = req.params;

            const card = await Card.findByPk(id, {
                include: "tags"
            });

            res.json(card);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    getCards: async (req, res) => {
        try {
            const cards = await Card.findAll({
                include: "tags",
                order: [
                    ['position', 'ASC']
                ]
            });

            res.json(cards);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    modifyCard: async (req, res) => {
        try {
            const { id } = req.params;

            const updatedCard = await Card.update({
                ...req.body
            }, {
                where: {
                    id
                },
                // Cette option sécifie à Sequelize qu'on veut recevoir les nouvelles valeurs de la carte updatée.
                returning: true
            });

            res.json(updatedCard);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    removeTagToCard: async (req, res) => {
        try {
            const { card_id, tag_id } = req.params;

            const card = await Card.findByPk(card_id);
            await card.removeTag(tag_id);

            res.json("Tag removed");
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
}

module.exports = controller;