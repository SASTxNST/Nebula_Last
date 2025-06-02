"use client";
import React, { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import TopStatsBlock from "@/components/TopLang";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const ContributionGraph = dynamic(() => import("react-github-calendar"), {
  ssr: false,
});

const Profile = ({ repositories }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    githubId: "",
    profilePic: "",
  });
  const [commitDetails, setCommitDetails] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cachedCommits") || "[]")
      : []
  );
  const [mergeDetails, setMergeDetails] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cachedMerges") || "[]")
      : []
  );
  const [repoMeta, setRepoMeta] = useState([]);
  const [lastFetched, setLastFetched] = useState(null);
  const [nextFetchTime, setNextFetchTime] = useState("");
  const [contributorRank, setContributorRank] = useState(null);
  const [topLanguages, setTopLanguages] = useState(["JavaScript", "Python", "HTML/CSS"]);
  const [estimatedTime, setEstimatedTime] = useState("~200h Total");

  const [lineChartType, setLineChartType] = useState("commits");
  const [lineChartData, setLineChartData] = useState({
    commits: [],
    issues: [],
    prs: [],
  });

  useEffect(() => {
    const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;
    if (!email) {
      return;
    }

    fetch("/api/getuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          username: data.username || "",
          githubId: data.githubId || "",
          profilePic: data.githubId
            ? `https://github.com/${data.githubId}.png`
            : "",
        });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        toast.error("Failed to load user data.");
      });
  }, []);

  useEffect(() => {
    if (formData.githubId) {
      setFormData((prev) => ({
        ...prev,
        profilePic: `https://github.com/${formData.githubId}.png`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        profilePic: "",
      }));
    }
  }, [formData.githubId]);

  const handleSave = () => {
    if (!formData.username || !formData.githubId) {
      toast.error("Username and GitHub ID are required.");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("savedProfile", JSON.stringify(formData));
    }
    toast.success("Profile changes saved locally!");
    setUser((prevUser) => ({ ...prevUser, ...formData }));
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
    window.location.href = "/";
  };

  const fetchAll = useCallback(async () => {
    if (!formData.githubId) return;
    const now = Date.now();
    if (lastFetched && now - lastFetched < 5 * 60 * 1000) {
      return;
    }

    try {
      const [eventsRes, repoRes, contributorsRes] = await Promise.allSettled([
        fetch(`https://api.github.com/repos/SASTxNST/Website_SAST/events`),
        fetch("https://api.github.com/repos/SASTxNST/Website_SAST"),
        fetch(
          "https://api.github.com/repos/SASTxNST/Website_SAST/contributors"
        ),
      ]);

      const getJsonIfFulfilled = async (resPromise) => {
        if (resPromise.status === 'fulfilled' && resPromise.value.ok) {
          return await resPromise.value.json();
        }
        console.warn(`Request failed for ${resPromise.reason || 'unknown resource'}`);
        return null;
      };

      const [events, repo, contributors] = await Promise.all([
        getJsonIfFulfilled(eventsRes),
        getJsonIfFulfilled(repoRes),
        getJsonIfFulfilled(contributorsRes),
      ]);

      if (repo) {
        setRepoMeta([repo]);
      } else {
        setRepoMeta([]);
      }

      const commits = [];
      const merges = [];
      const commitMap = {};
      const issueMap = {};
      const prMap = {};

      if (Array.isArray(events)) {
        events.forEach((event) => {
          const dateStr = new Date(event.created_at).toLocaleDateString("en-US");

          if (event.type === "PushEvent" && event.actor.login === formData.githubId) {
            event.payload.commits.forEach((c) => {
              if (c.author.name === formData.username || event.actor.login === formData.githubId) {
                commits.push({
                  repoName: event.repo.name,
                  message: c.message,
                  date: new Date(event.created_at).toLocaleString("en-US"),
                  sha: c.sha,
                  url: `https://github.com/${event.repo.name}/commit/${c.sha}`,
                });
                commitMap[dateStr] = (commitMap[dateStr] || 0) + 1;
              }
            });
          } else if (
            event.type === "PullRequestEvent" &&
            event.payload.pull_request?.merged &&
            event.actor.login === formData.githubId
          ) {
            merges.push({
              repoName: event.repo.name,
              title: event.payload.pull_request.title,
              date: new Date(
                event.payload.pull_request.merged_at
              ).toLocaleString("en-US"),
              url: event.payload.pull_request.html_url,
            });
          }

          if (
            event.type === "IssuesEvent" &&
            event.payload.action === "opened" &&
            event.actor.login === formData.githubId
          ) {
            issueMap[dateStr] = (issueMap[dateStr] || 0) + 1;
          }

          if (
            event.type === "PullRequestEvent" &&
            event.payload.action === "opened" &&
            event.actor.login === formData.githubId
          ) {
            prMap[dateStr] = (prMap[dateStr] || 0) + 1;
          }
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cachedCommits", JSON.stringify(commits));
        localStorage.setItem("cachedMerges", JSON.stringify(merges));
      }
      setCommitDetails(commits);
      setMergeDetails(merges);
      setLastFetched(now);

      const next = new Date(now + 5 * 60 * 1000);
      setNextFetchTime(next.toLocaleTimeString("en-US"));

      if (Array.isArray(contributors)) {
        const rank =
          contributors.findIndex((c) => c.login === formData.githubId) + 1;
        setContributorRank(rank > 0 ? rank : null);
      } else {
        setContributorRank(null);
      }

      const formatMap = (map) =>
        Object.entries(map)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setLineChartData({
        commits: formatMap(commitMap),
        issues: formatMap(issueMap),
        prs: formatMap(prMap),
      });

    } catch (err) {
      console.error("GitHub API fetch error:", err);
      toast.error("GitHub API failed. Check username or try again later.");
    }
  }, [formData.githubId, formData.username, lastFetched]);

  useEffect(() => {
    fetchAll();

    const interval = setInterval(fetchAll, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const stars = repoMeta[0]?.stargazers_count || 0;
  const forks = repoMeta[0]?.forks_count || 0;

  const pieData = [
    { name: "Commits", value: commitDetails.length },
    { name: "PR Merges", value: mergeDetails.length },
  ];
  const pieColors = ["#56d364", "#1f6feb"];

  return (
    <div className="min-h-screen bg-[#0d1117] p-4 sm:p-6 text-[#c9d1d9] font-sans">
      <Toaster 
        toastOptions={{
          style: {
            background: '#161b22',
            color: '#c9d1d9',
            border: '1px solid #30363d'
          }
        }}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8 border-b border-[#30363d] pb-4 sm:pb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#e6edf3]">Welcome, {formData.username || 'Developer'}</h1>
          {nextFetchTime && <p className="text-xs sm:text-sm text-[#7d8590]">Next data refresh: {nextFetchTime}</p>}
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center text-xs sm:text-sm bg-[#161b22] px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border border-[#30363d]">
            <span className="text-[#7d8590] mr-1">⭐</span>
            <span className="font-medium">{stars}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm bg-[#161b22] px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border border-[#30363d]">
            <span className="text-[#7d8590] mr-1">🍴</span>
            <span className="font-medium">{forks}</span>
          </div>
          <button 
            onClick={handleLogout} 
            className="ml-2 text-xs sm:text-sm px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] text-[#f85149] hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      <TopStatsBlock 
        topLanguages={topLanguages} 
        estimatedTime={estimatedTime} 
        contributorRank={contributorRank} 
        nextFetchTime={nextFetchTime} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 sm:mb-8">
        <div className="bg-[#161b22] p-4 sm:p-5 rounded-lg border border-[#30363d]">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#e6edf3] border-b border-[#30363d] pb-2 sm:pb-3">Profile Settings</h2>
          <div className="space-y-3 sm:space-y-4">
            <label className="block">
              <span className="text-xs sm:text-sm text-[#7d8590] block mb-1">Display name</span>
              <input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 rounded bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] text-sm focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] outline-none transition"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-xs sm:text-sm text-[#7d8590] block mb-1">GitHub username</span>
              <input
                value={formData.githubId}
                onChange={(e) => setFormData({ ...formData, githubId: e.target.value })}
                className="w-full px-3 py-2 rounded bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] text-sm focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] outline-none transition"
                placeholder="GitHub username"
              />
            </label>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 sm:px-4 sm:py-2 mt-2 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs sm:text-sm transition-colors"
            >
              Save changes
            </button>
          </div>
        </div>

        <div className="bg-[#161b22] p-4 sm:p-5 rounded-lg border border-[#30363d] flex flex-col">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#e6edf3] border-b border-[#30363d] pb-2 sm:pb-3">Profile Preview</h2>
          <div className="flex flex-col items-center justify-center flex-grow py-4">
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                alt="Profile Preview"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[#30363d] mb-4"
              />
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#0d1117] border-4 border-[#30363d] mb-4 flex items-center justify-center text-[#7d8590] text-sm">
                No Image
              </div>
            )}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-[#7d8590]">GitHub Contributions Rank</p>
              <div className="mt-1 bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 inline-block">
                <span className="font-semibold text-[#e6edf3] text-sm sm:text-base">
                  {contributorRank ? `#${contributorRank}` : 'Not ranked'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
        <div className="bg-[#161b22] p-4 sm:p-5 rounded-lg border border-[#30363d]">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#e6edf3] border-b border-[#30363d] pb-2 sm:pb-3">Contribution Heatmap</h2>
          {formData.githubId ? (
            <div className="p-1 sm:p-2 overflow-x-auto">
              <ContributionGraph 
                username={formData.githubId} 
                colorScheme="dark"
                blockSize={10}
                blockMargin={2}
                fontSize={9}
              />
            </div>
          ) : (
            <div className="text-center py-8 text-[#7d8590] text-sm">
              Enter GitHub username to see contributions
            </div>
          )}
        </div>

        <div className="bg-[#161b22] p-4 sm:p-5 rounded-lg border border-[#30363d]">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[#e6edf3] border-b border-[#30363d] pb-2 sm:pb-3">Contribution Breakdown</h2>
          <div className="h-[180px] sm:h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={60} 
                  innerRadius={30}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: '#161b22',
                    borderColor: '#30363d',
                    borderRadius: '6px',
                    color: '#e6edf3',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#e6edf3' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-[#161b22] p-4 sm:p-5 rounded-lg border border-[#30363d] mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 border-b border-[#30363d] pb-2 sm:pb-3">
          <h2 className="text-base sm:text-lg font-semibold text-[#e6edf3]">Activity Over Time</h2>
          <div className="flex space-x-1 bg-[#0d1117] rounded-md p-1 border border-[#30363d]">
            {["commits", "issues", "prs"].map((type) => (
              <button
                key={type}
                onClick={() => setLineChartType(type)}
                className={`px-2 py-1 rounded-md text-xs sm:text-sm ${
                  lineChartType === type
                    ? "bg-[#1f6feb] text-white"
                    : "text-[#7d8590] hover:bg-[#21262d]"
                } transition-colors`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[200px] sm:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData[lineChartType]}>
              <XAxis 
                dataKey="date" 
                stroke="#7d8590"
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                allowDecimals={false} 
                stroke="#7d8590"
                tick={{ fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{
                  background: '#161b22',
                  borderColor: '#30363d',
                  borderRadius: '6px',
                  color: '#e6edf3',
                  fontSize: '12px'
                }}
                itemStyle={{ color: '#e6edf3' }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#1f6feb" 
                strokeWidth={2} 
                dot={{ fill: '#1f6feb', r: 2 }}
                activeDot={{ fill: '#56d364', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;