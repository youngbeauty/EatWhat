const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = "597664842746-strmk2dfn8bpat9puhsn8d40u3r5tnjc.apps.googleusercontent.com";
const { HttpsProxyAgent } = require("https-proxy-agent");

// create a new OAuth client used to verify google sign-in

// 确保在最开始就设置环境变量
process.env.HTTPS_PROXY = process.env.HTTPS_PROXY || "http://127.0.0.1:7890";
process.env.HTTP_PROXY = process.env.HTTP_PROXY || "http://127.0.0.1:7890";

console.log("HTTPS_PROXY:", process.env.HTTPS_PROXY);
console.log("HTTP_PROXY:", process.env.HTTP_PROXY);

const proxyAgent = new HttpsProxyAgent(process.env.HTTPS_PROXY);

// 设置全局代理
require("https").globalAgent = proxyAgent;
require("http").globalAgent = proxyAgent;

// 替换成你的代理端口

const client = new OAuth2Client({
  clientId: CLIENT_ID,
  httpAgent: proxyAgent,
  httpsAgent: proxyAgent,
});

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  console.log("Starting token verification...");
  console.log("Using proxy:", process.env.HTTPS_PROXY);
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
      requestOptions: {
        agent: proxyAgent,
        timeout: 10000, // 10 秒超时
      },
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
    });

    return newUser.save();
  });
}

function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  const userSocket = socketManager.getSocketFromUserID(req.user._id);
  if (userSocket) {
    socketManager.removeUser(req.user, userSocket);
  }
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
