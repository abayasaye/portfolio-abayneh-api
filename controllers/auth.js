const { expressjwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const request = require("request");
const config = require("../config");

exports.checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://dev-gyvzuyqvi0wepy63.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://dev-gyvzuyqvi0wepy63.us.auth0.com/api/v2/",
  issuer: "https://dev-gyvzuyqvi0wepy63.us.auth0.com/",
  algorithms: ["RS256"],
});

exports.checkRole = (role) => (req, res, next) => {
  const user = req.auth;
  if (user && user[config.AUTH0_NAMESPACE + "/roles"].includes(role)) {
    next();
  } else {
    return res
      .status(401)
      .send("your role is invalid you can not access this page");
  }
};

exports.getAccessToken = (callback) => {
  const options = {
    method: "POST",
    url: config.AUTH0_TOKEN_URL,
    headers: { "Content-Type": "application/json" },
    form: {
      grant_type: "client_credentials",
      client_id: config.AUTH0_CLIENT_ID,
      client_secret: config.AUTH0_CLIENT_SECRET,
      audience: config.AUTH0_AUDIENCE,
    },
  };

  return new Promise((resolve, reject) => {
  request(options, (err, res, body) => {
    if (err) {
      reject(new Error(err));
    }
    resolve(body ? JSON.parse(body): '');
  })
  })
};

exports.getAuth0User = accessToken=> userId =>{
  const options = {
    method: 'GET',
    url: `${config.AUTH0_DOMAIM}/api/v2/users/${userId}?fields=name,picture,user_id`,
    headers: { authorization: `Bearer ${accessToken}` }
  };
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(new Error(err));
      }
      resolve(body ? JSON.parse(body): '');
    })
    })
  
}