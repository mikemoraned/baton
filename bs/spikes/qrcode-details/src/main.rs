use qrcode_generator::QrCodeEcc;

fn main() {
    let message = "Hello world";

    let result: Vec<Vec<bool>> = qrcode_generator::to_matrix(message, QrCodeEcc::High).unwrap();

    for row in result.iter() {
        let rendered_row : String = row.iter().map( |item| {
            if *item {
                '#'
            }
            else {
                ' '
            }
        }).collect();
        println!("{}", rendered_row);
    }
}
