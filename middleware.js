const checkXType = (req, res, next) => {
  const xTypeValue = req.get('X-Type'); // Get the value of the 'X-Type' header.

  if (!xTypeValue) {
    return res.status(400).json({ error: 'Missing required header: X-Type' }); // Send 400 Bad Request if the header is missing.
  }

  if (xTypeValue !== '123') {
    return res.status(401).json({ error: 'Invalid X-Type header value' }); // Send 401 Unauthorized if the value is incorrect.
  }

  next(); // If the header is present and the value is correct, proceed.
};

module.exports = checkXType;
