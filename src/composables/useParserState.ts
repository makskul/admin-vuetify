import { ParserConfig, ParserConfigRequest } from "@/types/parser"

export const useParserState = () => {
   const state = ref<ParserConfig>({
     channelId: 0,
     authType : '',
     authLogin : '',
     authPassword : '',
     authLoginUrl : '',
     authTestPage : '',
     authCheckText : '',
     authXpathLogin : '',
     authXpathPassword : '',
     authXpathSubmit : '',
     listerType : '',
     listerStartPageUrl : '',
     listerItemXpath : '',
     listerNextBtnPath : '',
     listerItemUrlRegex : '',
     listerPopupsXpaths : '',
     listerBasePageUrl : '',
     pageType : '',
     pageTitleXpath : '',
     pageDescriptionXpath : '',
     pageTagsXpath : '',
     pageCategoriesXpath : '',
     pageModelsXpath : '',
     pageStudioXpath : '',
     pageDatePublishXpath : '',
     pageDatePublishRegex : '',
     pageDateFormat : '',
     photoType : '',
     photoXpath : '',
     photoUrlAttr : '',
     videoType : '',
     videoDownloadLinkXpath : '',
     videoUrlAttr : '',
     videoBaseSiteStr : ''
  })

  return { state }
}

export const useCompleteParsingRequest = (state: Ref) => {
  const self = state.value
  const request = ref<ParserConfigRequest>({
    channelId: parseInt(self.channelId),
    authConfig: {
      authType: self.authType,
      login: self.authLogin,
      password: self.authPassword,
      loginUrl: self.authLoginUrl,
      testPage: self.authTestPage,
      checkText: self.authCheckText,
      xpathLogin: self.authXpathLogin,
      xpathPassword: self.authXpathPassword,
      xpathSubmit: self.authXpathSubmit
    },
    listerConfig: {
      listerType: self.listerType,
      startPageUrl: self.listerStartPageUrl,
      itemsXpath: self.listerItemXpath,
      nextButtonXpath: self.listerNextBtnPath,
      itemUrlRegex: self.listerItemUrlRegex,
      basePageUrl: self.listerBasePageUrl,
      popupsXpaths: self.listerPopupsXpaths
    },
    pageConfig: {
      pageParserType: self.pageType,
      titleXpath: self.pageTitleXpath,
      descriptionXpath: self.pageDescriptionXpath,
      tagsXpath: self.pageTagsXpath,
      categoriesXpath: self.pageCategoriesXpath,
      modelsXpath: self.pageModelsXpath,
      studioXpath: self.pageStudioXpath,
      datePublishXpath: self.pageDatePublishXpath,
      datePublishRegex: self.pageDatePublishRegex,
      dateFormat: self.pageDateFormat
    },
    photoConfig: {
      parserType: self.photoType,
      photosXpath: self.photoXpath,
      urlAttribute: self.photoUrlAttr
    },
    videoConfig: {
      parserType: self.videoType,
      downloadLinkXpath: self.videoDownloadLinkXpath,
      urlAttribute: self.videoUrlAttr,
      baseSiteStr: self.videoBaseSiteStr
    }
  })

  return { request }
}

export const useUpdateParserState = (response: ParserConfigRequest) => {
  const state = ref<ParserConfig>({
    channelId: response.channelId,
    channelTitle: response.channelTitle,
    authType : response.authConfig.authType,
    authLogin : response.authConfig.login,
    authPassword : response.authConfig.password,
    authLoginUrl : response.authConfig.loginUrl,
    authTestPage : response.authConfig.testPage,
    authCheckText : response.authConfig.checkText,
    authXpathLogin : response.authConfig.xpathLogin,
    authXpathPassword : response.authConfig.xpathPassword,
    authXpathSubmit : response.authConfig.xpathSubmit,
    listerType : response.listerConfig.listerType,
    listerStartPageUrl : response.listerConfig.startPageUrl,
    listerItemXpath : response.listerConfig.itemsXpath,
    listerNextBtnPath : response.listerConfig.nextButtonXpath,
    listerItemUrlRegex : response.listerConfig.itemUrlRegex,
    listerPopupsXpaths : response.listerConfig.popupsXpaths,
    listerBasePageUrl : response.listerConfig.basePageUrl,
    pageType : response.pageConfig.pageParserType,
    pageTitleXpath : response.pageConfig.titleXpath,
    pageDescriptionXpath : response.pageConfig.descriptionXpath,
    pageTagsXpath : response.pageConfig.tagsXpath,
    pageCategoriesXpath : response.pageConfig.categoriesXpath,
    pageModelsXpath : response.pageConfig.modelsXpath,
    pageStudioXpath : response.pageConfig.studioXpath,
    pageDatePublishXpath : response.pageConfig.datePublishXpath,
    pageDatePublishRegex : response.pageConfig.datePublishRegex,
    pageDateFormat : response.pageConfig.dateFormat,
    photoType : response.photoConfig.parserType,
    photoXpath : response.photoConfig.photosXpath,
    photoUrlAttr : response.photoConfig.urlAttribute,
    videoType : response.videoConfig.parserType,
    videoDownloadLinkXpath : response.videoConfig.downloadLinkXpath,
    videoUrlAttr : response.videoConfig.urlAttribute,
    videoBaseSiteStr : response.videoConfig.baseSiteStr
  })

  return { state }
}
