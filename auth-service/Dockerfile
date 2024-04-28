<<<<<<< HEAD
FROM golang:1.22.2-alpine
WORKDIR /usr/src/app
COPY src/go.mod src/go.sum ./
RUN go mod download && go mod verify

COPY ./src .
RUN go build .
CMD ["./wehelp_goservice"]
=======
FROM python:3
WORKDIR /usr/src/app
RUN apt-get install libmariadb3 libmariadb-dev 
RUN apt-get update
RUN apt-get install -y iputils-ping
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN cat /etc/resolv.conf
#RUN ping mariadb_database
COPY . .

CMD [ "python", "./main.py" ]
>>>>>>> Front-end
