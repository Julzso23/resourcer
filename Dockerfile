FROM node:24 AS base
WORKDIR /usr/local/app

# Backend stages
FROM base AS backend-base
COPY backend ./backend
COPY dtos ./dtos
WORKDIR /usr/local/app/backend
RUN npm install

FROM backend-base AS backend-dev
CMD ["npm", "run", "start:dev"]

# Frontend stages
FROM base AS frontend-base
COPY frontend ./frontend
COPY dtos ./dtos
WORKDIR /usr/local/app/frontend
RUN npm install

FROM frontend-base AS frontend-dev
CMD ["npm", "run", "dev"]
