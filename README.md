# wnucheck-mvp
WnuCheck MVP

## Backend Setup

To run this project, you need to configure environment variables.

### 1. Create a `.env` File

If you don't have it, copy the example `simple.env` file to a new file named `.env`:

```bash
# /src/backend/
cp simple.env .env
```

### 2. Set up a Virtual Environment

Create a new virtual environment:

```bash
# /src/backend/
python3 -m venv backend_venv
source backend_venv/bin/activate
pip install -r requirements.txt
```

### 3. Run the Project

To run the fastapi server, you can use the following command:

```bash
# /src/backend/
uvicorn main:app --reload --port 8000
```

### 4. Access the API

The API is available at `http://127.0.0.1:8000` \
You can access the SwaggerUI at `http://127.0.0.1:8000/docs` (you can test the API here)

## Clear the project

To clear the project, you can delete the virtual environment and the `.env` file:

```bash
# /src/backend
deactivate
rm -rf backend_venv
rm -f .env
```
