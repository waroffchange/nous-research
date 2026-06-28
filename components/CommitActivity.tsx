"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { DailyFindings } from "@/lib/types"

interface Props {
  findings: DailyFindings[]
}

export default function CommitActivity({ findings }: Props) {
  const data = findings.map((f) => ({
    date: f.date.slice(5, 10),
    commits: f.github.reduce((s, g) => s + g.newCommits, 0),
  }))

  return (
    <div className="bg-[#111118] rounded-xl border border-white/10 p-4 h-full">
      <h2 className="text-sm font-medium text-gray-400 mb-4">Commit activity (7d)</h2>
      {data.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-sm text-gray-600">No data yet</div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }} />
            <Bar dataKey="commits" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={i === data.length - 1 ? "#7C3AED" : "#2d2d3d"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
