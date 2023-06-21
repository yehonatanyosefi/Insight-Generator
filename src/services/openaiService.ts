import axios from 'axios'

export async function postBoardData(boardData: any, boardId: number) {
   console.log("file: openaiService.ts:4 -> getInsightsData -> boardData:", boardData)
   try {

    await axios.post('http://localhost:3030/ai/uploadBoard', {boardData, boardId})
    

   } catch(err) {
    console.log("file: openaiService.ts:7 -> getInsightsData -> err:", err)
    
   }
}


export async function postPrompt(textField: string, sessionData: {boardId: number | null, chatHistory: ChatHistory[]}) {
   console.log('file: openaiService.ts:18 -> sessionData:', sessionData)
   try {
      
      const res = await axios.post('http://localhost:3030/ai/prompt', {prompt: textField, sessionData})
      console.log("file: openaiService.ts:21 -> postPrompt -> res:", res.data)
      return res.data

   } catch(err) {
   console.log("file: openaiService.ts:21 -> postPrompt -> err:", err)

   }
}