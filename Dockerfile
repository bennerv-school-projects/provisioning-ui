FROM node:14.3

# Note: you cannot run an `npm run build` then serve the content because environment variables are input to 
# the container at the time `npm run build` is run.  So react will not pick up any environment variables dynamically

MAINTAINER Ben Vesel "bves94@gmail.com"

# Make src directory
RUN mkdir /src

# Copy src artifacts over to new directory
COPY . /src/

# Install all npm modules 
RUN /usr/local/bin/npm install --prefix /src && /usr/local/bin/npm install -g serve && /usr/local/bin/npm --prefix /src run build
    

# Serve the content
ENTRYPOINT /usr/local/bin/serve -d -s -n -l 3000 /src/build


