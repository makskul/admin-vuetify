export interface ParserConfig {
  channelId: number,
  channelTitle?: string,
  authType : string,
  authLogin : string,
  authPassword : string,
  authLoginUrl : string,
  authTestPage : string,
  authCheckText : string,
  authXpathLogin : string,
  authXpathPassword : string,
  authXpathSubmit : string,
  listerType : string,
  listerStartPageUrl : string,
  listerItemXpath : string,
  listerNextBtnPath : string,
  listerItemUrlRegex : string,
  listerPopupsXpaths : string,
  listerBasePageUrl : string,
  pageType : string,
  pageTitleXpath : string,
  pageDescriptionXpath : string,
  pageTagsXpath : string,
  pageCategoriesXpath : string,
  pageModelsXpath : string,
  pageStudioXpath : string,
  pageDatePublishXpath : string,
  pageDatePublishRegex : string,
  pageDateFormat : string,
  photoType : string,
  photoXpath : string,
  photoUrlAttr : string,
  videoType : string,
  videoDownloadLinkXpath : string,
  videoUrlAttr : string,
  videoBaseSiteStr : string
}

export interface ParserConfigRequest {
  channelId: number
  channelTitle?: string
  authConfig: {
    authType: string
    login: string
    password: string
    loginUrl: string
    testPage: string
    checkText: string
    xpathLogin: string
    xpathPassword: string
    xpathSubmit: string
  },
  listerConfig: {
    listerType: string
    startPageUrl: string
    itemsXpath: string
    nextButtonXpath: string
    itemUrlRegex: string
    basePageUrl: string
    popupsXpaths: string
  },
  pageConfig: {
    pageParserType: string,
    titleXpath: string
    descriptionXpath: string
    tagsXpath: string
    categoriesXpath: string
    modelsXpath: string
    studioXpath: string
    datePublishXpath: string
    datePublishRegex: string
    dateFormat: string
  },
  photoConfig: {
    parserType: string
    photosXpath: string
    urlAttribute: string
  },
  videoConfig: {
    parserType: string
    downloadLinkXpath: string
    urlAttribute: string
    baseSiteStr: string
  }
}
