# Roast Radar ☕

A specialty coffee tracking platform - like Letterboxd or Goodreads, but for coffee beans and grinds. Track your coffee journey, discover new roasters, and explore the world of specialty coffee.

## Features

- **Coffee Database**: Comprehensive database of specialty coffee beans and grinds from Indian roasters
- **User Profiles**: Create and manage your coffee profile
- **Purchase Tracking**: Log the beans you buy and track your coffee journey
- **Explore Section**: Discover new coffees with filtering by bitterness, acidity, roast level, and more
- **Community Contributions**: Add new beans to the database that aren't already present

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- Docker (for local database)
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd roast-radar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Start PostgreSQL with Docker
   docker-compose up -d
   
   # Copy environment variables
   cp .env.example .env
   # Edit .env with your database URL
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The app uses three main models:

- **Coffee**: Stores coffee information (name, roaster, type, roast level, etc.)
- **User**: User profiles and authentication
- **PurchaseEvent**: Tracks user coffee purchases

## Development

### Database Commands

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

### Docker Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View database logs
docker-compose logs postgres

# Connect to database
docker exec -it roast-radar-db psql -U postgres -d roast_radar
```

## Deployment

The app is designed to be deployed on Vercel with a PostgreSQL database.

1. **Set up Vercel Postgres** in your Vercel dashboard
2. **Update environment variables** with your production database URL
3. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

## Contributing

This is an MVP focused on core functionality. Future features may include:
- Advanced filtering and search
- Coffee rating and reviews
- Social features and recommendations
- Mobile app

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
