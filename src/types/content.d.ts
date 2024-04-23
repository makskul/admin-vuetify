import { NumberedBooleanByString } from "@/Api/enums"

export interface CategoryListType {
  id: number,
  feedId: number,
  urlTitle: string,
  title: string,
  total: number,
  totalCommon: number,
  totalSponsor: number
}

export interface PornstarListType {
  feedId: number,
  id: number,
  rating: number,
  thumbUrl: string,
  title: string,
  urlTitle: string,
  total: number,
  totalCommon: number,
  totalSponsor: number
}

export interface StudioListType {
  id: number,
  feedId: number,
  urlTitle: string,
  title: string,
  total: number,
  totalCommon: number,
  totalSponsor: number
}

export interface TagListType {
  id: number,
  title: string,
  urlTitle: string,
  feedId: number,
  rating: number,
  total: number,
  totalCommon: number,
  totalSponsor: number
}

export interface ChannelListType {
  id: number,
  title: string,
  urlTitle: string,
  feedId: number,
  rating: number,
  total: number,
  totalCommon: number,
  totalSponsor: number
}

export interface GalleriesType {
  id: number,
  title: string,
  likes: number,
  dislikes: number,
  views: number,
}

export interface GalleryDescriptionsType {
  title: string | null,
  metaTitle: string | null,
  description: string | null,
  metaDescription: string | null,
  titleH1?: string,
  language?: {id: number, prefix: string},
  languageId?: number
}

export interface GalleryThumbRequestType {
  galleryId: number
  thumbId?: number
  categoryId: number | undefined
  regionId: number
}

export interface PornstarsTypes {
  value: any
  id: number
  tubeId: number
  languageId: number
  urlTitle: string
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  titleH1: string
}

export interface ChannelsTypes {
  value: any
  id: number
  tubeId: number
  languageId: number
  urlTitle: string
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  titleH1: string
}

export interface CategoriesTypes {
  tubeId: number
  languageId: number
  urlTitle: string
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  titleH1: string
}

export interface TagRequestType {
  urlTitle: string,
  category: number,
  descriptions: Array<TagDescriptionType>,
  synonyms: Array
}

export interface simpleRequestType {
  query?: string,
  pageNum: number | string,
  perPage: number | string,
}

export interface galleryRequestType extends simpleRequestType {
  pornstar?: number | string | null
  tag?: number | string | null
  orderBy: string,
  llamaExist?: NumberedBooleanByString | null
  status?: number | string | null
  id?: number | string | null
  title?: string | null
}

export interface tagsRequestType extends simpleRequestType {
  query?: string
}

export interface categoriesRequestType extends simpleRequestType {
  query?: string
}

export interface pornstarsRequestType extends simpleRequestType {
  query?: string
}

export interface synonymRequest extends simpleRequestType {
  query?: string,
  withSynonyms: boolean,
  withCategories: boolean
}

export interface MultiTagCount {
  tags: [],
  categories: [],
  galleryType: string
}

interface Tag {
  id: number,
  feedId: number,
  title: string
  status: string,
  thumbUrl: string,
  total: number,
  urlTitle: string,
}

export interface IdTitle {
  id: number,
  title: string
}

export interface IdType {
  id: number,
  type: string
}

interface GalleriesFilter {
  tag?: string,
  pornstar?: string,
  llamaExist?: NumberedBooleanByString,
  search?: string,
  status?: string | number
}

export interface GalleriesListRequest {
  tubeId: number,
  page: string,
  perPage: number,
  filter: GalleriesFilter,
  sort: string,
}


export interface TagDescriptionType {
  languageId: number,
  title: string,
  description: string,
  metaTitle: string,
  metaDescription: string,
  language?: {id: number, prefix: string}
}

export interface TagsCreatedRequest {
  urlTitle: string,
  aliases?: Array<string>,
  basedOn?: {
    categories?: Array<number>,
    tags?: Array<number>
  },
  related?: Array<number> ,
  descriptions: [
    ...TagDescriptionType
  ]
}

export interface TagCounterRequest {
  tags?: Array<number>,
  categories?: Array<number>
}

export interface RedirectsList {
  redirectId: number,
  tubeId: number,
  fromType: string,
  fromUrlTitle: string,
  toType: string,
  toUrlTitle: string
}
