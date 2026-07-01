FROM apify/actor-node:20

RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
 && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --prefer-offline

COPY . ./

CMD npm start
