import {
  PrismaClient,
  UserRole,
  ContentType,
  ContentStatus,
  ReadingStatus,
  ReadingDirection,
} from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL,
    },
  },
  log: ['query', 'error', 'warn'],
});

async function main() {
  console.log('Starting seed...');

  try {
    console.log('Cleaning existing data...');
    const cleanupTasks = [
      prisma.blogSEO.deleteMany(),
      prisma.blogLike.deleteMany(),
      prisma.blogComment.deleteMany(),
      prisma.blogPostTag.deleteMany(),
      prisma.blogPostCategory.deleteMany(),
      prisma.blogPost.deleteMany(),
      prisma.blogTag.deleteMany(),
      prisma.blogCategory.deleteMany(),
      prisma.bookmark.deleteMany(),
      prisma.readingProgress.deleteMany(),
      prisma.rating.deleteMany(),
      prisma.userLibrary.deleteMany(),
      prisma.comment.deleteMany(),
      prisma.chapterImage.deleteMany(),
      prisma.chapterContent.deleteMany(),
      prisma.chapter.deleteMany(),
      prisma.contentTag.deleteMany(),
      prisma.contentGenre.deleteMany(),
      prisma.content.deleteMany(),
      prisma.tag.deleteMany(),
      prisma.genre.deleteMany(),
      prisma.account.deleteMany(),
      prisma.session.deleteMany(),
      prisma.user.deleteMany(),
    ];

    for (const task of cleanupTasks) {
      await task;
    }

    console.log('Creating users...');
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        username: 'admin',
        password: await hash('admin123', 12),
        name: 'Admin User',
        role: UserRole.ADMIN,
        emailVerified: true,
      },
    });

    const authorUser = await prisma.user.create({
      data: {
        email: 'author@example.com',
        username: 'topauthor',
        password: await hash('author123', 12),
        name: 'Famous Author',
        role: UserRole.AUTHOR,
        emailVerified: true,
      },
    });

    const readerUser = await prisma.user.create({
      data: {
        email: 'reader@example.com',
        username: 'booklover',
        password: await hash('reader123', 12),
        name: 'Avid Reader',
        role: UserRole.READER,
        emailVerified: true,
      },
    });

    // Novel-related seeding
    console.log('Creating genres...');
    const genresData = [
      {
        name: 'Fantasy',
        description: 'Magic, mythical creatures, and epic adventures',
      },
      { name: 'Action', description: 'Fast-paced and exciting content' },
      { name: 'Romance', description: 'Love stories and relationships' },
      { name: 'Sci-Fi', description: 'Science fiction and futuristic stories' },
    ];

    const genres = [];
    for (const genreData of genresData) {
      const genre = await prisma.genre.create({ data: genreData });
      genres.push(genre);
    }

    console.log('Creating tags...');
    const tagsData = [
      { name: 'Magic System', description: 'Features unique magic systems' },
      { name: 'Strong Lead', description: 'Powerful main character' },
    ];

    const tags = [];
    for (const tagData of tagsData) {
      const tag = await prisma.tag.create({ data: tagData });
      tags.push(tag);
    }

    console.log('Creating content...');
    const novel = await prisma.content.create({
      data: {
        title: 'The Crystal Mage Chronicles',
        description:
          'An epic fantasy novel about a young mage discovering their powers.',
        type: ContentType.NOVEL,
        status: ContentStatus.ONGOING,
        author_id: authorUser.id,
        cover_image_url: 'https://example.com/covers/crystal-mage.jpg',
        genres: {
          create: [{ genre_id: genres[0].id }, { genre_id: genres[1].id }],
        },
        tags: {
          create: [{ tag_id: tags[0].id }],
        },
      },
    });

    console.log('Creating chapters...');
    const chapter = await prisma.chapter.create({
      data: {
        title: 'The Awakening',
        chapter_number: 1,
        content_id: novel.id,
        chapter_content: {
          create: {
            content_type: ContentType.NOVEL,
            text_content:
              'The morning sun cast long shadows across the academy grounds...',
          },
        },
      },
    });

    // Blog-related seeding
    console.log('Creating blog categories...');
    const blogCategories = await prisma.blogCategory.createMany({
      data: [
        {
          name: 'Writing Tips',
          slug: 'writing-tips',
          description: 'Tips and tricks for aspiring writers',
        },
        {
          name: 'Author Updates',
          slug: 'author-updates',
          description: 'Latest news from our authors',
        },
        {
          name: 'Book Reviews',
          slug: 'book-reviews',
          description: 'Reviews of popular novels',
        },
      ],
    });

    console.log('Creating blog tags...');
    const blogTags = await prisma.blogTag.createMany({
      data: [
        { name: 'Writing Advice', slug: 'writing-advice' },
        { name: 'Author Journey', slug: 'author-journey' },
        { name: 'Book Recommendations', slug: 'book-recommendations' },
      ],
    });

    console.log('Creating blog posts...');
    const blogPost = await prisma.blogPost.create({
      data: {
        title: 'How to Create Compelling Characters',
        slug: 'how-to-create-compelling-characters',
        content: 'Creating memorable characters is essential for any story...',
        excerpt: 'Learn the fundamentals of character development',
        published: true,
        featured: true,
        author_id: authorUser.id,
        seo: {
          create: {
            meta_title: 'Character Creation Guide',
            meta_description:
              'Learn how to create compelling characters for your story',
            meta_keywords: 'writing, characters, creative writing',
          },
        },
      },
    });

    // Create user interactions
    console.log('Creating user interactions...');
    await prisma.userLibrary.create({
      data: {
        user_id: readerUser.id,
        content_id: novel.id,
        reading_status: ReadingStatus.READING,
        last_read_chapter_id: chapter.id,
      },
    });

    await prisma.blogComment.create({
      data: {
        content: 'Great article! Very helpful tips.',
        post_id: blogPost.id,
        user_id: readerUser.id,
      },
    });

    await prisma.blogLike.create({
      data: {
        post_id: blogPost.id,
        user_id: readerUser.id,
      },
    });

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Detailed error:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
