import serverless from "serverless-http";
import { createServer } from "../../server";

const app = createServer();

// Export default para Vercel
export default serverless(app);

// Export handler para compatibilidade
export const handler = serverless(app);
