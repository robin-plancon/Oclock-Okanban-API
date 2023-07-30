const { Tag, Card } = require('../models');

const tagController = {
	// Méthode pour récupérer tous les tags
	async getTags(req, res) {
		try {
			const data = await Tag.findAll();
			if (!data) {
				return res.status(404).json({ error: 'No tags found' });
			}
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour créer un tag
	async createTag(req, res) {
		try {
			const data = await Tag.create({ ...req.body });
			if (!data) {
				return res.status(400).json({ error: 'Tag not created' });
			}
			return res.status(201).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour récupérer un tag par son id
	async getTag(req, res) {
		const { id } = req.params;
		try {
			const data = await Tag.findByPk(id);
			if (!data) {
				return res.status(404).json({ error: 'Tag not found' });
			}
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour mettre à jour un tag
	async updateTag(req, res) {
		const { id } = req.params;
		try {
			const data = await Tag.update(
				{
					...req.body,
				},
				{
					where: { id },
					returning: true,
				}
			);
			if (!data) {
				return res.status(400).json({ error: 'Tag not updated' });
			}
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour supprimer un tag
	async deleteTag(req, res) {
		const { id } = req.params;
		try {
			const data = await Tag.destroy({
				where: { id },
			});
			if (!data) {
				return res.status(400).json({ error: 'Tag not deleted' });
			}
			return res.status(200).json({ message: 'Tag deleted' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour ajouter un tag à une carte
	async addTagToCard(req, res) {
		const { id } = req.params;
		const { tagId } = req.body;
		try {
			const card = await Card.findByPk(id);
			if (!card) {
				return res.status(404).json({ error: 'Card not found' });
			}
			const tag = await Tag.findByPk(tagId);
			if (!tag) {
				return res.status(404).json({ error: 'Tag not found' });
			}
			const data = await card.addTagCards(tag);
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour supprimer un tag d'une carte
	async removeTagFromCard(req, res) {
		const { id, tagId } = req.params;
		try {
			const card = await Card.findByPk(id);
			if (!card) {
				return res.status(404).json({ error: 'Card not found' });
			}
			const tag = await Tag.findByPk(tagId);
			if (!tag) {
				return res.status(404).json({ error: 'Tag not found' });
			}
			const data = await card.removeTagCards(tag);
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};

module.exports = tagController;
