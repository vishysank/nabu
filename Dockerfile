FROM mhart/alpine-node:2.4.0
MAINTAINER vishySank

ENV APP_DIR=/app/nabu

RUN npm config set spin=false \
    && npm install -g npm@latest \
    && npm cache clear \
    && mkdir -p ${APP_DIR} \
    && adduser -h ${APP_DIR} -s /bin/ash -D deploy \
    && chown -R deploy ${APP_DIR}

WORKDIR ${APP_DIR}
COPY package.json ${APP_DIR}/
RUN npm install --production \
    && rm -rf /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

COPY . ${APP_DIR}

USER deploy

EXPOSE 3000

CMD ["npm", "start"]
