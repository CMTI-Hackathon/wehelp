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