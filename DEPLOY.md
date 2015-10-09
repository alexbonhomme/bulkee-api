##To deploy with docker go in docker directory
1. Attention you have to copy your public key in bitbucket settings (settings of bitbucket repository)
2. Now go in directory which correspond of your environment (development, tests,...) and after that you have to copy your private key id_rsa (in your $HOME/.ssh repertory) in the directory of your environment (don't worry it won't be versioning on git)
3. To build your docker you must type :
```
$ docker build .
```
4. When it's finished you type :
```
$ docker images
```
5. You take the last image ID
6. Now launch your server like this (except for tests):
```
$ docker run -d -p 3000:3000 <IMAGEID>
```
+ For test you must type :
```
$ docker run -d <IMAGEID>
```
7. Then wait 2mins et your server is ready !!!

###Tips :
If you want to see if your server is running or not type :
```
docker ps
```
to find container id and :
```
docker logs <CONTAINERID>
``` 
