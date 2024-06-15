import { supabaseClient } from "./params.js";
  
const SenderType = {
    HUMAN: 'human',
    ASSISTANT: 'assistant'
  };


// sort messages by created at
// only return the message content
async function getChatHistory(chatId) {
    const { data: chatHistoryResponse, error: chatHistoryError } = await supabaseClient
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at")

    if (chatHistoryError) {
        throw chatHistoryError;
    }

    console.log("Chat history:", chatHistoryResponse);
    return chatHistoryResponse;    
}

async function createMessage(chat, content, sender) {
    const { data: messageResponse, error: messageError } = await supabaseClient
    .from("messages")
    .insert([
      {
        content: content,
        sender: sender,
        chat_id: chat.chat_id,
        user_id: chat.user_id,
      },
    ])
    .select();

  if (messageError) {
    throw messageError;
  }

  return messageResponse[0];
}

export { SenderType, getChatHistory, createMessage };