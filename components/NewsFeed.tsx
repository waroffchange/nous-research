import type { NewsFinding, DailyFindings } from "@/lib/types"

const SOURCE_COLORS: Record<string, string> = {
  "openai.com": "bg-blue-500/20 text-blue-300",
  "nousresearch.com": "bg-purple-500/20 text-purple-300",
  "anthropic.com": "bg-green-500/20 text-green-300",
}

function sourceLabel(url: string) {
  try {
    const host = new URL(url).hostname.replace("www.", "")
    const base = host.split(".").slice(-2).join(".")
    return { label: base, color: SOURCE_COLORS[base] ?? "bg-white/10 text-gray-400" }
  } catch {
    return { label: url, color: "bg-white/10 text-gray-400" }
  }
}

interface Props {
  findings: NewsFinding[]
  allFindings: DailyFindings[]
}

export default function NewsFeed({ findings, allFindings }: Props) {
  const items = findings.flatMap((f) =>
    f.newItems.map((item) => ({ ...item, url: f.url }))
  )

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-400 mb-3">Latest news</h2>
      {items.length === 0 ? (
        <div className="bg-[#111118] rounded-xl border border-white/10 p-8 text-center text-sm text-gray-600">
          No news items yet
        </div>
      ) : (
        <div className="bg-[#111118] rounded-xl border border-white/10 divide-y divide-white/5">
          {items.slice(0, 10).map((item) => {
            const { label, color } = sourceLabel(item.url)
            return (
              <div key={item.id} className="flex items-start gap-3 p-4">
                <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5 ${color}`}>
                  {label}
                </span>
                <div className="min-w-0">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-200 hover:text-purple-400 transition-colors line-clamp-1"
                  >
                    {item.title}
                  </a>
                  {item.date && (
                    <p className="text-xs text-gray-600 mt-0.5">{item.date.slice(0, 16)}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
