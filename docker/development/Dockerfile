FROM ubuntu

# make sure apt is up to date
RUN apt-get update

# install nodejs and npm
RUN apt-get install -y nodejs npm git git-core

#for authentication by key
#RUN mkdir -p /root/.ssh
#RUN ls /root
#ADD id_rsa  /root/.ssh/id_rsa

#RUN chmod 700 /root/.ssh/id_rsa
#RUN echo "Host bitbucket.org\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

ADD start.sh /tmp/

RUN chmod +x /tmp/start.sh

CMD ./tmp/start.sh
