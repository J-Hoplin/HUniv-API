FROM node:hydrogen-buster 

LABEL maintainer="Hoplin"
LABEL email="jhoplin7259@gmai.com"

RUN apt-get update\
    && apt-get upgrade -y\
    && mkdir api
WORKDIR /api

VOLUME [ "/api" ]
EXPOSE 4000 6000

CMD [ "-c","npm run dev-run" ]
ENTRYPOINT [ "/bin/bash" ]