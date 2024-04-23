import axios from "@axios"
import { useDomainStore, useFlagsStore } from "@/stores/headerStores"
const flagStore = useFlagsStore()

const domainStore = useDomainStore()
const getDomainDataFromStore = () => domainStore.getDomainData[0]

export const getDomains = () => {
  try {
    return axios.get('tubes')
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

export const getConfig = (tubeId: number) => {
  try {
    return axios.get('tubes-config/full', { params: { tubeId, tubeUrl: getDomainDataFromStore().url } } )
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

export const setConfig = async (params: any) => {
  try {
    const r = await axios.put(`tubes-config?tubeUrl=${getDomainDataFromStore().url}`, params)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

export const addConfig = async(params: any) => {
  try {
    const r = await axios.post(`tubes-config?tubeUrl=${getDomainDataFromStore().url}`, [params])
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

export const apiReloadCache = async (tube: string) => {
  try {
    const r = await axios.post(`airflow/cache-flush?tubeUrl=${getDomainDataFromStore().url}`, { tube })
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

export const apiGetImportConfig = async() => {
  try {
    return await axios.get(`tubes-config/import-settings?tubeUrl=${getDomainDataFromStore().url}`)
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}
