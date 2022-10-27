FROM python:3.10.7

WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY main.py /app
COPY templates /app/templates
COPY static /app/static

EXPOSE 5002
