import axios from "axios";

const domain = import.meta.env.MODE === 'production' ? 'https://board-assistant-production.up.railway.app' : 'http://localhost:3030'

export async function postData(
  data: any,
  boardId: number | null,
  conversationType: string
) {
  const namespace = boardId + getSuffix(conversationType)
  try {
    await axios.post(`${domain}/ai/upload/${conversationType}`, {
      data,
      namespace,
    });
  } catch (err) {
    console.log("file: openaiService.ts:7 -> getInsightsData -> err:", err);
  }
}

function getSuffix(conversationType: string) {
  const ACTIVITY_LOG_SUFFIX = "_activity_log";
  const ACTIVITY_UPDATES = "_updates";
  const BOARD_LOG_SUFFIX = "";
  const AGENT_LOG_SUFFIX = "";

  switch (conversationType) {
    case "board":
      return BOARD_LOG_SUFFIX;
    case "activity":
      return ACTIVITY_LOG_SUFFIX;
    case "updates":
      return ACTIVITY_UPDATES;
    case "agent":
      return AGENT_LOG_SUFFIX;
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
  try {
    const sessionData = {
      namespace: boardId + getSuffix(conversationType),
      chatHistory,
    };

    const res = await axios.post(
      `${domain}/ai/prompt/${conversationType}`,
      { prompt: textField, sessionData }
    );
    return res.data;
  } catch (err) {
    console.log("file: openaiService.ts:21 -> postPrompt -> err:", err);
  }
}
