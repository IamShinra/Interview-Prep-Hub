module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; img-src 'self' data: https://i.pravatar.cc https://flowbite.com https://sp.tinymce.com; style-src 'self' 'unsafe-inline' https://cdn.tiny.cloud; connect-src 'self' https://cdn.tiny.cloud https://api.stripe.com https://m.stripe.com https://m.stripe.network https://js.stripe.com https://stripe.com https://api.codex.jaagrav.in https://www.googleapis.com https://interview-prep-hub-backend.vercel.app http://localhost:8001; script-src 'self' https://cdn.tiny.cloud 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; frame-src 'self' https://js.stripe.com;",
          },
        ],
      },
    ];
  },
};
