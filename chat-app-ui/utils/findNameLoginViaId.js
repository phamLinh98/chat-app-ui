export const getNameLoginFromId = async (id) => {
    const getDataFromInfoTable = async () => {
      const data = await fetch("https://venus-backend-one.vercel.app/api/info");
      const response = await data.json();
      return response;
    };
  
    const infoTable = await getDataFromInfoTable();
  
    // Tìm người dùng với namelogin trùng khớp
    const user = infoTable.find((user) => String(user.id) === String(id));
  
    // Nếu tìm thấy, trả về id, ngược lại trả về null
    return user ? user.namelogin : null;
  };
  