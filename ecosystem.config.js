module.exports = {
  apps: [
    {
      name: "ranhill-saj",
      script: "npm",
      args: "start",
      env: {
        PORT: 3017,
        NODE_ENV: "production",
      },
    },
  ],
};
