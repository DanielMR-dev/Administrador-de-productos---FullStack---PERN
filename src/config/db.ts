import { Sequelize } from "sequelize";

const db = new Sequelize('postgresql://rest_api_node_typescript_dz9f_user:vtYLIZwVJTvlslUhlZp8hpZL0gnD4LwU@dpg-csd9qa3v2p9s7382f4v0-a.oregon-postgres.render.com/rest_api_node_typescript_dz9f?ssl=true');

export default db;