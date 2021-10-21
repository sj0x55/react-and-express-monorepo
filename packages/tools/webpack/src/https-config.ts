import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function validateKeyAndCerts({ cert, key, keyFile, crtFile }: Record<string, Buffer | string>) {
  let encrypted;

  try {
    encrypted = crypto.publicEncrypt(cert, Buffer.from('test'));
  } catch (err) {
    throw new Error(`The certificate "${crtFile}" is invalid.\n${err}`);
  }

  try {
    crypto.privateDecrypt(key, encrypted);
  } catch (err) {
    throw new Error(`The certificate key "${keyFile}" is invalid.\n${err}`);
  }
}

function readEnvFile(file: string, type: string) {
  if (!fs.existsSync(file)) {
    throw new Error(`You specified ${type} in your env, but the file "${file}" can't be found.`);
  }

  return fs.readFileSync(file);
}

function getHttpsConfig(pathDir: string) {
  const { SSL_CRT_FILE, SSL_KEY_FILE, HTTPS } = process.env;
  const isHttps = HTTPS === 'true';

  if (isHttps && SSL_CRT_FILE && SSL_KEY_FILE) {
    const crtFile = path.resolve(pathDir, SSL_CRT_FILE);
    const keyFile = path.resolve(pathDir, SSL_KEY_FILE);
    const config: Record<string, Buffer | string> = {
      cert: readEnvFile(crtFile, 'SSL_CRT_FILE'),
      key: readEnvFile(keyFile, 'SSL_KEY_FILE'),
    };

    validateKeyAndCerts({ ...config, keyFile, crtFile });
    return config;
  }
  return isHttps;
}

export default getHttpsConfig;
