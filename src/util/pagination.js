export const pageSize = 10
export const displayPageNumbers = 6
export const maxPage = 100

export default function getPageInfo(currentPage, totalNumber) {
    const totalPage = Math.min(Math.ceil(totalNumber/pageSize), maxPage)
    const hasNext = currentPage < totalPage
    const hasPrev = currentPage > 1
    return {totalPage, hasNext, hasPrev}
}