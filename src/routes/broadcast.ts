import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
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
            description: 'Successfully shares fleet location',
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
        }
    }
});

router.openapi(postRoute, async (c) => {
    const data = c.req.valid('json');

    return c.text('Broadcast success', 201);
    },
    // @ts-ignore 
    (result) => {
        if (!result.success)
            throw new HTTPException(400, { message: '' });
    }
);

export default router;