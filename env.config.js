const PRODUCTION = {
  API_BASE_URL: "https://instalearn.classplus.co",
  CLIENT_ID:
    "744738293960-2opm8rknv47q2i115vvo057ju4f2r69v.apps.googleusercontent.com",
  REDIRECT_URI: "https://meetpro.club/authorization",

  SCOPES:
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  GRAPH_BASEURL: "https://meetpro.club/",
};

const STAGING = {
  API_BASE_URL: "https://instalearn-preprod.classplusapp.com",
  // CLIENT_ID:
  //   "713801279282-g676ebjruu3f4v9s4sbu3b9fanpkh11u.apps.googleusercontent.com",
  CLIENT_ID:
    "408152852171-ee4e2a8jteu5d38m715vs1ooctpmjd6a.apps.googleusercontent.com",
  REDIRECT_URI: "https://meetpro-preprod.classplusapp.com/authorization",
  SCOPES:
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  GRAPH_BASEURL: "https://meetpro-preprod.classplusapp.com/",
};

const LOCAL = {
  API_BASE_URL: "https://instalearn-preprod.classplusapp.com",
  // CLIENT_ID:
  //   "713801279282-g676ebjruu3f4v9s4sbu3b9fanpkh11u.apps.googleusercontent.com",
  CLIENT_ID:
    "408152852171-ee4e2a8jteu5d38m715vs1ooctpmjd6a.apps.googleusercontent.com",
  REDIRECT_URI: "http://localhost:9999/authorization",
  SCOPES:
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  GRAPH_BASEURL: "http://localhost:9999/",
};

const config =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? PRODUCTION
    : process.env.NEXT_PUBLIC_ENV === "staging"
    ? STAGING
    : LOCAL;

export default config;
