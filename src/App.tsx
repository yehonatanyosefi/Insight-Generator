import { useEffect, useState } from "react";
// import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { getBoardData } from "./services/mondayService";
import Button from 'monday-ui-react-core/dist/Button'
import { getInsightsData } from "./services/openaiService";
const monday = mondaySdk();

function App() {
  const [boardId, setBoardId] = useState<null | number>(null);
  const [boardData, setBoardData] = useState(null);

  const [insights, setInsights] = useState(null)

  useEffect(() => {
    if (boardId) _getBoardData(boardId, monday);
  }, [boardId]);

  const _getBoardData = async (boardId: number, monday: any) => {
    const data = await getBoardData(boardId, monday);

    setBoardData(data);
  };

  useEffect(() => {
    monday.listen("context", async (res: any) => {
      try {
        console.log("res", res);

        setBoardId(res.data.boardId);
      } catch (err) {
        console.log("file: App.tsx:15 -> monday.listen -> err:", err);
      }
    });
  }, []);

  const onGenerateInsights = async(boardData: any) => {
    const insights = await getInsightsData(boardData)

    setInsights(insights)
  }

  if (!boardData) return <>Loading</>;
  return (
    <main>
        <Button onClick={() => onGenerateInsights(boardData)}>Generate</Button>
        {insights && <pre>{JSON.stringify(insights, null, 2)}</pre>}
    </main>
  );
}

export default App;
