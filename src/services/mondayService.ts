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
        board_name: board.name,
        groups: board.groups.map((group: any) => {
          return {
            group_title: group.title,
            items: board.items
              .filter((item: any) => item.group.id === group.id)
              .map((item: any) => {
                return {
                  item_name: item.name,
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
                  ).map((colVal: any) => {
                    return {
                        column_title: colVal.title,
                        column_type: colVal.type,
                        column_value: colVal.text
                    }
                  }),
                };
              }),
          };
        }),
      };
    });

    console.log("file: mondayService.ts:11 -> getBoardData -> res:", res);
    return mappedBoardData[0];
  } catch (err) {
    console.log("file: mondayService.ts:5 -> getBoardData -> err:", err);
  }
};
