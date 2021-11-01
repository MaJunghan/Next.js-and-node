module.exports = (sequelize, DataTypes) => {
  const Commentto = sequelize.define(
    "Commentto",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  Commentto.associate = (db) => {};
  return Commentto;
};
