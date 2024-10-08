import React, { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import RepoList from './components/RepoList'
import { fetchTrendingRepos } from './api/github'
import { Repository } from './types'
import { Button } from './components/ui/button'
import { ThemeToggle } from './components/ThemeToggle'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'

const topLanguages = [
  'All',
  'JavaScript',
  'Python',
  'Java',
  'TypeScript',
  'C++',
  'C#',
  'PHP',
  'C',
  'Go',
  'Ruby',
  'Swift',
  'Kotlin',
  'Rust',
  'Dart'
]

function App() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('weekly')
  const [language, setLanguage] = useState('All')
  const [page, setPage] = useState(1)

  const loadRepos = async (reset: boolean = false) => {
    setLoading(true)
    try {
      const newRepos = await fetchTrendingRepos(timeRange, language, reset ? 1 : page)
      setRepos(prev => reset ? newRepos : [...prev, ...newRepos])
      setPage(prev => reset ? 2 : prev + 1)
    } catch (error) {
      console.error('Error fetching trending repos:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadRepos(true)
  }, [timeRange, language])

  const handleLoadMore = () => {
    loadRepos()
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col">
      <div className="max-w-7xl mx-auto flex-grow">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Trending GitHub Repositories</h1>
            <p className="text-sm text-muted-foreground mt-1">Keep up to date with the latest and greatest GitHub projects</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={(value) => { setTimeRange(value); setPage(1); }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="biannual">6 Months</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={language} onValueChange={(value) => { setLanguage(value); setPage(1); }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {topLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ThemeToggle />
            <Button onClick={() => loadRepos(true)} disabled={loading}>
              <RefreshCw className="mr-2 h-5 w-5" />
              Refresh
            </Button>
          </div>
        </header>
        {loading && repos.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-muted-foreground">Loading trending repositories...</p>
          </div>
        ) : (
          <>
            <RepoList repos={repos} />
            <div className="mt-8 text-center">
              <Button onClick={handleLoadMore} disabled={loading}>
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          </>
        )}
      </div>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>This extension is not affiliated with, sponsored by, or endorsed by GitHub Inc.</p>
      </footer>
    </div>
  )
}

export default App