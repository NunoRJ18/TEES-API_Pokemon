import express from 'express';

import { errorHandler } from '@infrastructure/http/middlewares/error-handler';
import { routes } from '@infrastructure/http/routes';
import { setupSwagger } from '@main/config/swagger';

const app = express();

app.use(express.json());

setupSwagger(app);

app.use('/', routes);

app.use(errorHandler);

const PORT = Number(process.env.PORT ?? 3000);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger running on http://localhost:${PORT}/api/docs`);
});
