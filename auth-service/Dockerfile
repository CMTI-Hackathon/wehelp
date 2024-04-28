FROM golang:1.22.2-alpine
WORKDIR /usr/src/app
COPY src/go.mod src/go.sum ./
RUN go mod download && go mod verify

COPY ./src .
RUN go build .
CMD ["./wehelp_goservice"]