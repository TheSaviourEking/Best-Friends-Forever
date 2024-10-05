FROM python:3.12.7-alpine

WORKDIR /app

COPY . .

RUN pip install flask

ENV FLASK_APP=app.py

CMD [ "flask", "run", "--debug" ]
