function required(name: string) {
  if (!process.env[name]) {
    throw new Error(`Missing env: ${name}`);
  }
  return process.env[name];
}

export const ENV = {
  JWT_SECRET: required("JWT_SECRET"),
  PORT: process.env.PORT || 3000,
  DB_HOST: required("DB_HOST"),
  DB_PORT: parseInt(required("DB_PORT")),
  DB_NAME: required("DB_NAME"),
  DB_USER: required("DB_USER"),
  DB_PASSWORD: required("DB_PASSWORD"),
};
