module.exports = {
  apps: [
    {
      name: 'kowaseru',
      script: 'src/entry.ts',
      // Run node directly with tsx registered (NOT `interpreter: 'tsx'`).
      // Using tsx as the interpreter makes it fork a child that binds the
      // port; PM2 then tracks the wrapper, and on crash/kill the child
      // orphans, holding the port and causing EADDRINUSE restart loops.
      // `node --import tsx` keeps PM2 in control of the single bound process.
      interpreter: 'node',
      node_args: '--import tsx',
      // Auto-revive on any crash, with backoff so a hard-failing process
      // (e.g. bad .env) doesn't hot-loop forever.
      autorestart: true,
      max_restarts: 10,
      restart_delay: 2000,
      exp_backoff_restart_delay: 200
    }
  ]
}
