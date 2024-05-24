# NODE ENVIRONMENT
FROM node:18

# ENV VARIABLES AND PORT
ARG PORT=9999
ARG ENVIRONMENT=production

RUN mkdir -p /usr/app/
WORKDIR /usr/app
COPY ./ ./

RUN npm install --force
RUN npm run build-$ENVIRONMENT

EXPOSE $PORT
CMD ["npm","run","start"]
