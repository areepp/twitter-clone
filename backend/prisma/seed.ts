import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 20; i++) {
    await prisma.tweet.create({
      data: {
        text: 'tweet created by seed b',
        author: {
          connect: {
            id: '117021340127220940452',
          },
        },
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
