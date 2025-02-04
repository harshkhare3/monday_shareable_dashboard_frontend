FROM node:16-alpine as build

ARG REACT_APP_BACKEND_HOST
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

RUN npm install -g react-scripts@5.0.0

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build

FROM node:16-alpine

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/build ./build

EXPOSE 5000

CMD ["serve", "-s", "build"]
