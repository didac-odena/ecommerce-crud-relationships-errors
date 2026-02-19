import app from "./app.js";

const PORT = process.env.PORT || 3000;

/**
 * Iteration 1 - Bootstrap
 * TODO:
 * - Import `connectToDatabase` from `./config/db.config.js`.
 * - Connect to MongoDB before starting the server.
 * - Fail fast (exit with code 1) if startup fails.
 */

const startServer = async () => {
  app.listen(PORT, () => {
    // TODO (Iteration 1): Keep this log, or switch to your preferred logging style.
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
