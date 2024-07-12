module.exports = {
  directives: {
    defaultSrc: [
      "'self'",
      "https://unpkg.com",
      "https://www.openstreetmap.org",
    ],
    scriptSrc: ["'self'", "https://unpkg.com", "https://cdnjs.cloudflare.com"],
    styleSrc: [
      "'self'",
      "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
      "https://unpkg.com",
      "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",
      "'unsafe-inline'", // This might be necessary if Leaflet injects inline styles
      "https://cdnjs.cloudflare.com",
      "https://fonts.googleapis.com",
    ],
    imgSrc: [
      "'self'",
      "data:", // This is for inline images
      "https://unpkg.com",
      "https://cdnjs.cloudflare.com",
      "https://tile.openstreetmap.org",
      "https://a.tile.openstreetmap.org",
      "https://b.tile.openstreetmap.org",
      "https://c.tile.openstreetmap.org",
      "https://tile.openstreetmap.fr",
      "https://a.tile.openstreetmap.fr",
      "https://b.tile.openstreetmap.fr",
      "https://c.tile.openstreetmap.fr",
    ],
    connectSrc: [
      "'self'",
      "https://unpkg.com",
      "https://cdnjs.cloudflare.com",
      "https://tile.openstreetmap.org",
      "https://tile.openstreetmap.fr",
      "http://127.0.0.1:3000",
    ],
    fontSrc: [
      "'self'",
      "https://cdnjs.cloudflare.com",
      "https://fonts.gstatic.com",
    ],
    frameSrc: ["'self'", "https://www.openstreetmap.org"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
};
