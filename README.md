Protocol compatibility patch
=============================

This patch changes the Mineflayer dependency to @wp2508/mineflayer 4.42.7,
which its npm page says adds Minecraft 26.3 protocol support.

How to apply:
1. Download and extract this ZIP.
2. Replace package.json and index.js in your repository with these files.
3. Commit/push to GitHub.
4. In Render, deploy the latest commit. If needed, clear the build cache and deploy.
5. Keep MC_HOST, MC_PORT, MC_USERNAME, MC_VERSION, and MC_AUTH as Render environment variables.

Important:
- This is a third-party fork, not the official PrismarineJS Mineflayer release.
- Compatibility with the rest of a particular server setup is not guaranteed.
- This code intentionally blocks Aternos domains; it is for servers that permit bots.
- It does not implement automatic reconnection or guarantee 24/7 uptime.
