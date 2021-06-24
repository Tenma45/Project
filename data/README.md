# predict-disease-service

## Way 1 Build Setup in local

```bash
# Install env
$ python -m venv venv

# Active virtual environment(Windows)
$ venv\Scripts\activate

# Install lib requirement
$ pip install -r requirement.txt

# Run
$ python3 -m flask run --host=0.0.0.0
```


## Way 2 Build Setup in Docker

```bash
# Build
$ docker build --tag predict-disease-service  .

# Run in Windows
$ docker run -d -v %cd%:/app -p 5000:5000 --name predict-disease-service predict-disease-service

# Run in mac or linux
$ docker run -d -v ${PWD}:/app -p 5000:5000 --name predict-disease-service predict-disease-service

# Stop and Remove
$ docker container rm -f predict-disease-service
```