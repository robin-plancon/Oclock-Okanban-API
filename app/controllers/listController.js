const { List } = require('../models');

const listController = {
	// Méthode pour récupérer toutes les listes
	async getLists(req, res) {
		try {
			const data = await List.findAll({
				include: {
					association: 'cards',
					include: 'tagCards',
				},
				order: [
					['position', 'ASC'],
					['cards', 'position', 'ASC'],
				],
			});
			if (!data) {
				return res.status(404).json({ error: 'No lists found' });
			}
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour créer une liste
	async createList(req, res) {
		const { name, position } = req.body;
		try {
			const data = await List.create({
				name,
				position,
			});
			if (!data) {
				return res.status(400).json({ error: 'List not created' });
			}
			return res.status(201).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour récupérer une liste par son id
	async getList(req, res) {
		const { id } = req.params;
		try {
			const data = await List.findByPk(id, {
				include: {
					association: 'cards',
					include: 'tagCards',
				},
				order: [['cards', 'position', 'ASC']],
			});
			if (!data) {
				return res.status(404).json({ error: 'List not found' });
			}
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour mettre à jour une liste
	async updateList(req, res) {
		const { id } = req.params;
		const { name, position } = req.body;
		try {
			const data = await List.update(
				{
					name,
					position,
				},
				{
					where: { id },
					returning: true,
				}
			);
			if (!data) {
				return res.status(400).json({ error: 'List not updated' });
			}
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour supprimer une liste
	async deleteList(req, res) {
		const { id } = req.params;
		try {
			const data = await List.destroy({
				where: { id },
			});
			if (!data) {
				return res.status(400).json({ error: 'List not deleted' });
			}
			return res.status(204).json({ message: 'List deleted' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};

module.exports = listController;
