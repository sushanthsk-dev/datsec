const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const rateLmit = require('express-rate-limit');
const xss = require('xss-clean');
const compression = require('compression');
const AppError = require('./utils/AppError');
const blogsRoutes = require('./routers/blogsRoutes');
const userRoutes = require('./routers/userRoutes');
const responseRoutes = require('./routers/responseRoutes');
const viewRoutes = require('./routers/viewRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self' 'unsafe-inline'",
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js',
          'https://www.gstatic.com',
          'https://cdnjs.cloudflare.com',
        ],
        connectSrc: ["'self'", `ws://localhost:*`, `ws://127.0.0.1:*`],
        styleSrc: [
          "'self'",
          'fonts.googleapis.com',
          'cdnjs.cloudflare.com',
          "'unsafe-inline'",
        ],
        fontSrc: ["'self'", 'fonts.gstatic.com', 'cdnjs.cloudflare.com'],
        imgSrc: [
          "'self'",
          'https://maps.gstatic.com',
          'https://maps.googleapis.com',
          'data:',
          'https://another-domain.com',
        ],
        frameSrc: ["'self'", 'https://www.google.com'],
      },
    },
  })
);

const limiter = rateLmit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many request from  this IP,please try again',
});

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data Sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data Sanitization against cross site scripting
app.use(xss());

app.use(
  hpp({
    whitelist: ['title'],
  })
);

app.use(compression());

app.use('/api/v1/blogs', blogsRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/response', responseRoutes);
app.use('/', viewRoutes);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
