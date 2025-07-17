# Pokemon API Deployment Guide

## Heroku Deployment Steps

1. **Set up environment variables in Heroku:**
   ```bash
   heroku config:set DATABASE_URL=your_mongodb_atlas_connection_string
   ```

2. **Make sure you have the latest code committed:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   ```

3. **Deploy to Heroku:**
   ```bash
   git push heroku main
   # or if your branch is different:
   git push heroku addReactApp:main
   ```

## Local Development

1. **Install dependencies:**
   ```bash
   npm run install-api
   npm run install-reactjs
   ```

2. **Build React app:**
   ```bash
   npm run build-reactjs
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## Environment Variables Needed

- `DATABASE_URL`: MongoDB connection string
- `PORT`: Server port (automatically set by Heroku)

## Build Process

The `heroku-postbuild` script will:
1. Install API dependencies
2. Install React dependencies  
3. Build the React app for production
4. The server will serve the built React app
