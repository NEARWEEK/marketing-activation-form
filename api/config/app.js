const config = {
  env: process.env.NODE_ENV || 'development',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/marketing_activation_form',
};

module.exports = config;
