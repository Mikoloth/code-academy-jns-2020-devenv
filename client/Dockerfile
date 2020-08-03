FROM node:12
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run-script build

FROM nginx:alpine
COPY reverseProxy.conf /etc/nginx/reverseProxy.conf
COPY nginx_default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/build /usr/share/nginx/html