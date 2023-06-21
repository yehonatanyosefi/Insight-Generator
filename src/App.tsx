import { useEffect, useState } from "react";
// import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { getBoardData } from "./services/mondayService";
import "monday-ui-react-core/tokens";
import Button from 'monday-ui-react-core/dist/Button'
import { postBoardData, postPrompt } from "./services/openaiService";
import RootWrapper from "./components/RootWrapper";
const monday = mondaySdk();

function App() {
  const [boardId, setBoardId] = useState<null | number>(null);
  const [userId, setUserId] = useState<null | number>(null)
  const [boardData, setBoardData] = useState(null);

  const [gptAnswer, setGPTAnswer] = useState(null)

  useEffect(() => {
    if (boardId) _getBoardData(boardId, monday);
  }, [boardId]);

  const _getBoardData = async (boardId: number, monday: any) => {
    const data = await getBoardData(boardId, monday);

    setBoardData(data);
  };

  useEffect(() => {
    boardData && onPostBoardData(boardData, userId!, boardId!)
  }, [boardData])

  useEffect(() => {
    monday.listen("context", async (res: any) => {
      try {
        console.log("res", res);
        setUserId(res.data.userId)
        setBoardId(res.data.boardId);
      } catch (err) {
        console.log("file: App.tsx:15 -> monday.listen -> err:", err);
      }
    });
  }, []);

  const onPostBoardData = async(boardData: any, userId: number, boardId: number) => {
    await postBoardData(boardData, userId, boardId)

    // setInsights(insights)
  }

  const onChat = async(searchText: string) => {
     const answer = await postPrompt(searchText)
     setGPTAnswer(answer)
  }

  if (!boardData) return <>Loading</>;
  return (
    <main>
        {/* <Button onClick={() => onGenerateInsights(boardData)}>Generate</Button>
        {insights && <pre>{JSON.stringify(insights, null, 2)}</pre>} */}
        <RootWrapper onChat={onChat}/>
    </main>
  );
}

export default App;
