import axios from 'axios'
import { Repository } from '../types'

const GITHUB_API_URL = 'https://api.github.com'

export async function fetchTrendingRepos(timeRange: string, language: string, page: number = 1, perPage: number = 15): Promise<Repository[]> {
  const date = new Date()
  let since: string

  switch (timeRange) {
    case 'weekly':
      date.setDate(date.getDate() - 7)
      since = date.toISOString().split('T')[0]
      break
    case 'monthly':
      date.setMonth(date.getMonth() - 1)
      since = date.toISOString().split('T')[0]
      break
    case 'biannual':
      date.setMonth(date.getMonth() - 6)
      since = date.toISOString().split('T')[0]
      break
    case 'yearly':
      date.setFullYear(date.getFullYear() - 1)
      since = date.toISOString().split('T')[0]
      break
    default:
      since = ''
  }

  let query = `stars:>1 created:>${since}`
  if (language !== 'All') {
    query += ` language:${language}`
  }

  const response = await axios.get(`${GITHUB_API_URL}/search/repositories`, {
    params: {
      q: query,
      sort: 'stars',
      order: 'desc',
      per_page: perPage,
      page: page,
    },
  })

  return response.data.items
}