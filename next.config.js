module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
  images: {
    domains: ['images.freeimages.com', 'images.stock.adobe.com', 'as2.ftcdn.net'], // Add the hostname here
  },
};
