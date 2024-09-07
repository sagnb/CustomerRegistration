FROM node:21.7.2

WORKDIR /api

COPY . .

RUN rm -rf node_modules
RUN npm i
RUN npx prisma generate

CMD ["npm", "start"]

EXPOSE 3333
