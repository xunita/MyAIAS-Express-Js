// To handle async errors in routes
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
module.exports = asyncHandler
