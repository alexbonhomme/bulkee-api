cd /tmp

# try to remove the repo if it already exists
rm -rf push-it

git clone https://oliviereeckhout:Baureau1788@bitbucket.org:oliviereeckhout/push-it.git
cd push-it
git fetch --all
git checkout develop
git pull origin develop

export NODE_ENV=development
sudo ln -s /usr/bin/nodejs /usr/bin/node
npm install -g nodemon gulp forever
npm install

forever server.js
