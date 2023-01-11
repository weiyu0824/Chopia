
export const calculateChatRoomId = (uId1: string, uId2: string): string => {
  return (uId1 < uId2) ? `${uId1}${uId2}` : `${uId2}${uId1}`
}
