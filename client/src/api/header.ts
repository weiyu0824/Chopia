export const setTokenHeader = (token: string) => {
    return {headers: {"Authorization" : `Bearer ${token}`}}
}