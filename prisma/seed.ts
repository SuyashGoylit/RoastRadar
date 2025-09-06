import { PrismaClient } from '../src/generated/prisma';
import coffeeData from './fixtures/coffees.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing coffee data
  console.log('🧹 Clearing existing coffee data...');
  await prisma.coffee.deleteMany({});

  // Seed coffee data
  console.log('☕ Seeding coffee data...');
  
  for (const coffee of coffeeData) {
    await prisma.coffee.create({
      data: {
        name: coffee.name,
        roaster: coffee.roaster,
        type: coffee.type,
        roastLevel: coffee.roastLevel,
        bitterness: coffee.bitterness,
        acidity: coffee.acidity,
        origin: coffee.origin,
        processing: coffee.processing,
        description: coffee.description,
        price: coffee.price,
        url: coffee.url,
      },
    });
    console.log(`✅ Added: ${coffee.name}`);
  }

  console.log(`🎉 Successfully seeded ${coffeeData.length} coffees!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
