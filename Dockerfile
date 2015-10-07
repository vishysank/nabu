FROM mhart/alpine-node:0.12
MAINTAINER vishySank

ENV APP_DIR=/app/nabu

RUN apk add --update-cache make gcc g++ python git openssh-client postgresql-client \
    && npm config set spin=false \
    && npm install -g npm@latest \
    && npm cache clear \
    && mkdir -p ${APP_DIR}

WORKDIR ${APP_DIR}
COPY package.json ${APP_DIR}/
RUN npm install --production
COPY . ${APP_DIR}

RUN apk del make gcc g++ python git \
    && rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp \
    && adduser -h ${APP_DIR} -s /bin/ash -D deploy \
    && chown -R deploy ${APP_DIR}

USER deploy

EXPOSE 3000

CMD ["npm", "start"]
