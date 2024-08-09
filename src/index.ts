import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        // Initialize Prisma Client with Accelerate
        const prisma = new PrismaClient().$extends(withAccelerate());

        try {
            // Create a log entry in the database
            const response = await prisma.logs.create({
                data: {
                    level: 'info',
                    message: 'abcd',
                    meta: {
                        headers: JSON.stringify(request.headers),
                    }
                }
            });

            console.log(JSON.stringify(response));
            return new Response(`Request method: ${request.method}!`);
        } catch (error) {
            console.error('Error creating log:', error);
            return new Response('An error occurred', { status: 500 });
        } finally {
            // Close the Prisma Client connection
            await prisma.$disconnect();
        }
    },
}
