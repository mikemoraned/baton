mod utils;

use image::imageops::resize;
use image::imageops::FilterType;
use image::Rgba;
use qrcode::QrCode;
use wasm_bindgen::prelude::*;
use wasm_bindgen::Clamped;
use web_sys::console;
use web_sys::ImageData;

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

    pub fn random(&self) -> Result<ImageData, JsValue> {
        let code = QrCode::new(b"01234567").unwrap();
        let image = code
            .render::<Rgba<u8>>()
            .max_dimensions(self.width as u32, self.height as u32)
            .build();
        console::log_1(
            &format!(
                "qr code image dimensions: {}x{}",
                image.width(),
                image.height()
            )
            .into(),
        );
        let rescaled_image = resize(
            &image,
            self.width as u32,
            self.height as u32,
            FilterType::Nearest,
        );
        let mut pixels = rescaled_image.into_vec();
        console::log_1(&format!("pixels length: {}", pixels.len()).into());
        ImageData::new_with_u8_clamped_array_and_sh(
            Clamped(&mut pixels),
            self.width as u32,
            self.height as u32,
        )
    }
}
