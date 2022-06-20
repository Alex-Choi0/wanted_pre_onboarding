FROM node:16

WORKDIR /nestjs/playin-rpg-server

COPY package.json /nestjs/xrstudioplayin-rpg-server/
COPY package-lock.json /nestjs/xrstudioplayin-rpg-server/

RUN npm install

COPY . /nestjs/xrstudioplayin-rpg-server/

RUN npm run build

EXPOSE 3000

CMD ["node","dist/main"]
