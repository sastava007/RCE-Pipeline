## What is RCE Pipeline?
RCE stands for Remote Code Execution service/pipeline is a docker based sandbox environment to run the untrusted code submitted by users. RCE will test the code in an isolated environment, this way we do not have to worry about untrusted code possibly damaging our server intentionally or unintentionally.

So, you might have used online coding platforms like HackerRank & Leetcode where you write your code and then submits the code for execution. Here's come the RCE into picture, it's the service which will be called when you submit your code for execution.

## How does it work?
The client side app submits the code and language id to the server through the API. The API then spins up a Docker container for each API request and runs the code using the compiler/interpreter of given language. The program runs inside a virtaul machine with limited resources and has a time limit for execution. Once the output is ready, it is sent back to the client as response and docker container is destroyed with all the files from the server.    

## How to consume this?
To this use this service, all you need is to deploy the Docker file on some free tier server try using (Heroku or Netlify). Once you have deployed your application, all you need is to call the API endpoints from your client application. For better understanding, try seeing the below architecture which is how we are doing at myOJ.
 


<p align="center"> 
<img src="https://i.imgur.com/MWrhP1W.png">
</p>
