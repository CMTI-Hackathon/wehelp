import mariadb
import sys
import os
import socket
import time
def check_credentials(username, password):
    try:
        # Підключення db
        connection = mariadb.connect(
            host= "mariadb_database",
            port=3306,
            user="example_user",
            database="USERS",
            password="example_password")
        connection.auto_reconnect = True

        cursor = connection.cursor()

        query = "SHOW TABLES;"
        cursor.execute(query)

        result = cursor.fetchone()

        cursor.close()
        connection.close()
        print (result)
        if result:
            print("Connected!")
            return True
        else:
            return False
    except mariadb.Error as error:
        print("Error:", error)
        return False

username = "example_password"
password = "example_password"
print(os.environ["MYSQL_HOST"])
while True:
    
    print(socket.gethostbyname('mariadb_database'))
    if check_credentials(username, password):
        print("Credentials are correct.")
    else:
        print("Credentials are incorrect.")
    time.sleep(3)
    
