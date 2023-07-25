const { Tag } = require("../services/models");

const controller = {
    createTag: async (req, res) => {
        try {
            const newTag = await Tag.create({
                ...req.body
            });

            res.json(newTag);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    deleteTag: async (req, res) => {
        try {
            const { id } = req.params;

            await Tag.destroy({
                where: {
                    id
                }
            });

            res.send('Tag deleted');
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    getTags: async (req, res) => {
        try {
            const tags = await Tag.findAll();

            res.json(tags);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    },
    modifyTag: async (req, res) => {
        try {
            const { id } = req.params;

            // La méthode update peut modifier plusieurs champs. On précise ceux qu'on veut modifier via la propriété where.
            const updatedTag = await Tag.update({
                ...req.body
            }, {
                where: {
                    id
                },
                returning: true
            });

            res.json(updatedTag);
        } catch (error) {
            res.status(500).json(error.toString());
        }
    }
};

module.exports = controller;