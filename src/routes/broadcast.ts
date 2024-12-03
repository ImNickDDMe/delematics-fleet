import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { GeneralSchema } from '$utils';
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
                'application/json': {
                    schema: GeneralSchema
                }
            }
        },
        400: {
            description: 'Throws an error due to either invalid or insufficient data',
            content: {
                'application/json': {
                    schema: GeneralSchema
                }
            }
        }
    }
});

router.openapi(postRoute, async (c) => {
    const data = c.req.valid('json');

    return c.json({ message: '' }, 201);
    },
    // @ts-ignore 
    (result) => {
        if (!result.success)
            throw new HTTPException(400, { message: 'Insufficient or invalid data' });
    }
);

export default router;