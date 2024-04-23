import {defineStore} from "pinia"

export const useContentStore = defineStore('content', {
    state: (): any => ({
        itemsCount: 20,
        currentPage: 1,
        thumbId: 0,
    }),
    actions: {
        setItemsCount(value: number) {
            this.itemsCount = value
        },
        setCurrentThumb(value: number) {
            this.thumbId = value
        }
    }
})
