import { useEffect } from 'react';
import { useStories } from '../hooks/useStories';
import Navbar from './Navbar';
import Hero from './Hero';
import StoriesList from './StoriesList';
import SectionTitle from './SectionTitle';

const Stories = () => {
  const {
    stories,
    loading,
    error,
    page,
    totalPages,
    handlePreviousPage,
    handleNextPage,
    refreshStories,
    handleToggleBookmark,
    handleScrape,
    scraping,
    authenticated,
    user
  } = useStories();

  // Initial fetch and fetch on page change
  useEffect(() => {
    refreshStories();
  }, [refreshStories, page]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black text-orange-950 mb-2">Latest Stories</h2>
            <p className="text-slate-500 font-medium text-sm italic">
              Sorted by highest points first
            </p>
          </div>

          <button
            onClick={handleScrape}
            disabled={scraping}
            className="flex items-center gap-3 bg-orange-100 text-orange-800 px-6 py-3 rounded-2xl font-black text-sm hover:bg-orange-200 transition-all active:scale-95 disabled:opacity-50 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className={`w-4 h-4 ${scraping ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            {scraping ? 'Scraping...' : 'Sync with Hacker News'}
          </button>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-100 p-10 rounded-3xl text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">!</div>
            <h3 className="text-xl font-black text-orange-950 mb-2">{error}</h3>
            <p className="text-slate-600 mb-8">Something went wrong while fetching the stories.</p>
            <button 
              onClick={refreshStories}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-black hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
            >
              Try Again
            </button>
          </div>
        ) : loading && stories.length === 0 ? (
          <div className="space-y-6">
            <SectionTitle>Loading Stories...</SectionTitle>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-slate-50 h-32 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : stories.length === 0 ? (
          <div className="bg-orange-50/50 border border-dashed border-orange-200 p-20 rounded-3xl text-center">
            <h3 className="text-2xl font-black text-orange-950 mb-4">No stories found</h3>
            <p className="text-slate-600 mb-10">We couldn't find any stories in the database.</p>
            <button 
              onClick={handleScrape}
              className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-orange-600 transition-all shadow-xl shadow-orange-200"
            >
              Start First Scrape
            </button>
          </div>
        ) : (
          <>
            <SectionTitle>Hacker News Top 10</SectionTitle>
            <StoriesList
              stories={stories}
              onToggleBookmark={handleToggleBookmark}
              userBookmarks={user?.bookmarks || []}
              authenticated={authenticated}
              page={page}
              totalPages={totalPages}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          </>
        )}
      </main>

      <footer className="bg-orange-950 text-orange-200/50 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-2">Hacker News Scraper</p>
          <p className="text-xs">Built with MERN Stack & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Stories;
