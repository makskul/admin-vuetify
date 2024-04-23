import axios from '@axios'
import { useFlagsStore } from "@/stores/headerStores"

const flagStore = useFlagsStore()

export const getSpots = async () => {
  return await axios.get('ad-spots').catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}
export const addSpot = async (params: any) => {
  try {
    const r = await axios.post('ad-spots', params)
    flagStore.setSnackBarMsg('Spot Added', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return error.response
  }
}

export const getCampaigns = async () => {
  return await axios.get('ad-campaigns/admin').catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const deleteCampaign = async (id: number) => {
  try {
    const r = await axios.delete(`ad-campaigns/${id}`)
    flagStore.setSnackBarMsg('Campaign Deleted', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

export const addCampaign = async (params: any) => {
  try {
    const r = await axios.post(`ad-campaigns`, params)
    flagStore.setSnackBarMsg('Campaign Added', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

export const getCampaignData = async (id: number | string | string []) => {
  return await axios.get(`ad-campaigns/${id}`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const updateCampaign = async (id: number | string | string [], params: any) => {
  try {
    const r = await axios.patch(`ad-campaigns/${id}`, params)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}
