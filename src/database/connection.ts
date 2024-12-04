import { Sequelize } from 'sequelize'

const sequelizeConnection = new Sequelize('mini_project_db', 'root', '0905093245Asd0', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

export const connectDB = async (): Promise<void> => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default sequelizeConnection;