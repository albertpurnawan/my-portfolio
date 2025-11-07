# My Portfolio

Personal portfolio site built with Vite + React + TypeScript + Tailwind.

## Development

Requirements:
- Node.js and npm (recommend using nvm)

Steps:
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
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
docker build -t snappy-folio-site .
```

Run container:
```sh
docker run -p 8080:80 snappy-folio-site
```

Open the app:
```
http://localhost:8080
```
# my-portfolio
