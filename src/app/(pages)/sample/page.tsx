import prisma from '@/lib/prisma'

export default async function Page() {
  const users = await prisma.user.findMany()
  return <div>{JSON.stringify(users)}</div>
}
