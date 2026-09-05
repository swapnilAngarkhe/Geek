#!/bin/sh 

#created to automate the migrations
#this will start the django server
#wait till postgresql is started
#after connections, migrates the schemas
#above is the code and that # ! thingy is shabang its part of the code.


echo "starting geek django container..."

echo "waiting for postgres..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
    sleep 1
done

echo "postgresql ready..."

echo "running migrations..."
python manage.py migrate

echo "starting django server..."
exec python manage.py runserver 0.0.0.0:8000