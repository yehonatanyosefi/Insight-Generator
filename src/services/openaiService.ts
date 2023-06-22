import axios from "axios";

export async function postData(
  data: any,
  boardId: number | null,
  conversationType: string
) {
  try {
    await axios.post(`http://localhost:3030/ai/upload/${conversationType}`, {
      data,
      namespace: boardId + getSuffix(conversationType),
    });
  } catch (err) {
    console.log("file: openaiService.ts:7 -> getInsightsData -> err:", err);
  }
}

function getSuffix(conversationType: string) {
  console.log(
    "file: openaiService.ts:21 -> getSuffix -> conversationType:",
    conversationType
  );
  const ACTIVITY_LOG_SUFFIX = "_activity_log";
  const BOARD_LOG_SUFFIX = "";

  switch (conversationType) {
    case "board":
      return BOARD_LOG_SUFFIX;
    case "activity":
      return ACTIVITY_LOG_SUFFIX;
    default:
      return "";
  }
}

export async function postPrompt(
  textField: string,
  boardId: number | null,
  chatHistory: ChatHistory[],
  conversationType: string
) {
  console.log("file: openaiService.ts:46 -> textField:", textField)
  try {
    const sessionData = {
      namespace: boardId + getSuffix(conversationType),
      chatHistory,
    };
    console.log("file: openaiService.ts:47 -> sessionData:", sessionData);

    const res = await axios.post(
      `http://localhost:3030/ai/prompt/${conversationType}`,
      { prompt: textField, sessionData }
    );
    console.log("file: openaiService.ts:21 -> postPrompt -> res:", res.data);
    return res.data;
  } catch (err) {
    console.log("file: openaiService.ts:21 -> postPrompt -> err:", err);
  }
}
