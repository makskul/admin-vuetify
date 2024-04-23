import { useDateFormat } from "@vueuse/core"

export const statusObj = { Active: 1, Inactive: 0 }

export const secondsToTime = (secondsParam: any) => {
  let totalSeconds = secondsParam
  const hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  let resHours = ''
  let resMinutes = ''
  let resSeconds = ''

  if (hours < 10 && hours != 0) {
    resHours = `0${hours}:`
  }

  resMinutes = minutes < 10 ? `0${minutes}:` : `${minutes}:`
  resSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

  return `${resHours}${resMinutes}${resSeconds}`
}

const prependZero = (value: any) => parseInt(value) < 10 ? `0${value}` : value

export const timestampToDate = (timestamp: number) => {
  const dateFormat = new Date(timestamp)

  return `${dateFormat.getFullYear()}-${prependZero((dateFormat.getMonth() + 1))}-${prependZero(dateFormat.getDate())} ${prependZero(dateFormat.getHours())}:${prependZero(dateFormat.getMinutes())}`
}

export const statusConvert = (value: number | string) => {
  return value === 1 || value === '1' ? 'Active' : 'Inactive'
}

export const setCurrentDate = () => {
  return timestampToDate(new Date().getTime())
}

export const getIdTitleFromArrayOfObj = (array: Array<any>) => {
  if(array.length)
  return array.map((el: any) => {
    return { id: el.id, title: el.title }
  })
}

export const getIdFromArrayOfObj = (array: Array<any>) => {
  if(array && array.length)
  return array.map((el: any) => {
    return el.id
  })
}

export const tableDate = (date: string) => {
  const formater = useDateFormat(new Date(date), 'MMM DD')
  return formater.value.replace('"', '')
}

export const getChangedDescriptionsObj = ( descriptionsArray: Array<any> ) => {
  descriptionsArray.map(el => {
    el.languageId = el.language?.id
  })

  descriptionsArray.map(el => {
    delete el['titleH1']
    delete el['language']
  })

  return descriptionsArray
}
