const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const hashEmailHMAC = require("./hashEmail");

async function main() {
  const subscriptions = await prisma.subscription.findMany();
  for (const subscription of subscriptions) {
    const emailHash = hashEmailHMAC(subscription.email);
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        emailHash,
      },
    });
  }
}

main();
