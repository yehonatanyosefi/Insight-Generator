/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
// import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import {
  getActivityLogs,
  getBoardData,
  getUserName,
} from "./services/mondayService";
import "monday-ui-react-core/tokens";
import { postData, postPrompt } from "./services/openaiService";
import RootWrapper from "./components/RootWrapper";
import BoardLoaderPlaceholder from "./components/BoardLoaderPlaceholder";
const monday = mondaySdk();

function App() {
  const [boardId, setBoardId] = useState<null | number>(null);
  const [userName, setUserName] = useState<null | string>(null);
  const [boardData, setBoardData] = useState<any>(null);
  const [conversationType, setConversationType] = useState<string>("board");

  useEffect(() => {
    _getUserName(monday);
  }, []);

  const _getUserName = async (monday: any) => {
    const userName = await getUserName(monday);

    setUserName(userName);
  };

  // useEffect(() => {
  //   boardData && onPostBoardData(boardData, boardId!)
  // }, [boardData, boardId])

  useEffect(() => {

    if(!boardId) return
    if (conversationType === "activity") onPostActivity();
    else if (conversationType === "board" && !boardData) onPostBoardData();
  }, [conversationType, boardId]);

  useEffect(() => {
    monday.listen("context", async (res: any) => {
      console.log("file: App.tsx:36 -> monday.listen -> res:", res);

      try {
        setBoardId(res.data.boardId);
      } catch (err) {
        console.log("file: App.tsx:15 -> monday.listen -> err:", err);
      }
    });
  }, []);

  const onPostBoardData = async (): Promise<void> => {
    const boardData = await getBoardData(boardId!, monday);
    console.log("file: App.tsx:59 -> onPostBoardData -> boardData:", boardData)
    await postData(boardData, boardId, conversationType);
    setBoardData(boardData)
  };

  const onPostActivity = async () => {
    const activityLogsData = await getActivityLogs(boardId, monday);
    await postData(activityLogsData, boardId, conversationType);
  };

  const onChat = async (
    searchText: string,
    chatHistory: ChatHistory[]
  ): Promise<string> => {
    console.log("file: App.tsx:73 -> App -> searchText:", searchText)
    const answer = await postPrompt(
      searchText,
      boardId,
      chatHistory,
      conversationType
    );
    return answer;
  };

  const onChooseOption = async (
    type: string,
    setSearchText: React.SetStateAction<any>,
    setChatHistory: React.SetStateAction<any>
  ) => {
    setSearchText("");
    setChatHistory([]);
    setConversationType(type);
  };

  if (!boardData || !userName) return <BoardLoaderPlaceholder />;
  return (
    <main>
      {/* <Button onClick={() => onGenerateInsights(boardData)}>Generate</Button>
        {insights && <pre>{JSON.stringify(insights, null, 2)}</pre>} */}
      <RootWrapper
        onChat={onChat}
        onChooseOption={onChooseOption}
        userName={userName}
        conversationType={conversationType}
      />
    </main>
  );
}

export default App;
