mod utils;

extern crate base64;
extern crate nom;

use base64::encode;
use image::codecs::png::PngEncoder;
use image::imageops::resize;
use image::imageops::FilterType;
use image::ColorType;
use image::Rgba;
use nom::{
    bytes::complete::{tag, take_while_m_n},
    combinator::map_res,
    sequence::tuple,
    IResult,
};
use qrcode::QrCode;
use std::io::Write;
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

    pub fn random_as_data_uri(
        &self,
        dark_color_hex: String,
        light_color_hex: String,
    ) -> Result<String, JsValue> {
        let dark_color = hex_color(&dark_color_hex).unwrap();
        let light_color = hex_color(&light_color_hex).unwrap();
        let code = QrCode::new(b"01234567").unwrap();
        let image = code
            .render::<Rgba<u8>>()
            .dark_color(dark_color)
            .light_color(light_color)
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

fn from_hex(input: &str) -> Result<u8, std::num::ParseIntError> {
    u8::from_str_radix(input, 16)
}

fn is_hex_digit(c: char) -> bool {
    c.is_digit(16)
}

fn hex_primary(input: &str) -> IResult<&str, u8> {
    map_res(take_while_m_n(2, 2, is_hex_digit), from_hex)(input)
}

fn parse_hex_color(input: &str) -> IResult<&str, Rgba<u8>> {
    let (input, _) = tag("#")(input)?;
    let (input, (red, green, blue)) = tuple((hex_primary, hex_primary, hex_primary))(input)?;
    let alpha = 255;
    Ok((input, Rgba([red, green, blue, alpha])))
}

fn hex_color(input: &str) -> Result<Rgba<u8>, ()> {
    let (_, output) = parse_hex_color(input).unwrap();
    Ok(output)
}
