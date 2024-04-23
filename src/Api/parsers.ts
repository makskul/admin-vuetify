import axios from "@axios"
import { ParserConfigRequest } from "@/types/parser"
import { useFlagsStore } from "@/stores/headerStores"
import { simpleRequestType } from "@/types/content"
const flagStore = useFlagsStore()

export const List = (params: simpleRequestType) => {
  return axios.get('parser-config', {
    params: {
      query: params.query,
      pageNum: params.pageNum,
      perPage: params.perPage
    } as simpleRequestType
  }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const Add = async (params: ParserConfigRequest) => {
  try {
    const r = await axios.post('parser-config', params)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

export const GetOne = async (channelId: string)=> {
  return axios.get(`parser-config/${channelId}`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const Update = async (channelId: string | string[], params: ParserConfigRequest) => {
  try {
    const r = await axios.patch(`parser-config`, params)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

export const Delete = async (id: number | string) => {
  try {
    const r = await axios.delete(`parser-config/${id}`)
    flagStore.setSnackBarMsg('Channel was successfully deleted', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}
