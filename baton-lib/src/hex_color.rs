use image::Rgba;
use nom::{
    bytes::complete::{tag, take_while_m_n},
    combinator::map_res,
    sequence::tuple,
    IResult,
};

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

pub fn hex_color(input: &str) -> Result<Rgba<u8>, ()> {
    let (_, output) = parse_hex_color(input).unwrap();
    Ok(output)
}
