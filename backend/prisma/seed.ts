import { PrismaClient, Role, Status } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);
  // Custom user password provided externally (do not reuse Password123!)
  const customPasswordHash = await bcrypt.hash('mateja1324!', 10);

  // Upsert manager
  const manager = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      name: 'Manager One',
      email: 'manager@example.com',
      password: passwordHash,
      role: Role.manager,
      title: 'Engineering Manager',
    },
  });

  // Upsert employee
  const employee = await prisma.user.upsert({
    where: { email: 'employee@example.com' },
    update: {},
    create: {
      name: 'Employee One',
      email: 'employee@example.com',
      password: passwordHash,
      role: Role.employee,
      title: 'Software Engineer',
    },
  });

  // Upsert custom requested user
  const customUser = await prisma.user.upsert({
    where: { email: 'urosrgf@gmail.com' },
    update: {},
    create: {
      name: 'Uros Custom',
      email: 'urosrgf@gmail.com',
      password: customPasswordHash,
      role: Role.employee,
      title: 'Employee',
    },
  });

  // Create sample work statuses (last 5 days)
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    await prisma.workStatus
      .upsert({
        where: {
          userId_date: { userId: employee.id, date: new Date(d.toISOString().split('T')[0]) },
        },
        update: {},
        create: {
          userId: employee.id,
          date: new Date(d.toISOString().split('T')[0]),
          status: i % 2 === 0 ? Status.remote : Status.office,
        },
      })
      .catch(() => {
        /* ignore duplicates */
      });
  }

  console.log('Seed complete:', {
    manager: manager.email,
    employee: employee.email,
    customUser: customUser.email,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
