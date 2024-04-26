FROM golang:1.22.2-alpine
WORKDIR /usr/src/app
COPY go.mod  ./
RUN go mod download && go mod verify

COPY . .
RUN go build .
CMD ["./wehelp_goservice"]