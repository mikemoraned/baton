# Baton Lib

## Building

Basic:

    wasm-pack build --scope mike_moran

Optimised:

    wasm-pack build --scope mike_moran --release

Note: currently released version of wasm-pack has an issue (https://github.com/rustwasm/wasm-pack/issues/837#issuecomment-652464912) which means you need to manually add `"baton_lib_bg.js",` to the `package.json` file after every build :-/ .

## Testing

    wasm-pack test --node
    cargo test

## Sharing locally

In current dir:

    cd pkg
    npm link

Elsewhere, where we want to use the locally published version:

    npm link @mike_moran/baton-lib

## Publishing

    npm login # only needed if not already logged in
    cd pkg
    wasm-pack publish --access=public
