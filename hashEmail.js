const crypto = require("crypto");

function hashEmailHMAC(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const secretKey = process.env.HASH_SECRET;
  const hmac = crypto
    .createHmac("sha256", secretKey)
    .update(normalizedEmail)
    .digest("hex");
  return hmac;
}

module.exports = hashEmailHMAC;
