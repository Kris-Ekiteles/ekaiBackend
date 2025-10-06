const makeAbsoluteUrl = (req, pathOrUrl) => {
  if (!pathOrUrl) return pathOrUrl;
  // If already absolute (http or https), return as is
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  // Ensure leading slash
  const relativePath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}${relativePath}`;
};

module.exports = { makeAbsoluteUrl };


