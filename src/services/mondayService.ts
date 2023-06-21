const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getBoardData = async (boardId: number, mondaySdk: any) => {
  try {
    const query = `query {

            boards(ids: ${boardId}) {
                name
                id
                items {
                    group {
                        id
                    }
                    name
                    column_values {
                        type
                        text
                    }
                }
                groups {
                    title
                    id
                }
            }
        }`;

    const res = await mondaySdk.api(query);
    console.log("file: mondayService.ts:30 -> getBoardData -> res:", res);

    const mappedBoardData = res.data.boards.map((board: any) => {
      return {
        name: board.name,
        groups: board.groups.map((group: any) => {
          return {
            title: group.title,
            items: board.items
              .filter((item: any) => item.group.id === group.id)
              .map((item: any) => {
                return {
                  name: item.name,
                  column_values: item.column_values.filter(
                    (colVal: any) =>
                      colVal.type === "status" ||
                      colVal.type === "color" ||
                      colVal.type === "timeline" ||
                      colVal.type === "timerange" ||
                      colVal.type === "text" ||
                      colVal.type === 'multiple-person' ||
                      colVal.type === 'person' ||
                      colVal.type === 'date'
                  ),
                };
              }),
          };
        }),
      };
    });
    // const mappedBoardData = res.data.boards.map((board: any) => {
    //     return {
    //         ...board,
    //         groups: board.groups.map((group: any) => {
    //             return {
    //                 ...group,
    //                 items: group.items.map((item: any) => {
    //                     return {
    //                         ...item,
    //                         column_values: item.column_values.filter((colVal: any) => colVal.type === 'status' || colVal.type === 'color' || colVal.type === 'timeline' || colVal.type === 'timerange')
    //                     }
    //                 }) // This closing parenthesis was missing in your original code
    //             }
    //         })
    //     }
    // })

    console.log("file: mondayService.ts:11 -> getBoardData -> res:", res);
    return mappedBoardData;
  } catch (err) {
    console.log("file: mondayService.ts:5 -> getBoardData -> err:", err);
  }
};
