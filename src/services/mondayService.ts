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


export async function getUserName(mondaySdk: any) {
  try {
      const query = `query {

      me {
        name
      }
    }

      `
      const res = await mondaySdk.api(query);
      console.log("file: mondayService.ts:79 -> getUserName -> res:", res)

      return res.data.me.name.split(' ')[0]
  } catch(err) {
    console.log("file: mondayService.ts:75 -> getUserName -> err:", err)
    
  }
}


export async function getActivityLogs(boardId: number | null, mondaySdk: any) {
  try {
    const query = `query {
      boards(ids: ${boardId}) {
        activity_logs(limit: 1000) {
          entity
          user_id
          event
          created_at
        }
      }
    }` 


    const res = await mondaySdk.api(query);

    const mappedActivityLogs = await Promise.all(res.data.boards[0].activity_logs.map(async(activity: any) => {
      const username = await getUserNameById(activity.user_id, mondaySdk)
      const date = convertUnixTimeToDate(activity.created_at)
      console.log('ca',activity.created_at)


      return {
        activity_done_at: date,
        activity_occured_on: activity.entity,
        by_user: username,
        event: activity.event
      }
    }))
    console.log("file: mondayService.ts:120 -> mappedActivityLogs -> mappedActivityLogs:", mappedActivityLogs)
    return mappedActivityLogs
  } catch(err) {
    console.log("file: mondayService.ts:96 -> getActivityLogs -> err:", err)
    
  }
}

function convert17digitUnixToDate(digits: number) {
  const unixTimeSeconds = Math.floor(digits / 1000000000);
  console.log("file: mondayService.ts:129 -> convert17digitUnixToDate -> unixTimeSeconds:", unixTimeSeconds)
  
  // Convert Unix time to a Date object
  const date = new Date(unixTimeSeconds * 1000);
  
  // Format the date as desired
  const formattedDate = date.toISOString(); 
  return formattedDate
}

function convertUnixTimeToDate(unixTime: string) {
  const milliseconds = parseInt(unixTime.substring(0, 13));
  const nanoseconds = parseInt(unixTime.substring(13, 17)) * 1000000;
  const timestamp = new Date(milliseconds + nanoseconds / 1000000);
  return timestamp.toDateString();
}

export async function getUserNameById(userId: number, mondaySdk: any) {
  try {
      const query = `query {
        users(ids: ${userId}) {
          name
        }
    }

      `
      const res = await mondaySdk.api(query);
      console.log("file: mondayService.ts:79 -> getUserName -> res:", res)

      return res.data.users[0]?.name || 'unkown'
  } catch(err) {
    console.log("file: mondayService.ts:75 -> getUserName -> err:", err)
    
  }
}