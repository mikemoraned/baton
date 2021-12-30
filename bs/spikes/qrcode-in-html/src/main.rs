use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use qrcode_generator::QrCodeEcc;

markup::define! {
    Home<'a>(filled: &'a Vec<Vec<bool>>) {
        @markup::doctype()
        html {
            head {
                // style {
                //     "body { background: #fafbfc; }"
                //     "#main { padding: 2rem; }"
                // }
            }
            body {
                div {
                    @for row in filled.iter() {
                        div {
                            @for entry in row.iter() {
                                @if *entry {
                                    span.filled { "#" }
                                }
                                else {
                                    span.empty { " "}
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

async fn greet() -> impl Responder {
    let message = "Hello world";

    let filled: Vec<Vec<bool>> = qrcode_generator::to_matrix(message, QrCodeEcc::High).unwrap();
    HttpResponse::Ok()
        .content_type("text/html")
        .body(format!("{}",
            Home {
                filled: &filled
            }
        ))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(greet))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}