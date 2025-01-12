#!/bin/bash

npm run dev &

uvicorn backend.main:app --reload --port 8000 &

wait -n

exit $?
