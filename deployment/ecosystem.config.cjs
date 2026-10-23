module.exports = {
  apps: [
    {
      name: 'farmers-mill-cluster',
      script: './server.ts',
      interpreter: 'node',
      interpreter_args: '--import tsx',
      // Cluster mode: spawns an instance for every CPU core available
      instances: 'max',
      exec_mode: 'cluster',
      // High-concurrency memory and restart policies
      max_memory_restart: '1024M',
      exp_backoff_restart_delay: 100,
      listen_timeout: 8000,
      kill_timeout: 5000,
      wait_ready: true,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        UV_THREADPOOL_SIZE: 64, // Increase libuv threadpool for async crypto & I/O
        NODE_OPTIONS: '--max-old-space-size=2048'
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        UV_THREADPOOL_SIZE: 32
      }
    }
  ]
};
