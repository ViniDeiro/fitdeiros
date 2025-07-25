import serverless from "serverless-http";
import { createServer } from "../../server";

const app = createServer();

export default serverless(app, {
  binary: false,
});

// Para compatibilidade com Vercel
export const handler = serverless(app);
