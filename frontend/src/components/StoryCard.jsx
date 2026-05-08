import { Link } from 'react-router-dom';
import { formatPostedAt, extractDomain } from '../utils/storyFormatters';

const StoryCard = ({ story, onToggleBookmark, isBookmarked, authenticated }) => {
  const { date, time } = formatPostedAt(story.postedAt);
  const domain = extractDomain(story.url);

  return (
    <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-orange-200 transition-all hover:shadow-xl hover:shadow-orange-100/50">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-orange-100 text-orange-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
              {story.points} points
            </span>
            <a 
              href={story.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 hover:text-orange-500 transition-colors"
            >
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              {domain}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-2.5 h-2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>

          <h3 className="text-xl font-black text-orange-950 mb-4 leading-snug group-hover:text-orange-600 transition-colors">
            <Link to={`/stories/${story._id}`}>
              {story.title}
            </Link>
          </h3>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-50 rounded-full flex items-center justify-center text-[10px] font-bold text-orange-700 border border-orange-100">
                {story.author[0]?.toUpperCase()}
              </div>
              <span className="text-xs font-bold text-slate-700">{story.author}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span>{date}</span>
              <span className="text-slate-300">•</span>
              <span>{time}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onToggleBookmark(story._id)}
          className={`whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 ${
            isBookmarked
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
              : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-100'
          }`}
        >
          {isBookmarked ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M6.32 2.577a4.948 4.948 0 00-4.913 4.913v13.01a.75.75 0 001.258.552l6.095-5.333 6.096 5.333a.75.75 0 001.257-.552V7.49a4.948 4.948 0 00-4.913-4.913H6.32z" clipRule="evenodd" />
              </svg>
              Bookmarked
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
              Bookmark
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
