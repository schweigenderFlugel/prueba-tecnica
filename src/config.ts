import dotenv from 'dotenv';

dotenv.config();

const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
};

export default config;
