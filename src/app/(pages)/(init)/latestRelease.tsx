import { Card, Carousel } from '@/components/ui/apple-cards-carousel';

export default function LatestRelease() {
  const cards = [
    {
      src: '/images/placeholder.jpg',
      title: 'Latest Feature Release',
      category: "What's New",
      content: (
        <div className="prose dark:prose-invert">
          <p>
            Check out our newest features and improvements in this latest
            release. We've added exciting new capabilities and enhanced
            performance.
          </p>
        </div>
      ),
    },
    {
      src: '/images/placeholder2.jpg',
      title: 'Performance Improvements',
      category: 'Updates',
      content: (
        <div className="prose dark:prose-invert">
          <p>
            Major performance optimizations and bug fixes to provide a smoother
            experience.
          </p>
        </div>
      ),
    },
    {
      src: '/images/placeholder3.jpg',
      title: 'Coming Soon',
      category: 'Preview',
      content: (
        <div className="prose dark:prose-invert">
          <p>
            Get a sneak peek at upcoming features and improvements planned for
            future releases.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <Carousel
        items={cards.map((card, index) => (
          <Card key={card.title} card={card} index={index} layout={true} />
        ))}
      />
    </div>
  );
}
