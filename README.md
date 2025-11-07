# my-portfolio

Personal portfolio site built with Vite + React + TypeScript + Tailwind.

## Development

Requirements:
- Node.js and npm (recommend using nvm)

Steps:
```sh
git clone https://github.com/albertpurnawan/my-portfolio.git
cd my-portfolio
npm i
npm run dev
```

## Technology Stack
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

### Docker
This project includes a production-ready Dockerfile that builds the app and serves it via nginx.

Build image:
```sh
docker build -t my-portfolio .
```

Run container:
```sh
docker run -p 8080:80 my-portfolio
```

Open the app:
```
http://localhost:8080
```
# my-portfolio
