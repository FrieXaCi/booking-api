import express from 'express';
import userRouter from './routes/users.js';
import amenityRouter from './routes/amenities.js';
import bookingRouter from './routes/bookings.js';
import hostRouter from './routes/hosts.js';
import propertyRouter from './routes/properties.js';
import reviewRouter from './routes/reviews.js';
import loginRouter from './routes/login.js';
import log from './middleware/logMiddleware.js';
import 'dotenv/config.js';

import errorHandler from './middleware/errorHandler.js';
import * as Sentry from '@sentry/node';

const app = express();

const sentryDsn = process.env.SENTRY_DSN;
Sentry.init({
	dsn: sentryDsn,
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({ tracing: true }),
		// enable Express.js middleware tracing
		new Sentry.Integrations.Express({ app }),
		// Automatically instrument Node.js libraries and frameworks
		...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
	],

	tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(log);

app.use('/users', userRouter);
app.use('/amenities', amenityRouter);
app.use('/bookings', bookingRouter);
app.use('/hosts', hostRouter);
app.use('/properties', propertyRouter);
app.use('/reviews', reviewRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
