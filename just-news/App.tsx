
import React, { useState, useCallback } from 'react';
import { Search, ExternalLink, Newspaper, Loader2, BarChart3, Info } from 'lucide-react';
import { fetchNews } from './services/geminiService';
import { Article, NewsResponse } from './types';

const App: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [data, setData] = useState<NewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchNews(keyword);
      setData(result);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch news. Please check your network or try again.");
    } finally {
      setIsLoading(false);
    }
  }, [keyword]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Newspaper size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Just News</h1>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-md w-full relative">
            <div className="relative group">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search headlines (e.g. AI, NASA, Olympics)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            </div>
            <button
              type="submit"
              disabled={isLoading || !keyword.trim()}
              className="absolute right-1 top-1.5 bottom-1.5 px-4 bg-indigo-600 text-white font-medium rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Search"}
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
        {!data && !isLoading && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <Search size={40} />
            </div>
            <h2 className="text-xl font-semibold text-slate-700">Enter a keyword to get started</h2>
            <p className="text-slate-500 mt-2 max-w-sm">
              We'll fetch real-time news articles and analyze how often your keyword appears in headlines.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
            <Info className="flex-shrink-0 mt-0.5" size={18} />
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="space-y-6">
            <div className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-40 bg-slate-200 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {data && (
          <div className="space-y-8">
            {/* Stats & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                <h3 className="text-indigo-900 font-bold flex items-center gap-2 mb-3">
                  <Info size={18} /> AI Insight Summary
                </h3>
                <p className="text-indigo-800 leading-relaxed">
                  {data.summary}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full mb-4">
                  <BarChart3 size={24} />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-1">
                  {data.keywordFrequency}
                </div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                  Occurrences in Headlines
                </p>
                <p className="text-slate-400 text-xs mt-2 italic">
                  Keyword: "{keyword}"
                </p>
              </div>
            </div>

            {/* Articles List */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Latest Articles
                <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {data.articles.length} results
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.articles.map((article, idx) => (
                  <a
                    key={idx}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-slate-200 p-5 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          {article.source}
                        </span>
                        <ExternalLink size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 leading-snug line-clamp-3">
                        {article.title}
                      </h3>
                    </div>
                    <div className="mt-4 text-xs text-slate-400 font-medium">
                      Source: {article.url.split('/')[2]}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            Powered by Gemini 3 & Google Search Grounding. &copy; {new Date().getFullYear()} Just News.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
