#!/bin/bash

npm start --prefix ./frontend &

uvicorn backend.main:app --reload --port 8000 &

wait -n

exit $?
