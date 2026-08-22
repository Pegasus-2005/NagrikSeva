import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import app from "./src/serverApp.js";

// Handle CJS and ESM __dirname compatibility
const currentDir = typeof __dirname !== 'undefined' 
  ? __dirname 
  : path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite Development Middleware successfully attached to Express on port 3000.");
  } else {
    // Serve production static assets
    app.use(express.static(path.resolve(currentDir, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(currentDir, "dist", "index.html"));
    });
    console.log("Vite Production build assets served via Express static handler.");
  }

  const port = 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`NagrikSeva Full-stack application ready at http://0.0.0.0:${port}`);
  });
}

startServer();
