const SectionTitle = ({ children }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-xl font-black text-orange-950 whitespace-nowrap uppercase tracking-widest">
        {children}
      </h2>
      <div className="h-[2px] w-full bg-orange-100 rounded-full" />
    </div>
  );
};

export default SectionTitle;
