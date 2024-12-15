interface Environment {
  baseUrl: string;
  maxVUs: number;
}

const environments: {
  [key: string]: Environment;
} = {
  staging: {
    baseUrl: 'http://localhost:3000',
    maxVUs: 50,
  },
  production: {
    baseUrl: 'https://api.yourapp.com',
    maxVUs: 100,
  },
};

export function getConfig() {
  const env = __ENV.ENVIRONMENT || 'staging';

  return environments[env];
}
