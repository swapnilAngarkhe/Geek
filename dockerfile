FROM python:3.12

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1

COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

#installs netcat (helps to check if two ports are ready to connect or not.)
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

EXPOSE 8000

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]