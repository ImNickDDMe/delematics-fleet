import { OpenAPIHono } from '@hono/zod-openapi';
import { withSentry } from '@sentry/cloudflare';
import { swaggerUI } from '@hono/swagger-ui';
import { broadcastRoute } from '$routes';

const app = new OpenAPIHono<{ Bindings: Env }>();

app.get('/', async (c) => {
	return c.json({ message: 'Delematics fleet API' });
});

app.route('/broadcast', broadcastRoute);

app.get('/ui', swaggerUI({ url: '/swagger' }));

app.doc('/swagger', {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Delematics fleet API'
	}
});

export default withSentry(
	(env) => ({
		dsn: env.SENTRY_DSN,
		tracesSampleRate: 1.0,
	}),
	{
		async fetch(request, env, ctx) {
			return await app.fetch(request, env, ctx);
		},
	} satisfies ExportedHandler<Env>
);
