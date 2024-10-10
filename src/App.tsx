import React, { useState, useEffect } from 'react'
import { RefreshCw, Github } from 'lucide-react'
import RepoList from './components/RepoList'
import { fetchTrendingRepos } from './api/github'
import { Repository } from './types'
import { Button } from './components/ui/button'
import { ThemeToggle } from './components/ThemeToggle'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Analytics } from "@vercel/analytics/react"

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
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 flex flex-col">
      <div className="max-w-7xl mx-auto flex-grow w-full">
        <header className="flex flex-col space-y-4 mb-6 sm:mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Trending GitHub Repositories</h1>
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/dazeb/github-trending"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub repository</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">Keep up to date with the latest and greatest GitHub projects</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Select value={timeRange} onValueChange={(value) => { setTimeRange(value); setPage(1); }}>
              <SelectTrigger className="w-[130px] sm:w-[180px] text-xs sm:text-sm">
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
              <SelectTrigger className="w-[130px] sm:w-[180px] text-xs sm:text-sm">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {topLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => loadRepos(true)} disabled={loading} size="sm" className="text-xs sm:text-sm">
              <RefreshCw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Refresh
            </Button>
          </div>
        </header>
        {loading && repos.length === 0 ? (
          <div className="text-center">
            <p className="text-lg sm:text-xl text-muted-foreground">Loading trending repositories...</p>
          </div>
        ) : (
          <>
            <RepoList repos={repos} />
            <div className="mt-6 sm:mt-8 text-center">
              <Button onClick={handleLoadMore} disabled={loading} size="sm" className="text-xs sm:text-sm">
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          </>
        )}
      </div>
      <footer className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-muted-foreground">
        <p>This extension is not affiliated with, sponsored by, or endorsed by GitHub Inc.</p>
      </footer>
    </div>
  )
}

export default App