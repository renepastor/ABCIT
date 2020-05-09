#!/bin/bash

postgraphile \
  --connection postgres://localhost:5432/BDSTORE \
  --schema store \
  --host localhost \
  --port 40001 \
  --secret 123456 \
  --default-role root \
  --enhance-graphiql \
  --cors
#  --token nucleo.jwt \
#  --host localhost \
#  --host 192.168.56.101 \
