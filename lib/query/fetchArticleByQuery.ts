import { prisma } from "../prisma"

export const fetchArticleByQuery = async (searchText: string) => {
    return prisma.articles.findMany({
        where: {
            OR: [
                { title: { contains: searchText, mode: 'insensitive' } },
                { category: { contains: searchText, mode: 'insensitive' } }
            ]
        },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    });
}