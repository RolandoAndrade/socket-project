# Socket client

## Requirements

You must install NodeJS.

See [NodeJS download Reference](https://nodejs.org/es/download/).


## Install all dependencies, compile and build all files
```
npm run build:all
```

If it fails, you should try to download the dependencies and build each module individually.

- [First client](./apps/client/README.md)

- [Then server of client](./apps/client/README.md)

### Serve the project at port 3000
```
npm run start
```

Then [Open your browser at http://localhost:3000](http://localhost:3000)

###Considerations for windows user: 

It is possible that you have some problems while trying to get your message from the client in case that your OS is Windows, to fix this you have to check somethings:

##1: check if you have a port available to recieve the message

You most likely have one aveliable that you dont know, in case you dont, you would need to open one, in my case, i opened the por 3022, as show below.
![image](https://user-images.githubusercontent.com/44983658/99152536-c51ee780-2678-11eb-9208-10c19a4f0a10.png)

##2: Disable the firewall completly

It sound a little extreme, but windows doesnt like messages from remotes servers, so we would have to disable the firewall while we use this aplications, if you dont disable it, you wont get the unique quote that the server is going to give you.

![image](https://user-images.githubusercontent.com/44983658/99152656-6e65dd80-2679-11eb-8d84-6bdbe2a6da87.png)


You are ready to go!
