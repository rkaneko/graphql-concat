#!/bin/bash -eu

BASE_DIR=$(dirname $0)
cd ${BASE_DIR}/..

if [[ "`$(npm bin)/prettier -l 'src/**/*.ts' | wc -l`" -ne "0" ]]; then exit 1; else exit 0; fi
