import { useEffect } from 'react';
import { useStories } from '../hooks/useStories';
import Navbar from './Navbar';
import StoriesList from './StoriesList';
import SectionTitle from './SectionTitle';

const Bookmarks = () => {
  const {
    stories,
    loading,
    error,
    refreshStories,
    handleToggleBookmark,
    authenticated,
    user,
    logout
  } = useStories();

  // For bookmarks, we can fetch all stories and filter them
  // Or better, if the API supports it, we could have a specific bookmarks endpoint
  // Given the current useStories, we'll fetch them and filter
  useEffect(() => {
    refreshStories();
  }, [refreshStories]);

  const bookmarkedStories = stories.filter(story => 
    user?.bookmarks?.includes(story._id)
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar authenticated={authenticated} user={user} logout={logout} />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-orange-950 mb-2 tracking-tight">My Bookmarks</h1>
          <p className="text-slate-500 font-medium">Your saved stories from Hacker News</p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-100 p-10 rounded-3xl text-center">
            <h3 className="text-xl font-black text-orange-950 mb-2">{error}</h3>
            <button 
              onClick={refreshStories}
              className="mt-4 bg-orange-500 text-white px-8 py-2 rounded-xl font-black"
            >
              Retry
            </button>
          </div>
        ) : loading && bookmarkedStories.length === 0 ? (
          <div className="space-y-6">
            <SectionTitle>Loading your bookmarks...</SectionTitle>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-50 h-32 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : bookmarkedStories.length === 0 ? (
          <div className="bg-orange-50/50 border border-dashed border-orange-200 p-20 rounded-3xl text-center">
            <div className="w-20 h-20 bg-orange-100 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-orange-950 mb-2">No bookmarks yet</h3>
            <p className="text-slate-600 mb-8 max-w-sm mx-auto">
              You haven't saved any stories yet. Go back to the main feed to find interesting tech news!
            </p>
            <a 
              href="/stories"
              className="inline-block bg-orange-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-orange-600 transition-all shadow-xl shadow-orange-200"
            >
              Browse Stories
            </a>
          </div>
        ) : (
          <>
            <SectionTitle>Saved Stories ({bookmarkedStories.length})</SectionTitle>
            <StoriesList
              stories={bookmarkedStories}
              onToggleBookmark={handleToggleBookmark}
              userBookmarks={user?.bookmarks || []}
              authenticated={authenticated}
              page={1}
              totalPages={1}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Bookmarks;
