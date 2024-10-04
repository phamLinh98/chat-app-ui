export const findChatIndex = (chatDataTable, namelogin1, namelogin2) => {
    if (!chatDataTable || !Array.isArray(chatDataTable)) {
      return null;
    }
  
    for (let i = 0; i < chatDataTable.length; i++) {
      const { user } = chatDataTable[i];
  
      // Check if the user array contains both namelogin1 and namelogin2
      if (user.includes(namelogin1) && user.includes(namelogin2)) {
        return i + 1; // Return the index of the matched element
      }
    }
  
    return null; // Return null if no match is found
  };
  