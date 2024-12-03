'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectName: {
        type: Sequelize.STRING
      },
      projectDescription: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      clientCompany: {
        type: Sequelize.INTEGER
      },
      projectLeader: {
        type: Sequelize.INTEGER,
      },
      estimatedBudget: {
        type: Sequelize.INTEGER,
      },
      totalAmountSpent: {
        type: Sequelize.INTEGER,
      },
      estimatedProjectDuration: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};