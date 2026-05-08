import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storiesService } from '../services/storiesService';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import { formatPostedAt, extractDomain } from '../utils/storyFormatters';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, setUser } = useAuth();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const authenticated = isAuthenticated();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const data = await storiesService.getStoryById(id);
        setStory(data);
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('Failed to load story details');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleToggleBookmark = async () => {
    if (!authenticated) {
      alert('Please login to bookmark stories');
      return;
    }

    if (!story?._id) return;

    try {
      const data = await storiesService.toggleBookmark(story._id);
      setUser({ ...user, bookmarks: data.bookmarks });
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      alert('Failed to toggle bookmark');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 flex justify-center">
          <div className="text-orange-500 font-bold animate-pulse text-xl">Loading story...</div>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-black text-orange-950 mb-4">{error || 'Story not found'}</h2>
          <button 
            onClick={() => navigate('/stories')}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold"
          >
            Back to Stories
          </button>
        </div>
      </div>
    );
  }

  const { date, time } = formatPostedAt(story.postedAt);
  const domain = extractDomain(story.url);
  const isBookmarked = user?.bookmarks?.includes(story._id);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-orange-600 transition-colors mb-8 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>

        <article className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-2xl shadow-orange-100/20">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg">
              {story.points} points
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              {domain}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-orange-950 mb-8 leading-tight">
            {story.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-12 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg shadow-orange-200">
                {story.author[0]?.toUpperCase()}
              </div>
              <div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Posted by</div>
                <div className="text-orange-950 font-black">{story.author}</div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Date</div>
                <div className="text-slate-700 font-bold">{date}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Time</div>
                <div className="text-slate-700 font-bold">{time}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={story.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-orange-500 text-white text-center py-4 rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 active:scale-95"
            >
              Read Full Story
            </a>
            
            <button
              onClick={handleToggleBookmark}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 ${
                isBookmarked
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {isBookmarked ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M6.32 2.577a4.948 4.948 0 00-4.913 4.913v13.01a.75.75 0 001.258.552l6.095-5.333 6.096 5.333a.75.75 0 001.257-.552V7.49a4.948 4.948 0 00-4.913-4.913H6.32z" clipRule="evenodd" />
                  </svg>
                  Bookmarked
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                  Bookmark
                </>
              )}
            </button>
          </div>
          
          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="text-orange-950 font-black mb-2">Hacker News ID: {story.hnId}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              This story was scraped from Hacker News. You can view the original discussion by visiting Hacker News and searching for this ID.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default StoryDetail;
