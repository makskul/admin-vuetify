FROM node:18-alpine as build

#RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

#ENV BASE_URL='https://bull-admin.aechannel.com'
ENV VITE_AXIOS_BASE_URL='/api/v1'
COPY . /usr/src/app

RUN npm ci
RUN npm run build

FROM nginx:1.20-alpine as production
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
#COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]
