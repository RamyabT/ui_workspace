##FROM node:16.14-alpine as builder
FROM sapphire.intellectdesign.com/ctoo-devops_baseline_images/node:16.14-alpine as builder
RUN npm install -g npm@8.19.3

RUN npm cache clean --force

COPY package.json .npmrc ./


## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i --force && mkdir /dit-dep24-retail-app && mv ./node_modules ./dit-dep24-retail-app



WORKDIR /dit-dep24-retail-app

COPY . .

RUN node --max_old_space_size=4086 node_modules/@angular/cli/bin/ng build  --output-path=dist --base-href=/dit-dep24-retail/  




### STAGE 2: Setup ###
FROM sapphire.intellectdesign.com/ctoo-devops_baseline_images/nginx:alpine
USER root
COPY --from=builder /dit-dep24-retail-app/dist/ /usr/share/nginx/html/dit-dep24-retail/

COPY config/nginx.conf /etc/nginx/nginx.conf
RUN cat /etc/nginx/nginx.conf

RUN sed -i 's/#error_page/error_page/g' /etc/nginx/conf.d/default.conf
RUN sed -i 's/#access_log/access_log/g' /etc/nginx/conf.d/default.conf

RUN ln -s /usr/share/nginx/html/ /usr/share/nginx/html/dit-dep24-retail && chmod -R 755 /usr/share/nginx/html/


