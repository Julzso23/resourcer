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

FROM backend-base AS backend-prod
ENV NODE_ENV=production
RUN npm run build
CMD ["npm", "run", "start:prod"]

# Frontend stages
FROM base AS frontend-base
COPY frontend ./frontend
COPY dtos ./dtos
WORKDIR /usr/local/app/frontend
RUN npm install

FROM frontend-base AS frontend-dev
CMD ["npm", "run", "dev"]

FROM frontend-base AS frontend-build
RUN npm run build

FROM nginx AS frontend-prod
COPY --from=frontend-build /usr/local/app/frontend/dist /usr/local/app/frontend/dist
COPY nginx.conf /etc/nginx/nginx.conf
