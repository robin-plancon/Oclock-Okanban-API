const { List } = require('./models');

const run = async () => {
    try {
        const lists = await List.findAll({
            include: [{
                association: 'cards',
                include: [{
                    association: 'tags'
                }]
            }]
        });

        // Le JSON.stringigy permet de transformer un objet en une chaine de caractère au format JSON. J'ai rajouté deux options (null, 2) pour que l'affichage soit plus propre et pas sur une seule ligne.
        console.log(JSON.stringify(lists, null, 2));
    } catch (error) {
        console.log(error)
    }
};

run();