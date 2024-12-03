import { withSentry } from '@sentry/cloudflare';
import { Hono } from 'hono';

const app = new Hono<{ Bindings: Env }>();

export default withSentry(
	(env) => ({
		dsn: 'https://12ae506ddc136f8344052e4e8696470d@o4507242723082240.ingest.de.sentry.io/4508405183873104',
		tracesSampleRate: 1.0,
	}),
	{
		async fetch(request, env, ctx) {
			return await app.fetch(request, env, ctx);
		},
	} satisfies ExportedHandler<Env>
);
