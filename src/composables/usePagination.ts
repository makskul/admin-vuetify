export const usePagination = () => {
  // pagination
  const currentPage = ref(1)
  const totalPage = ref(0)
  const rowPerPage = ref(20)
  const total = ref(2)
  // end pagination

  const setCurrentPageQuery = (router: any, value: number) => {
    router.push({ name: router.currentRoute.value.name, query: { page: value } })
  }

  const resetPage = (router: any) => {
    router.push({ name: router.currentRoute.value.name, query: { page: 1 } })
  }
  // Computing pagination data
  const paginationData = computed(() => {
    return `Showing ${currentPage.value} to ${totalPage.value} of ${total.value} entries`
  })

  return {
    setCurrentPageQuery,
    resetPage,
    paginationData,
    rowPerPage,
    currentPage,
    totalPage,
    total
  }
}
