import prismadb from '@/lib/prismadb';

export default async function getNotSoldMotoItems() {
  try {
    const motoItem = await prismadb.motoItem.findMany({
      where: {
        sold: false
      },
      include: {
        images: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { motoItem, error: null };
  } catch (error) {
    console.error(error);
    return { motoItem: null, error };
  }
}
	