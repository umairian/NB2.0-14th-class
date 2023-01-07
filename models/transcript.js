module.exports = (sequelize, DataTypes) => {
  const Transcript = sequelize.define("transcripts", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cgpa: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Transcript.associate = (models) => {
    Transcript.belongsTo(models.students, {
      foreignKey: "student_id",
      as: "student",
    });
  };

  return Transcript;
};
