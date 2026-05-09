export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-8 opacity-80">
        <img 
          src="/logo.svg" 
          alt="Hakkenbroek Housing Company" 
          width="120"
          height="66"
        />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-brass rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-brass rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-brass rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
      <p className="font-body text-xs uppercase tracking-[0.25em] text-warm-gray">
        Loading properties...
      </p>
    </div>
  );
}
