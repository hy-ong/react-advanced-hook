import { useCallback, useRef, useState } from "react"
import { PaginationHooks, PaginationMeta } from "../../types"

export default function usePagination(): PaginationHooks {
  const [meta, setMeta] = useState<PaginationMeta>()
  const refOnPageChange = useRef<(page: number) => void>()

  const setOnPageChange = useCallback((callback: (page: number) => void) => {
    refOnPageChange.current = callback
  }, [])

  const gotoPage = useCallback(
    (page: number) => {
      if (meta === null || meta === undefined) return
      if (page < 1 || page > meta.totalPages) return
      if (refOnPageChange.current) refOnPageChange.current(page)
    },
    [meta, refOnPageChange]
  )

  const goNextPage = useCallback(() => {
    if (meta === null || meta === undefined) return
    if (meta.nextPage) gotoPage(meta.nextPage)
  }, [meta, gotoPage])

  const goPrevPage = useCallback(() => {
    if (meta === null || meta === undefined) return
    if (meta.prevPage) gotoPage(meta.prevPage)
  }, [meta, gotoPage])

  const goFirstPage = useCallback(() => {
    if (meta === null || meta === undefined) return
    gotoPage(1)
  }, [meta, gotoPage])

  const goLastPage = useCallback(() => {
    if (meta === null || meta === undefined) return
    gotoPage(meta.totalPages)
  }, [meta, gotoPage])

  return {
    meta,
    setMeta,
    gotoPage,
    goNextPage,
    goPrevPage,
    goFirstPage,
    goLastPage,
    setOnPageChange,
  }
}
