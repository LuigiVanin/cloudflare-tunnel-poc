FROM oven/bun:1.0.0 AS builder

WORKDIR /usr/app

COPY bun.lock package.json ./

RUN bun install

COPY . .


RUN addgroup --system ac-server && adduser --system ac-server-user --ingroup ac-server
USER ac-server-user

EXPOSE 3000

CMD ["bun", "run", "start"]
