module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '7768e25ebf79e93c6d5c6602c21118d1'),
  },
});
