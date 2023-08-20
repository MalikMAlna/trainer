//js
module.exports = () => {
  const rewrites = async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
      {
        source: "/api/:path*",
        destination: "https://api.d-id.com/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};
