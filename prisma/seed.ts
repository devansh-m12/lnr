import { PrismaClient, UserRole, ContentType, ContentStatus, ReadingStatus, ReadingDirection } from '@prisma/client'
import { hash } from 'bcryptjs'


import { JWTPayload, SignJWT, importJWK } from 'jose';

export const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || 'secret';

  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(jwk);

  return jwt;
};

const prisma: any = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clean existing data
  await prisma.$transaction([
    prisma?.bookmark.deleteMany(),
    prisma.readingProgress.deleteMany(),
    prisma.rating.deleteMany(),
    prisma.userLibrary.deleteMany(),
    prisma?.comment.deleteMany(),
    prisma?.chapterImage.deleteMany(),
    prisma?.chapterContent.deleteMany(),
    prisma?.chapter.deleteMany(),
    prisma?.contentTag.deleteMany(),
    prisma?.contentGenre.deleteMany(),
    prisma?.content.deleteMany(),
    prisma?.tag.deleteMany(),
    prisma?.genre.deleteMany(),
    prisma?.account.deleteMany(),
    prisma?.session.deleteMany(),
    prisma?.user.deleteMany(),
  ])

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      password: await hash('admin123', 12),
      name: 'Admin User',
      role: UserRole.ADMIN,
      token: await generateJWT({
        id: '2',
      }),
      emailVerified: true,
    },
  })

  const authorUser = await prisma.user.create({
    data: {
      email: 'author@example.com',
      username: 'topauthor',
      password: await hash('author123', 12),
      name: 'Famous Author',
      role: UserRole.AUTHOR,
      token: await generateJWT({
        id: '3',
      }),
      emailVerified: true,
    },
  })

  const readerUser = await prisma.user.create({
    data: {
      email: 'reader@example.com',
      username: 'booklover',
      password: await hash('reader123', 12),
      name: 'Avid Reader',
      role: UserRole.READER,
      token: await generateJWT({
        id: '4',
      }),
      emailVerified: true ,
    },
  })

  // Create genres
  const genres = await Promise.all([
    prisma.genre.create({ data: { name: 'Fantasy', description: 'Magic, mythical creatures, and epic adventures' } }),
    prisma.genre.create({ data: { name: 'Action', description: 'Fast-paced and exciting content' } }),
    prisma.genre.create({ data: { name: 'Romance', description: 'Love stories and relationships' } }),
    prisma.genre.create({ data: { name: 'Sci-Fi', description: 'Science fiction and futuristic stories' } }),
  ])

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'Magic System', description: 'Features unique magic systems' } }),
    prisma.tag.create({ data: { name: 'Strong Lead', description: 'Powerful main character' } }),
    prisma.tag.create({ data: { name: 'Plot Twist', description: 'Unexpected story developments' } }),
    prisma.tag.create({ data: { name: 'School Life', description: 'Set in educational settings' } }),
  ])

  // Create sample novel
  const novel = await prisma.content.create({
    data: {
      title: 'The Crystal Mage Chronicles',
      description: 'An epic fantasy novel about a young mage discovering their powers.',
      type: ContentType.NOVEL,
      status: ContentStatus.ONGOING,
      author_id: authorUser.id,
      cover_image_url: 'https://example.com/covers/crystal-mage.jpg',
      genres: {
        create: [
          { genre_id: genres[0].id }, // Fantasy
          { genre_id: genres[1].id }, // Action
        ],
      },
      tags: {
        create: [
          { tag_id: tags[0].id }, // Magic System
          { tag_id: tags[2].id }, // Plot Twist
        ],
      },
    },
  })

  // Create sample manga
  const manga = await prisma.content.create({
    data: {
      title: 'Sword of Destiny',
      description: 'A thrilling manga about a legendary sword and its wielder.',
      type: ContentType.MANGA,
      status: ContentStatus.ONGOING,
      author_id: authorUser.id,
      cover_image_url: 'https://example.com/covers/sword-destiny.jpg',
      genres: {
        create: [
          { genre_id: genres[1].id }, // Action
          { genre_id: genres[0].id }, // Fantasy
        ],
      },
      tags: {
        create: [
          { tag_id: tags[1].id }, // Strong Lead
          { tag_id: tags[2].id }, // Plot Twist
        ],
      },
    },
  })

  // Create chapters for novel
  const novelChapters = await Promise.all([
    prisma.chapter.create({
      data: {
        title: 'The Awakening',
        chapter_number: 1,
        content_id: novel.id,
        chapter_content: {
          create: {
            content_type: ContentType.NOVEL,
            text_content: 'The morning sun cast long shadows across the academy grounds...',
          },
        },
      },
    }),
    prisma.chapter.create({
      data: {
        title: 'First Steps',
        chapter_number: 2,
        content_id: novel.id,
        chapter_content: {
          create: {
            content_type: ContentType.NOVEL,
            text_content: 'Learning to control magic was harder than expected...',
          },
        },
      },
    }),
  ])

  // Create chapters for manga
  const mangaChapters = await Promise.all([
    prisma.chapter.create({
      data: {
        title: 'The Legend Begins',
        chapter_number: 1,
        content_id: manga.id,
        chapter_content: {
          create: {
            content_type: ContentType.MANGA,
            reading_direction: ReadingDirection.RTL,
            images: {
              create: [
                { image_url: 'https://example.com/manga/ch1/page1.jpg', sequence_number: 1 },
                { image_url: 'https://example.com/manga/ch1/page2.jpg', sequence_number: 2 },
              ],
            },
          },
        },
      },
    }),
  ])

  // Create user library entries
  await prisma.userLibrary.create({
    data: {
      user_id: readerUser.id,
      content_id: novel.id,
      reading_status: ReadingStatus.READING,
      last_read_chapter_id: novelChapters[0].id,
    },
  })

  // Create ratings
  await prisma.rating.create({
    data: {
      user_id: readerUser.id,
      content_id: novel.id,
      score: 5,
    },
  })

  // Create reading progress
  await prisma.readingProgress.create({
    data: {
      user_id: readerUser.id,
      chapter_id: novelChapters[0].id,
      progress_percentage: 100,
    },
  })

  // Create comments
  const parentComment = await prisma.comment.create({
    data: {
      content: 'This chapter was amazing!',
      user_id: readerUser.id,
      chapter_id: novelChapters[0].id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Thank you for reading!',
      user_id: authorUser.id,
      chapter_id: novelChapters[0].id,
      parent_id: parentComment.id,
    },
  })

  // Create bookmarks
  await prisma.bookmark.create({
    data: {
      user_id: readerUser.id,
      chapter_id: novelChapters[0].id,
      note: 'Interesting plot point about crystal magic',
    },
  })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })