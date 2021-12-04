import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request } from 'express';
import * as path from 'path';
import { decodeAccessToken } from './helpers/hash';
import { privateMethods, publicMethods } from './api';
import { ApiError, ApiErrors } from './shared/types/error';

const envPath = {
  local: '.env.local',
  global: '.env',
};
dotenv.config({
  path: fs.existsSync(envPath.local) ? envPath.local : envPath.global,
});

const app = express();
const port = process.env.PORT || 3003;

const env = process.env.NODE_ENV || 'development';
const staticPath = env === 'production' ? '../public' : '../client/build';
const subFolder = env === 'production' ? '/english-tasks' : '';
app.use(express.static(path.join(__dirname, staticPath)));
app.use(cors());

app.get(subFolder + '/api/*', (req: Request<{ 0?: string }>, res) => {
  const fullMethod = req.params[0] || ''; // apps.get
  const [methodName, methodSubname] = fullMethod.split('.');

  if (!fullMethod || !methodName || !methodSubname) {
    return res.status(404).send('Sorry cant find that!');
  }

  const publicMethod = publicMethods[methodName];
  const privateMethod = privateMethods[methodName];
  const publicSubMethod = publicMethod ? publicMethod[methodSubname] : undefined;
  const privateSubMethod = privateMethod ? privateMethod[methodSubname] : undefined;
  if (!publicSubMethod && !privateSubMethod) {
    return res.json({
      error: new ApiError(ApiErrors.UNKNOWN_METHOD).toObject(),
    });
  }
  try {
    let method;
    if (publicSubMethod) {
      method = publicSubMethod(req.query);
    } else if (privateSubMethod) {
      let userId;
      try {
        userId = decodeAccessToken(String(req.query['accessToken'] || '')).id;
        if (!userId) {
          throw new Error();
        }
      } catch (e) {
        console.error(e);
        throw new ApiError(ApiErrors.INVALID_ACCESS_TOKEN);
      }
      method = privateSubMethod(userId, req.query);
    } else {
      method = Promise.reject(new ApiError(ApiErrors.METHOD_ERROR, 'Internal error'));
    }

    return method
      .then((result) => {
        return res.json({
          response: result,
        });
      })
      .catch((error: {message: string}) => {
        return res.json({
          error: new ApiError(ApiErrors.UNKNOWN_ERROR, error.message).toObject(),
        });
      });
  } catch (e: any) {
    console.error(e);
    return res.json({
      error: new ApiError(ApiErrors.UNKNOWN_ERROR, e.message || 'Unknown api error').toObject(),
    });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});

