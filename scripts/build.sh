#!/bin/bash
(
    rm -rf docs
    mkdir docs
    cp src/index.html docs/index.html
    node_modules/webpack/bin/webpack.js
)
