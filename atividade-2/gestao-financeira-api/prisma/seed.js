import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// As 5 categorias fixas (padrão) do sistema.
// isDefault = true impede que sejam excluídas pela API.
const categoriasPadrao = [
  {
    name: 'income',
    displayName: 'Receita',
    icon: 'attach-money',
    background: '#C8E6C9',
    isIncome: true,
    isDefault: true,
  },
  {
    name: 'food',
    displayName: 'Alimentação',
    icon: 'restaurant',
    background: '#FFE0B2',
    isIncome: false,
    isDefault: true,
  },
  {
    name: 'transport',
    displayName: 'Transporte',
    icon: 'directions-car',
    background: '#BBDEFB',
    isIncome: false,
    isDefault: true,
  },
  {
    name: 'leisure',
    displayName: 'Lazer',
    icon: 'sports-esports',
    background: '#E1BEE7',
    isIncome: false,
    isDefault: true,
  },
  {
    name: 'home',
    displayName: 'Moradia',
    icon: 'home',
    background: '#FFCDD2',
    isIncome: false,
    isDefault: true,
  },
];

async function main() {
  console.log('Iniciando seed das categorias padrão...');

  for (const categoria of categoriasPadrao) {
    await prisma.category.upsert({
      where: { name: categoria.name },
      update: {},
      create: categoria,
    });
  }

  console.log('Seed concluído com sucesso.');
}

main()
  .catch((erro) => {
    console.error('Erro ao executar seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });