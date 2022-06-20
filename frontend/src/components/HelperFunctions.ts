export const convertDate = (date: string) => (
  new Date(date).toUTCString()
)

export const waitFor = (isTrue: any): Promise<any> => {
  let timesResolve = 0
  let timesRetry = 0
  const poll = (resolve: any) => {
    let timeout

    if(isTrue) {
      timesResolve++
      resolve()
    }
    else {
      timesRetry++
      timeout = setTimeout(() => poll(resolve), 1000)
      if(timesRetry === 5) {
        clearTimeout(timeout)
      }
    }
    
  }

  return new Promise(poll)
}
