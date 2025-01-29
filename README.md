# Gaming Era

Gaming Era is a social media platform designed for gamers to connect with others who share similar interests. Users can post updates, join groups, chat in real-time, and even engage in one-on-one video calls.

## Features

- **Social Networking for Gamers** – Connect with like-minded gamers, join communities, and share posts.
- **Real-time Chat** – Instant messaging using WebSockets.
- **One-on-One Video Calling** – Peer-to-peer connections powered by WebRTC.
- **Secure Authentication** – Supports Google OAuth 2.0 (implemented without a library) and email/password login.
- **JWT-Based Authorization** – Ensures secure session management across multiple services.
- **Custom WebSocket Server** – Built from scratch using `ws`, including custom room management.

## Tech Stack

- **Frontend & APIs:** Next.js
- **Styling:** Tailwind-CSS
- **Authentication:** Google OAuth 2.0 (implementation without any libray) & Email/Password Login
- **Session Management:** JWT for authentication and authorization
- **Real-time chating:** WebSocket server (`ws`) for messaging 
- **Real-time chating:** WebRTC for live video calls (peer to peer connection)
- **Database:** POSTGRESQL SQL-based relational database (leveraging join queries for efficiency)

## Project Motivation

While this project might seem fairly normal, I started it as a commitment to completing an entire project and, more importantly, to learning Next.js and working with relational databases. I wanted to understand how join queries make things smoother compared to NoSQL. Before this, I primarily worked with MongoDB, which has its own benefits, but as a fresher, I realized that almost every interviewer prefers SQL. After this project, I’ve actually started loving it myself.

Another key aspect was WebSockets, which I had used in the past but relied on a library for room management—this time, I built it from scratch. Then there’s WebRTC, a technology that has always fascinated me because of its ability to enable peer-to-peer connections without a server. How true that is, and what its trade-offs are, I’ve only scratched the surface of, but I hope to explore it more in the future.

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Ashfaqsidd47s/gaming_era_nextjs.git
   cd gaming_era_nextjs
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_WS_URL= ws://localhost:3000
   JWT_SECRET=your_jwt_secret
   POSTGRES_PRISMA_URL=your_postgres_prisma_url
   POSTGRES_URL_NON_POOLING
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_GOOGLE_CLIENT_ID= same_as_your_goole_id
   NEXT_PUBLIC_REDIRECT_URI=/auth/google/callback #kind of
   NEXT_PUBLIC_CLOUDINARY_API_KEY= cloudnary_api_key_for_storing_media_files
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudnay_srorage_name
   CLOUDINARY_API_SECRET=your_cludanary_secret

   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```



