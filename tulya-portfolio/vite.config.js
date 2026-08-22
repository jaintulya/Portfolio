import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const LC_QUERY = `
query userData($username: String!) {
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum { difficulty count submissions }
      totalSubmissionNum { difficulty count submissions }
    }
    userCalendar {
      streak
      totalActiveDays
      submissionCalendar
    }
  }
  userContestRanking(username: $username) { rating }
  allQuestionsCount { difficulty count }
}
`

function leetcodeProxy() {
  return {
    name: 'leetcode-proxy',
    configureServer(server) {
      server.middlewares.use('/api/leetcode', async (req, res) => {
        const url = new URL(req.url, 'http://localhost')
        const username = url.searchParams.get('username') || 'o08s0tJtFp'
        res.setHeader('Access-Control-Allow-Origin', '*')
        try {
          const r = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
            body: JSON.stringify({ query: LC_QUERY, variables: { username } }),
          })
          const data = await r.json()
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        } catch {
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'leetcode fetch failed' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), leetcodeProxy()],
})
