feeling-location-backend/
│
├── 📁 config/               # Configuration files (e.g., DB, env, tokens)
│   └── db.js
│   └── firebase.js
│   └── socket.js
│
├── 📁 controllers/          # Route logic (what happens when routes hit)
│   └── auth.controller.js
│   └── user.controller.js
│   └── location.controller.js
│   └── feeling.controller.js
│
├── 📁 models/               # MongoDB models/schema
│   └── user.model.js
│   └── feeling.model.js
│   └── location.model.js
│
├── 📁 routes/               # Route definitions
│   └── auth.routes.js
│   └── user.routes.js
│   └── feeling.routes.js
│   └── location.routes.js
│
├── 📁 middlewares/          # Auth, error handling, validation etc.
│   └── auth.middleware.js
│   └── errorHandler.js
│
├── 📁 sockets/              # WebSocket (real-time communication)
│   └── index.js
│   └── feelingSocket.js
│   └── locationSocket.js
│
├── 📁 utils/                # Helper functions (formatting, distance calc, etc.)
│   └── token.util.js
│   └── location.util.js
│
├── 📁 services/             # Business logic layer (optional but clean)
│   └── auth.service.js
│   └── user.service.js
│   └── location.service.js
│   └── feeling.service.js
│
├── 📁 validations/          # Joi or custom validators for input
│   └── auth.validation.js
│   └── location.validation.js
│
├── 📁 .env                  # Environment variables (PORT, DB_URI, etc.)
├── 📁 app.js                # Express app config (middlewares, routes, etc.)
├── 📁 server.js             # App startup point (http + socket init)
├── 📁 package.json
└── 📁 README.md
