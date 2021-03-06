mod hex_color;
mod utils;

extern crate base64;
extern crate nom;

use base64::encode;
use hex_color::hex_color;
use image::codecs::png::PngEncoder;
use image::imageops::resize;
use image::imageops::FilterType;
use image::ColorType;
use image::Rgba;

use qrcode::QrCode;
use std::io::Write;
use wasm_bindgen::prelude::*;
use web_sys::console;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const VERSION: &str = env!("CARGO_PKG_VERSION");

#[wasm_bindgen]
pub struct QrCodeGenerator {
    width: usize,
    height: usize,
}

#[wasm_bindgen]
impl QrCodeGenerator {
    pub fn new(width: usize, height: usize) -> Self {
        console_error_panic_hook::set_once();
        console::log_1(&format!("QrCodeGenerator version {}", VERSION).into());
        QrCodeGenerator { width, height }
    }

    pub fn as_data_uri(
        &self,
        foreground_color_hex: String,
        background_color_hex: String,
    ) -> Result<String, JsValue> {
        let foreground_color = hex_color(&foreground_color_hex).unwrap();
        let background_color = hex_color(&background_color_hex).unwrap();
        let message = format!("{}-{}", background_color_hex, foreground_color_hex);
        let code = QrCode::new(message.into_bytes()).unwrap();
        let image = code
            .render::<Rgba<u8>>()
            .dark_color(foreground_color)
            .light_color(background_color)
            .max_dimensions(self.width as u32, self.height as u32)
            .build();
        let rescaled_image = resize(
            &image,
            self.width as u32,
            self.height as u32,
            FilterType::Nearest,
        );
        let mut bytes: Vec<u8> = Vec::new();
        let encoder = PngEncoder::new(bytes.by_ref());
        encoder
            .encode(
                &rescaled_image.into_vec(),
                self.width as u32,
                self.height as u32,
                ColorType::Rgba8,
            )
            .unwrap();

        let data_uri = format!("data:image/png;base64,{}", encode(&bytes));

        Ok(data_uri)
    }
}
