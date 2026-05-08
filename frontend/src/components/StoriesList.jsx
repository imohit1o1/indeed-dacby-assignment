import StoryCard from './StoryCard';

const StoriesList = ({ 
  stories, 
  onToggleBookmark, 
  userBookmarks = [], 
  authenticated,
  page,
  totalPages,
  onNextPage,
  onPreviousPage
}) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            onToggleBookmark={onToggleBookmark}
            isBookmarked={userBookmarks.includes(story._id)}
            authenticated={authenticated}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-10 border-t border-orange-100 mt-10">
        <button
          onClick={onPreviousPage}
          disabled={page === 1}
          className="px-6 py-2.5 rounded-xl border border-orange-200 text-orange-700 text-sm font-black hover:bg-orange-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all active:scale-95"
        >
          Previous
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Page</span>
          <span className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center font-black shadow-lg shadow-orange-200">
            {page}
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">of {totalPages}</span>
        </div>

        <button
          onClick={onNextPage}
          disabled={page === totalPages}
          className="px-6 py-2.5 rounded-xl border border-orange-200 text-orange-700 text-sm font-black hover:bg-orange-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all active:scale-95"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StoriesList;
