import React from 'react'
import { Repository } from '../types'
import { Star, GitBranch } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { getLanguageIcon } from '../utils/languageIcons'

interface RepoListProps {
  repos: Repository[]
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <Card key={repo.id} className="flex flex-col h-full">
          <CardHeader className="flex-grow">
            <CardTitle className="text-xl font-semibold text-primary hover:underline line-clamp-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.full_name}
              </a>
            </CardTitle>
            <CardDescription className="mt-2 line-clamp-4">
              {repo.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>{repo.stargazers_count.toLocaleString()}</span>
                {repo.stargazers_count > 1500 && <span className="ml-1" role="img" aria-label="Fire">🔥</span>}
              </div>
              <div className="flex items-center">
                <GitBranch className="h-4 w-4 mr-1" />
                <span>{repo.forks_count.toLocaleString()}</span>
              </div>
              {repo.language && (
                <div className="flex items-center">
                  <i className={`devicon-${getLanguageIcon(repo.language)} colored text-xl mr-1`}></i>
                  <span>{repo.language}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default RepoList