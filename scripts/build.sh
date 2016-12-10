#!/bin/bash
(
    rm -rf build
    mkdir build
    cp src/index.html build/index.html
    node_modules/webpack/bin/webpack.js
)
