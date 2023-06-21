import axios from 'axios'

export async function postBoardData(boardData: any, userId: number, boardId: number) {
   console.log("file: openaiService.ts:4 -> getInsightsData -> boardData:", boardData)
   try {

    await axios.post('http://localhost:3030/ai/uploadBoard', {boardData, userId, boardId})
    

   } catch(err) {
    console.log("file: openaiService.ts:7 -> getInsightsData -> err:", err)
    
   }
}


export async function postPrompt(textField: string) {
   try {
      
      const res = await axios.post('http://localhost:3030/ai/prompt', {textField})
      return res.data

   } catch(err) {
   console.log("file: openaiService.ts:21 -> postPrompt -> err:", err)

   }
}