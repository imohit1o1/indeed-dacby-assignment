const Hero = () => {
  return (
    <div className="bg-orange-50 border-b border-orange-100 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-6">
          Hacker News Scraper
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-orange-950 mb-6 leading-tight">
          Stay updated with the <span className="text-orange-600">Y Combinator News</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          A clean, modern way to browse Hacker News. Scrape the latest top 10 stories, 
          bookmark your favorites, and never miss a tech update.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-orange-800 bg-orange-100/50 px-4 py-2 rounded-lg border border-orange-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live from Hacker News
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
