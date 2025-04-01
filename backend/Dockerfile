FROM python:3.11-slim

RUN mkdir /container_thingz_do_not_touch

WORKDIR /container_thingz_do_not_touch

COPY requirements.txt /container_thingz_do_not_touch/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /container_thingz_do_not_touch/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
