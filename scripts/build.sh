#!/bin/bash
(
    rm -rf docs
    mkdir docs
    cp -R assets/* docs/
    node_modules/webpack/bin/webpack.js
)
