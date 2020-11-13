mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const VERSION: &str = env!("CARGO_PKG_VERSION");

#[wasm_bindgen]
pub struct QrCodeGenerator {
    width: u8,
    height: u8,
}

#[wasm_bindgen]
impl QrCodeGenerator {
    pub fn new(width: u8, height: u8) -> Self {
        console_error_panic_hook::set_once();
        use web_sys::console;
        console::log_1(&format!("QrCodeGenerator version {}", VERSION).into());
        QrCodeGenerator { width, height }
    }
}
