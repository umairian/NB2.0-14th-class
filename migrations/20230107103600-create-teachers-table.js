'use strict';

/** @type {import('sequelize-cli').Migration} */

const table = "teachers";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM("Male", "Female"),
        allowNull: false,
      },
      designation: {
        type: Sequelize.ENUM(
          "Professor",
          "Associate Professor",
          "Assistant Professor"
        ),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(table)
  }
};
