cd /tmp

# try to remove the repo if it already exists
rm -rf push-it

git clone git@bitbucket.org:oliviereeckhout/push-it.git
cd push-it
git fetch --all
git checkout develop
git pull origin develop

export NODE_ENV=tests
sudo ln -s /usr/bin/nodejs /usr/bin/node
npm install -g nodemon gulp forever
npm install

while true
do
	git pull origin develop
    gulp mocha
    sleep 3600
done
