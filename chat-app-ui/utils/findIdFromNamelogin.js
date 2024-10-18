export const getIdFromNameLoginUser = async (namelogin) => {
  const getDataFromInfoTable = async () => {
    const data = await fetch("https://venus-backend-one.vercel.app/api/info");
    const response = await data.json();
    return response;
  };

  const infoTable = await getDataFromInfoTable();

  // Tìm người dùng với namelogin trùng khớp
  const user = infoTable.find((user) => user.namelogin === namelogin);

  // Nếu tìm thấy, trả về id, ngược lại trả về null
  return user ? user.id : null;
};
