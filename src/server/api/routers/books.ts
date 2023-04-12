import { TRPCError } from "@trpc/server";
// import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
// import { Redis } from "@upstash/redis";

import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";    
// import { filterUserForClient } from "~/server/helpers/filterUserForClient";

// const addUserDataToPosts = async (posts: Post[]) => {
//     const users = (await clerkClient.users.getUserList({
//         userId: posts.map((post) => post.authorId),
//         limit: 100,
//     })).map(filterUserForClient);

//     console.log(users);

//     return posts.map((post) => ({
//             post,
//             author: users.find((user) => user.id === post.authorId)!,
//         }));
// };

// Create a new ratelimiter, that allows 3 requests per 1 minute
// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(3, "1 m"),
//   analytics: true,
//   /**
//    * Optional prefix for the keys used in redis. This is useful if you want to share a redis
//    * instance with other applications and want to avoid key collisions. The default prefix is
//    * "@upstash/ratelimit"
//    */ 
//   prefix: "@upstash/ratelimit",
// });

export const booksRouter = createTRPCRouter({
//   addBook: privateProcedure.query( async ({ ctx }) => {
//     const posts = await ctx.prisma.book.findMany({
//         take: 100,
//         orderBy: [{ createdAt: "desc" }],
//     });

//     console.log(posts);
    
//     return addUserDataToPosts(posts);
//     }),
//  getPostByUserId: publicProcedure.input(z.object({
//         userId: z.string().min(1).max(50),
//     })).query(async ({ ctx, input }) => ctx.prisma.post.findMany({
//         where: {
//             authorId: input.userId,
//         },
//         take: 100,
//         orderBy: [{ createdAt: "desc" }],
//     }).then(addUserDataToPosts)
//     ),
    add: privateProcedure.input(z.object({
        author: z.string().min(1).max(50),
        title: z.string().min(1).max(50),
        town: z.string().min(1).max(50),    
        address: z.string().min(1).max(50),
    })).mutation(async ({ ctx, input }) => {
        const clerkId = ctx.userId;
        console.log(clerkId);

        if (!clerkId) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You must be logged in to do that.",
            });
        }

        const booksForUser = await ctx.prisma.book.findMany({
            where: {
                clerkId: clerkId,
                title: input.title,
            },
        });

        if (booksForUser.length > 0) {
            throw new TRPCError({
                code: "PRECONDITION_FAILED",
                message: "You already have a book with that title.",
            });
        }
        const book = await ctx.prisma.book.create({
            data: {
                title: input.title,
                author: input.author,
                town: input.town,
                address: input.address,
                clerkId: clerkId,
            },
        });

        return book;
    }),
    getAll: privateProcedure.query(async ({ ctx }) => {
        return ctx.prisma.book.findMany({
            where: {
                clerkId: ctx.userId || "",
            },
            take: 100,
        });
    }),
    getBookById: publicProcedure.input(z.object({
        id: z.string().nonempty(),
    })).query(async ({ ctx, input }) => {
        return ctx.prisma.book.findUnique({
            where: {
                id: Number(input.id),
            },
        });
    }),
    deleteBookById: privateProcedure.input(z.object({
        id: z.string().nonempty(),
    })).mutation(async ({ ctx, input }) => {
        const book = await ctx.prisma.book.findUnique({
            where: {
                id: Number(input.id),
            },
        });

        if (!book) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Book not found.",
            });
        }

        if (book.clerkId !== ctx.userId) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You can only delete your own books.",
            });
        }

        return ctx.prisma.book.delete({
            where: {
                id: Number(input.id),
            },
        });
    }),
    updateBookById: privateProcedure.input(z.object({
        id: z.string().nonempty(),
        title: z.string().min(1).max(50),
        author: z.string().min(1).max(50),
        town: z.string().min(1).max(50),
        address: z.string().min(1).max(50),
    })).mutation(async ({ ctx, input }) => {
        const book = await ctx.prisma.book.findUnique({
            where: {
                id: Number(input.id),
            },
        });

        if (!book) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Book not found.",
            });
        }

        if (book.clerkId !== ctx.userId) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You can only update your own books.",
            });
        }

        return ctx.prisma.book.update({
            where: {
                id: Number(input.id),
            },
            data: {
                title: input.title,
                author: input.author,
                town: input.town,
                address: input.address,
            },
        });
    }),
});
