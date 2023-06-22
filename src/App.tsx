/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
// import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { getActivityLogs, getBoardData, getUserName } from "./services/mondayService";
import "monday-ui-react-core/tokens";
import { postActivityData, postData, postPrompt } from "./services/openaiService";
import RootWrapper from "./components/RootWrapper";
import BoardLoaderPlaceholder from "./components/BoardLoaderPlaceholder";
const monday = mondaySdk();

function App() {
  const [boardId, setBoardId] = useState<null | number>(null);
  const [userName, setUserName] = useState<null | string>(null)
  const [boardData, setBoardData] = useState(null);
  const [conversationType, setConversationType] = useState<string>('board')

  useEffect(() => {
    if (boardId) _getBoardData(boardId, monday);
  }, [boardId]);

  useEffect(() => {
      _getUserName(monday)
  }, [])

  const _getBoardData = async (boardId: number, monday: any) => {
    const data = await getBoardData(boardId, monday);

    setBoardData(data);
  };
  const _getUserName = async (monday: any) => {
    const userName = await getUserName(monday)

    setUserName(userName)
  };

  useEffect(() => {
    boardData && onPostBoardData(boardData, boardId!)
  }, [boardData, boardId])

  useEffect(() => {
    monday.listen("context", async (res: any) => {
      console.log("file: App.tsx:36 -> monday.listen -> res:", res)


      try {
        setBoardId(res.data.boardId);
      } catch (err) {
        console.log("file: App.tsx:15 -> monday.listen -> err:", err);
      }
    });
  }, []);

  const onPostBoardData = async(boardData: any, boardId: number): Promise<void> => {
    await postData(boardData, boardId, conversationType)
  }

  const onChat = async(searchText: string, chatHistory: ChatHistory[]): Promise<string> => {
  console.log('file: App.tsx:49 -> chatHistory:', chatHistory)


     const answer = await postPrompt(searchText, boardId, chatHistory, conversationType)
     return answer
  }


  const onChooseActivityLogs = async(setSearchText: React.SetStateAction<any>, setChatHistory: React.SetStateAction<any>) => {
    setSearchText("");
    setChatHistory([]);
    setConversationType('activity')

    const activityLogsData = await getActivityLogs(boardId, monday) 

    await postData(activityLogsData, boardId, conversationType)
  };

  if (!boardData || !userName) return <BoardLoaderPlaceholder/>;
  return (
    <main>
        {/* <Button onClick={() => onGenerateInsights(boardData)}>Generate</Button>
        {insights && <pre>{JSON.stringify(insights, null, 2)}</pre>} */}
        <RootWrapper onChat={onChat} onChooseActivityLogs={onChooseActivityLogs} userName={userName} conversationType={conversationType}/>
    </main>
  );
}

export default App;
