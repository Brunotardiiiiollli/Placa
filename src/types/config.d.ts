declare module '../config' {
  export const PORT: string | number;
  export const NODE_ENV: string;
  export const JWT_SECRET: string;
  export const JWT_EXPIRES_IN: string;
  export const DB_HOST: string;
  export const DB_PORT: number;
  export const DB_USER: string;
  export const DB_PASSWORD: string;
  export const DB_NAME: string;
  export const AWS_ACCESS_KEY_ID: string;
  export const AWS_SECRET_ACCESS_KEY: string;
  export const AWS_REGION: string;
  export const AWS_BUCKET: string;
  export const OPENAI_API_KEY: string;
}
