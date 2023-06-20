import axios from 'axios'

export async function getInsightsData(boardData: any) {
   try {

    const res = await axios.post('http://localhost:3030/openai', boardData)
    return res.data

   } catch(err) {
    console.log("file: openaiService.ts:7 -> getInsightsData -> err:", err)
    
   }

}