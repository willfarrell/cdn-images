FROM willfarrell/codeship-base AS base

# Jessie required for matching linux binaries
FROM node:10-jessie

ARG workdir=/data
ARG bin=/usr/local/bin/codeship

ENV PATH=${PATH}:${bin}:${workdir}/node_modules/.bin

# rsync faster than cp, when running locally
#RUN apk update && \
#    apk add --no-cache bash openssl git openssh-client \
#    rsync

COPY --from=base ${bin}/ ${bin}/

WORKDIR ${workdir}
