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

    return mappedBoardData[0];
  } catch (err) {
    console.log("file: mondayService.ts:5 -> getBoardData -> err:", err);
  }
};


export async function getUserData(mondaySdk: any) {
  try {
      const query = `query {

      me {
        name
        photo_small

      }
    }

      `
      const res = await mondaySdk.api(query);

      return {userName: res.data.me.name.split(' ')[0], avatar: res.data.me.photo_small}
  } catch(err) {
    console.log("file: mondayService.ts:75 -> getUserName -> err:", err)
    
  }
}


export async function getUpdates(boardId: number | null, mondaySdk: any) {
  try {
    const query = `query {
      boards(ids: ${boardId}) {
        items(limit: 500) {
          id
          name
        }
        updates(limit: 500){
          text_body
          item_id
    
        }
      }
    }`
    const res = await mondaySdk.api(query);

    const updates = res.data.boards[0].updates.map((update: any) => {
      const item = res.data.boards[0].items.find((item: any) => item.id === update.item_id);
      return {
        item_name_of_the_update: item ? item.name : null,
        update_content: update.text_body,
      };
    });
    console.log("file: mondayService.ts:114 -> updates -> updates:", updates)

    const mappedData = {
      board_id: boardId,
      updates
    }

    return mappedData
  } catch(err) {
    console.log("file: mondayService.ts:75 -> getUserName -> err:", err)
  }
}

export async function getActivityLogs(boardId: number | null, mondaySdk: any) {
  try {
    const query = `query {
      boards(ids: ${boardId}) {
        name
        id
        groups {
          title
          id
        }
        activity_logs(limit: 100) {
          entity
          user_id
          event
          created_at
          data
        }
      }
    }` 


    const res = await mondaySdk.api(query);

    const mappedActivityLogs = await Promise.all(res.data.boards[0].activity_logs.map(async(activity: any) => {
      const username = await getUserNameById(activity.user_id, mondaySdk)
      const date = convertUnixTimeToDate(activity.created_at)


      return {
        activity_done_at: date,
        activity_occured_on: activity.entity,
        by_user: username,
        event: activity.event,
        data: activity.data
      }
    }))

    const mappedData = {
      board_name: res.data.boards[0].name,
      board_id:  res.data.boards[0].id,
      board_groups: res.data.boards[0].groups,
      activites: mappedActivityLogs
    }
    return mappedData
  } catch(err) {
    console.log("file: mondayService.ts:96 -> getActivityLogs -> err:", err)
    
  }
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

      return res.data.users[0]?.name || 'unkown'
  } catch(err) {
    console.log("file: mondayService.ts:75 -> getUserName -> err:", err)
    
  }
}