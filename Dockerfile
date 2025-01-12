FROM node:20

RUN apt update 
RUN apt install python3-pip uvicorn python3.11-venv dotenv -y 

COPY frontend/package.json  frontend/package-lock.json ./
RUN npm install
COPY frontend/. ./frontend/.
RUN npm run build --prefix ./frontend/

COPY pyproject.toml ./
COPY src/backend/. ./src/backend/.
COPY simple.env ./.env
COPY run.sh ./run.sh

RUN python3 -m venv backend_venv
ENV PATH="/backend_venv/bin:$PATH"
RUN . backend_venv/bin/activate
RUN python3 -m pip install --upgrade pip setuptools
RUN python3 -m pip install -e . -v

EXPOSE 3000
EXPOSE 8000

CMD ./run.sh
