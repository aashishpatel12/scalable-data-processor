const rateLimit = new Map();

const rateLimiter = (windowMs, max) => {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!rateLimit.has(ip)) {
      rateLimit.set(ip, []);
    }

    const requests = rateLimit.get(ip);
    const windowStart = now - windowMs;
    const recentRequests = requests.filter((time) => time > windowStart);

    if (recentRequests.length >= max) {
      return res.status(429).json({
        error: "Too many requests",
      });
    }

    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);
    next();
  };
};

module.exports = rateLimiter;
