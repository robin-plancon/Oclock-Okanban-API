Pour se connecter à notre BDD PostgreSQL, on doit d'abord se connecter avec le compte admin par défaut créé par Postgres:
sudo -u postgres psql
> Il nous demandera un mot de passe qui sera postgres

Une fois connecté en tant que postgres (super admin), on va pouvoir créer notre nouveau user:
CREATE USER okanban WITH PASSWORD okanban;
> On oublie pas le ; à la fin de chaque requête SQL.

On va maintenant créer notre BDD:
CREATE DATABASE okanban OWNER okanban;
> On définissant okanban comme propriétaire, on lui donne toutes les autorisations sur cette BDD.

Rappel de commande pour le terminal de Postgres:
\l => Pour voir la liste des BDD.
\du => Pour voir la liste des users.
\dt => Pour voir les tables de notre BDD.
\d [nom_d_une_table] => Pour voir le détails d'une table.