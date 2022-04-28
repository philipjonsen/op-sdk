module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bond',
        permanent: true,
      },
    ];
  },
};
