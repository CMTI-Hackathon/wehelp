import mariadb
import sys
import os
def check_credentials(username, password):
    try:
        # Підключення db
        connection = mariadb.connect(
            host= os.environ["MYSQL_HOST"],
            port=3306,
            user="example_user",
            password="example_password")
        connection.auto_reconnect = True

        cursor = connection.cursor()

        query = "SELECT id FROM users WHERE username = %s AND password = %s"
        cursor.execute(query, (username, password))

        result = cursor.fetchone()

        cursor.close()
        connection.close()

        if result:
            return True
        else:
            return False
    except mariadb.Error as error:
        print("Error:", error)
        return False

username = "example_password"
password = "example_password"
print(os.environ["MYSQL_HOST"])
if check_credentials(username, password):
    print("Credentials are correct.")
else:
    print("Credentials are incorrect.")
