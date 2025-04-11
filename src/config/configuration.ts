export default () => {
  const config = {
    port: Number(process.env.PORT),
    databaseUrl: process.env.DATABASE_URL,
  };

  if (config.port < 5000) {
    config.port = 8000;
  }

  return config;
};
