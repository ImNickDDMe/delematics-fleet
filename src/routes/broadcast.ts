import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import amqp from 'amqplib/callback_api';
import { Vehicle } from '$schemas';

const router = new OpenAPIHono<{ Bindings: Env }>();

const postRoute = createRoute({
    method: 'post',
    path: '/',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: Vehicle
                }
            }
        }
    },
    responses: {
        201: {
            description: 'Successfully shares vehicles\'s location',
            content: {
                'text/plain': {
                    schema: z.string()
                }
            }
        },
        400: {
            description: 'Throws an error due to either invalid or insufficient data',
            content: {
                'text/plain': {
                    schema: z.string()
                }
            }
        },
        500: {
            description: 'Throws an error due to unknown conditions',
            content: {
                'text/plain': {
                    schema: z.string()
                }
            }
        }
    }
});

router.openapi(
    postRoute, 
    async (c) => {
        const data = c.req.valid('json');

        amqp.connect(c.env.RABBITMQ_URL, (conError, connection) => {
            if (conError) throw new HTTPException(500, { message: 'An unknown error occured' });

            connection.createChannel((channelError, channel) => {
                if (channelError) throw new HTTPException(500, { message: 'An unknown error occured' });
            
                channel.assertExchange('bus_lines', 'direct', { durable: false });

                channel.publish('bus_lines', data.routeLine[0], Buffer.from(JSON.stringify(data)));
            });
        });

        return c.text('Broadcast success', 201);
    },
    // @ts-ignore 
    (result) => {
        if (!result.success)
            throw new HTTPException(400, { message: 'Invalid or insufficient data' });
    }
);

export default router;