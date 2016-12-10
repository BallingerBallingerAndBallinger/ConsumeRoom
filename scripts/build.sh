#!/bin/bash
(
    rm -rf docs
    mkdir docs
    cp assets/* docs/
    node_modules/webpack/bin/webpack.js
)
