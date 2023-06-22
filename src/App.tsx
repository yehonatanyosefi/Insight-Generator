/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
// import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { getBoardData } from "./services/mondayService";
import "monday-ui-react-core/tokens";
import { postBoardData, postPrompt } from "./services/openaiService";
import RootWrapper from "./components/RootWrapper";
import BoardLoaderPlaceholder from "./components/BoardLoaderPlaceholder";
const monday = mondaySdk();

function App() {
  const [boardId, setBoardId] = useState<null | number>(null);
  // const [userId, setUserId] = useState<null | number>(null)
  const [boardData, setBoardData] = useState(null);


  useEffect(() => {
    if (boardId) _getBoardData(boardId, monday);
  }, [boardId]);

  const _getBoardData = async (boardId: number, monday: any) => {
    const data = await getBoardData(boardId, monday);

    setBoardData(data);
  };

  useEffect(() => {
    boardData && onPostBoardData(boardData, boardId!)
  }, [boardData, boardId])

  useEffect(() => {
    monday.listen("context", async (res: any) => {
      try {
        setBoardId(res.data.boardId);
      } catch (err) {
        console.log("file: App.tsx:15 -> monday.listen -> err:", err);
      }
    });
  }, []);

  const onPostBoardData = async(boardData: any, boardId: number): Promise<void> => {
    await postBoardData(boardData, boardId)
  }

  const onChat = async(searchText: string, chatHistory: ChatHistory[]): Promise<string> => {
  console.log('file: App.tsx:49 -> chatHistory:', chatHistory)

    const sessionData = {boardId, chatHistory}

     const answer = await postPrompt(searchText, sessionData)
     return answer
  }

  if (!boardData) return <BoardLoaderPlaceholder/>;
  return (
    <main>
        {/* <Button onClick={() => onGenerateInsights(boardData)}>Generate</Button>
        {insights && <pre>{JSON.stringify(insights, null, 2)}</pre>} */}
        <RootWrapper onChat={onChat}/>
    </main>
  );
}

export default App;
