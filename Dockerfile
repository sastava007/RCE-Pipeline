FROM ubuntu:18.04
MAINTAINER Prajwal Singh, Shivash Srivastava

RUN echo "deb http://archive.ubuntu.com/ubuntu trusty main universe" > /etc/apt/sources.list

RUN apt-get update

#support for C/C++
RUN apt-get install -y gcc
RUN apt-get install -y g++

#Support for python
RUN apt-get install -y python3.7

#Support for Javascript
RUN apt-get install -y nodejs
RUN apt-get install -y npm

RUN apt-get install -y sudo
RUN apt-get install -y bc