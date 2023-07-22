const { Card } = require('../models');

const cardController = {
	// Méthode pour récupérer toutes les cartes
	async getCards(req, res) {
		try {
			const data = await Card.findAll();
			if (!data) {
				return res.status(404).json({ error: 'No cards found' });
			}
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour créer une carte
	async createCard(req, res) {
		try {
			const data = await Card.create(req.body);
			if (!data) {
				return res.status(400).json({ error: 'Card not created' });
			}
			return res.status(201).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour récupérer une carte par son id
	async getCard(req, res) {
		const id = parseInt(req.params.id, 10);
		try {
			const data = await Card.findByPk(id);
			if (!data) {
				return res.status(404).json({ error: 'Card not found' });
			}
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour mettre à jour une carte
	async updateCard(req, res) {
		const id = parseInt(req.params.id, 10);
		try {
			const data = await Card.update(req.body, {
				where: { id },
			});
			if (!data) {
				return res.status(400).json({ error: 'Card not updated' });
			}
			return res.status(200).json(data);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	// Méthode pour supprimer une carte
	async deleteCard(req, res) {
		const id = parseInt(req.params.id, 10);
		try {
			const data = await Card.destroy({
				where: { id },
			});
			if (!data) {
				return res.status(400).json({ error: 'Card not deleted' });
			}
			return res.status(200).json({ message: 'Card deleted' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};

module.exports = cardController;
