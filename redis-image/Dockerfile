# Use and existing docker img as a base
FROM alpine


# Download and install a dependency
RUN apk add --update redis

# Tell the img what to do when it starts as a container
CMD ["redis-server"]