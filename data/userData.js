const UserModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "tb_users",
    {
      user_idx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "사용자 IDX",
      },
      user_name: {
        type: DataTypes.STRING,
        comment: "사용자 이름",
      },
      email: {
        type: DataTypes.STRING,
        comment: "사용자 아이디",
      },
      password: {
        type: DataTypes.STRING,
        comment: "사용자 비밀번호",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "가입일자",
      },
      last_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "마지막 로그인 일자",
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "관리자 여부",
      },
      profile_picture: {
        type: DataTypes.STRING,
        defaultValue: "",
        comment: "사용자 이미지",
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "suspended"),
        defaultValue: "active",
        comment: "사용 상태",
      },
    },
    {
      timestamps: false,
    }
  );
};

export default UserModel;
