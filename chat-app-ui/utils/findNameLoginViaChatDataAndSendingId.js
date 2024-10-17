export const findUserNameViaChatDataAndSendingId = (chatDataFromTableChat, userId) => {
  if (!Array.isArray(chatDataFromTableChat)) {
    console.error('chatDataFromTableChat is not an array or is undefined:', chatDataFromTableChat);
    return null;
  }

  if (!userId) {
    console.error('userId is not provided or invalid:', userId);
    return null;
  }

  for (const chat of chatDataFromTableChat) {
    if (!chat.contents || !Array.isArray(chat.contents)) {
      console.warn('contents is missing or not an array for chat:', chat);
      continue; // Bỏ qua phần tử này
    }

    for (const message of chat.contents) {
      if (message.userIdSending === userId) {
        return message.name;
      }
    }
  }
  return null;
};
