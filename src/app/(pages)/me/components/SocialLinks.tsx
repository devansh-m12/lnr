import Link from 'next/link';

export default function SocialLinks({ links }: { links: Record<string, string> }) {
  return (
    <div className="flex flex-wrap gap-4">
      {Object.entries(links).map(([platform, url]) => (
        <Link
          key={platform}
          href={url}
          target="_blank"
          className="group relative"
        >
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
          <div className="relative flex items-center space-x-2 rounded-lg bg-black px-4 py-2 text-sm transition-all hover:bg-black/80">
            <span className="capitalize">{platform}</span>
            <div className="h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/40" />
          </div>
        </Link>
      ))}
    </div>
  );
} 