


export const getBoardData = async (boardId: number, mondaySdk: any) => {
  try {
    const query = `query {
            boards(ids: ${boardId}) {
                name
                groups {
                    title
                    items(limit: 20) {
                        name
                        column_values {
                            type
                            text
                        }
                    }
                }
            }
        }`;

    const res = await mondaySdk.api(query);


    const mappedBoardData = res.data.boards.map((board: any) => {
        return {
            ...board,
            groups: board.groups.map((group: any) => {
                return {
                    ...group,
                    items: group.items.map((item: any) => {
                        return {
                            ...item,
                            column_values: item.column_values.filter((colVal: any) => colVal.type === 'status' || colVal.type === 'color')
                        }
                    }) // This closing parenthesis was missing in your original code
                }
            })
        }
    })


    console.log("file: mondayService.ts:11 -> getBoardData -> res:", res);
    return mappedBoardData

  } catch (err) {
    console.log("file: mondayService.ts:5 -> getBoardData -> err:", err);
  }
};
