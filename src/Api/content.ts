import axios from "@axios"
import {
  categoriesRequestType,
  CategoriesTypes,
  ChannelsTypes,
  GalleriesListRequest,
  galleryRequestType,
  GalleryThumbRequestType,
  MultiTagCount,
  pornstarsRequestType,
  PornstarsTypes,
  simpleRequestType,
  synonymRequest,
  TagRequestType
} from "@/types/content"
import { useDomainStore, useFlagsStore } from "@/stores/headerStores"
import { NumberedBooleanByString } from "@/Api/enums"

const flagStore = useFlagsStore()
const domainStore = useDomainStore()
const getDomainDataFromStore = () => domainStore.getDomainData[0]

export const getRedirects = async (...data: any[]) => {
  const params = {
    pageNum: data[0],
    perPage: data[1]
  }
  return await axios.get(`tubes/${getDomainDataFromStore().id}/redirects`,
    { params }
  ).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const addRedirect = async(params: any) => {
  try {
    const r = await axios.post(`tubes/${getDomainDataFromStore().id}/redirects`, params)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

export const patchRedirect = async(params: any) => {
  try {
    const r = await axios.patch(`tubes/${getDomainDataFromStore().id}/redirects/${params.redirectId}`, params)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

export const deleteRedirect = async(id: number | string) => {
  try {
    const r = await axios.delete(`tubes/${getDomainDataFromStore().id}/redirects/${id}`)
    flagStore.setSnackBarMsg('Redirect was successfully deleted', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

export const getRedirectData = async (id: string | string[]) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/redirects/${id}`)
    .catch(function (error) {
      flagStore.setSnackBarMsg(error.message, 'warning')
    }
  )
}

export const getGalleries = (props: GalleriesListRequest) => {
  const params: galleryRequestType = {
    pageNum: props.page,
    perPage: props.perPage,
    orderBy: props.sort,
  }
  const filter = props.filter

  if (filter && filter.status != null) {
    params.status = filter.status
  }

  if (filter && filter.search) {
    if (/^\d+$/.test(filter.search)) {
      params.id = filter.search
    } else {
      params.title = filter.search
    }
  }

  if (filter.tag) {
    params.tag = filter.tag
  }

  if (filter.pornstar) {
    params.pornstar = filter.pornstar
  }

  if (filter.llamaExist && filter.llamaExist === NumberedBooleanByString.Positive) {
    params.llamaExist = filter.llamaExist as NumberedBooleanByString
  }

  return axios.get(`tubes/${getDomainDataFromStore().id}/galleries`, {
    params
  }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const getGalleryData = async (id: number | string | string[]) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/galleries/${id}`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const updateGalleryData = async (id: number, params: any) => {
  try {
    const r = await axios.patch(`tubes/${getDomainDataFromStore().id}/galleries/${id}`, params)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

// 👉 Fetch all Channels
export const getChannels = async (params: simpleRequestType) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/channels`, {
    params
  }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

// 👉 Fetch all Categories
export const getCategories = async (params: simpleRequestType) => {
  try {
    return await axios.get(`tubes/${getDomainDataFromStore().id}/categories`, {
      params
    })
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    return { data: null }
  }
}

export const getCategoriesBase = async (pageNum: any, perPage: any, query='') => {
  try {
    const params: categoriesRequestType = {
      pageNum: pageNum,
      perPage: perPage,
    }

    if (query.length) {
      params.query = query
    }
    return await axios.get(`tubes/${getDomainDataFromStore().id}/categories/base`, {
      params
    })
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    return { data: null }
  }
}

// 👉 Fetch all Pornstars
export const getPornstars = async (params: simpleRequestType) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/pornstars`, {
    params
  }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const getPornstarsBase = async (pageNum: any, perPage: any, query='') => {
  const params: pornstarsRequestType = {
    pageNum: pageNum,
    perPage: perPage,
  }

  if (query.length) {
    params.query = query
  }

  return await axios.get(`tubes/${getDomainDataFromStore().id}/pornstars/base`, { params }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const getChannelsBase = async (pageNum: any, perPage: any, query='') => {
  const params: pornstarsRequestType = {
    pageNum: pageNum,
    perPage: perPage,
  }

  if (query.length) {
    params.query = query
  }

  return await axios.get(`tubes/${getDomainDataFromStore().id}/channels/base`, { params }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const getPornstarData = async (id: number | string | string[]) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/pornstars/${id}`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const updatePornstarData = async (id: number, params) => {
  try {
    const r = await axios.patch(`tubes/${getDomainDataFromStore().id}/pornstars/${id}`, params as PornstarsTypes)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

export const getCategoryData = async (categoryId: number | string | string[]) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/categories/${categoryId}`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const updateCategoryData = async (categoryId: number, params: CategoriesTypes) => {
  try {
    const r = await axios.patch(`tubes/${getDomainDataFromStore().id}/categories/${categoryId}`, params as CategoriesTypes)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

// /v1/tubes/{tubeId}/channels/{entityId}
export const getChannelData = async (id: number | string | string[]) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/channels/${id}`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const updateChannelData = async (id: number, params) => {
  try {
    const r = await axios.patch(`tubes/${getDomainDataFromStore().id}/channels/${id}`, params as ChannelsTypes)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

// Studios
export const getStudios = async (params: simpleRequestType) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/studios`, {
    params
  }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

// `tubes/${getDomainDataFromStore().id}/studios
export const getStudioData = async (id: number | string | string[]) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/studios/${id}`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const updateStudioData = async (id: number, params) => {
  try {
    const r = await axios.patch(`tubes/${getDomainDataFromStore().id}/studios/${id}`, params as ChannelsTypes)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

// Tags
export const getTags = async (params: simpleRequestType) => {
  const requestObj = {
    pageNum: params.pageNum,
    perPage: params.perPage,
  }

  if (params.query) {
    requestObj.query = params.query
  }

  return await axios.get(`tubes/${getDomainDataFromStore().id}/tags`, {
    params: requestObj
  }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

// Tags Base
export const getTagsBase = async (pageNum = 1, perPage = 50, query = '') => {
  const params: synonymRequest = {
    pageNum: pageNum,
    perPage: perPage,
  }

  if (query.length) {
    params.query = query
  }

  return await axios.get(`tubes/${getDomainDataFromStore().id}/tags/base`, {
    params
  }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

// Tags Base
export const getSynonymBase = async (pageNum = 1, perPage = 50, query = '') => {
  const params: synonymRequest = {
    pageNum: pageNum,
    perPage: perPage,
    withSynonyms: false,
    withCategories: false,
  }

  if (query.length) {
    params.query = query
  }

  return await axios.get(`tubes/${getDomainDataFromStore().id}/tags/base`, {
    params
  }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const countMultiTag = async(tubeId: number, params: MultiTagCount) => {
  try {
    const r = await axios.post(`tubes/${tubeId}/galleries/count`, params as MultiTagCount)
    flagStore.setSnackBarMsg('Sending request', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data?.messages)
    return { data: null }
  }
}

export const addTagApi = async(tubeId: number, params: any) => {
  try {
    const r = await axios.post(`tubes/${tubeId}/tags`, params)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

export const getTagData = async (tagId: number | string | string[]) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/tags/${tagId}`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const updateTagData = async (tagId: number, params: TagRequestType) => {
  // /v1/tubes/{tubeId}/tags/{tagId}
  try {
    const r = await axios.patch(`tubes/${getDomainDataFromStore().id}/tags/${tagId}`, params as TagRequestType)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

export const setGalleryCategoryThumb = async (params: GalleryThumbRequestType) => {
// @Patch(':tubeId/category/gallery/best-thumb')
  const requestObj = {
    thumbs: [
      {
        regionId: 1,
        thumbId: params.thumbId
      }
    ]
  }
  try {
    const r = await axios.patch(`tubes/${getDomainDataFromStore().id}/categories/${params.categoryId}/galleries/${params.galleryId}/thumbs`, requestObj)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response?.data?.messages)
    return { data: null }
  }
}

export const getCategoryThumbById = async(params: GalleryThumbRequestType) => {
  return await axios.get(`tubes/${getDomainDataFromStore().id}/categories/${params.categoryId}/galleries/${params.galleryId}/thumbs`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

const TEMP_NICHE_ID = 1
// Tags
export const getNicheTags = async (pageNum = 1, perPage = 50, query = '') => {
  const params: pornstarsRequestType = {
    pageNum: pageNum,
    perPage: perPage,
  }

  if (query.length) {
    params.query = query
  }

  return await axios.get(`niches/${TEMP_NICHE_ID}/tags`, {
    params
  }).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const getNicheTagData = async (tagId: number | string | string[]) => {
  return await axios.get(`niches/${TEMP_NICHE_ID}/tags/${tagId}`).catch(function (error) {
    flagStore.setSnackBarMsg(error.message, 'warning')
  })
}

export const updateNicheTagData = async (tagId: number, params: TagRequestType) => {
  // /v1/tubes/{tubeId}/tags/{tagId}
  try {
    const r = await axios.patch(`niches/${TEMP_NICHE_ID}/tags/${tagId}`, params as TagRequestType)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}

// /v1/niches/{nicheId}/tags
export const addNicheTag = async (params: any) => {
  try {
    const r = await axios.post(`niches/${TEMP_NICHE_ID}/tags`, params)
    flagStore.setSnackBarMsg('Saved', 'success')
    return r
  } catch (error: any) {
    flagStore.setSnackBarMsg(error.message, 'warning')
    flagStore.setErrorMessages(error.response.data.messages)
    return { data: null }
  }
}
