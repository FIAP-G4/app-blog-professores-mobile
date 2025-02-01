import { useEffect, useState } from 'react'
import { getTags } from '@/app/services/tags/getTags'
import Tag from '@/app/services/tags/ITag'

const useTagsList = (initialPage = 1, tagsPerPage = 6) => {
  const [tags, setTags] = useState<Tag[] | []>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  const handleSearchTags = async () => {
    try {
      setLoading(true)
      const search = searchTerm || ''
      const data = await getTags(currentPage, tagsPerPage, search)

      if (data) {
        setTags(data)
      }
    } catch (error) {
      console.error('Erro ao buscar tags:', error)
      setError('Ocorreu um erro ao carregar os tags.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearchTags()
  }, [searchTerm])

  return {
    tags,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    handleSearchTags,
    isNextDisabled: Math.ceil(tags.length / tagsPerPage) < currentPage,
    isPrevDisabled: currentPage === 1,
  }
}

export default useTagsList
