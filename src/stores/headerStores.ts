import { defineStore } from "pinia"

export const useFlagsStore = defineStore('flags', {
  state: (): any => ({
    disableDomainSelector: false,
    snackBarState: {},
    errorMessages: [],
  }),
  actions: {
    setDisableDomainSelector() {
      this.disableDomainSelector = true
    },
    setSnackBarMsg(msg: string, color: string) {
      this.snackBarState = { show: true, msg, color }
    },
    setErrorMessages(msg: string[]) {
      this.errorMessages = msg
    }
  }
})

export const useDomainStore = defineStore('domain', {
  state: (): any => ({
    globalDomain: '',
    globalDomainData: {},
    domains: []
  }),
  getters: {
    getDomain: (state) => state.globalDomain,
    getDomainData: (state) => {
      return state.domains.filter((obj: any) => {
        return obj.url === state.globalDomain
      })
    },
  },
  actions: {
    setDomain(param: string) {
      this.globalDomain = param
    },

    setDomainsObj(param: any) {
      this.domains = param
    }
  },
  share: {
    enable: true,
    initialize: true,
  }
})
