const { PrismaClient } = require('@prisma/client')

/** @type PrismaClient */
let prisma

// See app/db.server.ts
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient()
  }
  prisma = global.__db__
  prisma.$connect()
}



module.exports = { purgeExpiredSessions }
