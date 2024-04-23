import axios from '@axios'
import { useFlagsStore } from "@/stores/headerStores"

const flagsStore = useFlagsStore()

export function getDmcaReports() {
  return axios.get('dmca').catch(function (error) {
    flagsStore.setSnackBarMsg(error.message, 'warning')
  })
}

export function resolveDmcaReports({ galleryLinksToResolve, deleteFiles }: { galleryLinksToResolve: string; deleteFiles: boolean; }) {
  return axios.post('dmca/resolve', {
    galleryLinksToResolve,
    deleteFiles,
  }).catch(function (error) {
    flagsStore.setSnackBarMsg(error.message, 'warning')
  })
}
