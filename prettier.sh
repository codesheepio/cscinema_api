#!/bin/zsh
prettier  --single-quote --trailing-comma es5 --no-semi --write "./client/**/*.js"
prettier  --single-quote --trailing-comma es5 --no-semi --write "./server/**/*.js"