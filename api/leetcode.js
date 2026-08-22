const QUERY = `
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
`;

export default async function handler(req, res) {
  const username = (req.query && req.query.username) || "o08s0tJtFp";
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
  try {
    const r = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch {
    res.status(502).json({ error: "leetcode fetch failed" });
  }
}
