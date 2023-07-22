const { Tag } = require('../models');

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
			const data = await Tag.create(req.body);
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
		const id = parseInt(req.params.id, 10);
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
		const id = parseInt(req.params.id, 10);
		try {
			const data = await Tag.update(req.body, {
				where: { id },
			});
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
		const id = parseInt(req.params.id, 10);
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
};

module.exports = tagController;
