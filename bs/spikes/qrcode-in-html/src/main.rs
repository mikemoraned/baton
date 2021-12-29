use actix_web::{web, App, HttpResponse, HttpServer, Responder};

markup::define! {
    Home<'a>(title: &'a str) {
        @markup::doctype()
        html {
            head {
                title { @title }
                style {
                    "body { background: #fafbfc; }"
                    "#main { padding: 2rem; }"
                }
            }
            body {
                @Header { title }
                #main {
                    p {
                        "This domain is for use in illustrative examples in documents. You may \
                        use this domain in literature without prior coordination or asking for \
                        permission."
                    }
                    p {
                        a[href = "https://www.iana.org/domains/example"] {
                            "More information..."
                        }
                    }
                }
                @Footer { year: 2020 }
            }
        }
    }

    Header<'a>(title: &'a str) {
        header {
            h1 { @title }
        }
    }

    Footer(year: u32) {
        footer {
            "(c) " @year
        }
    }
}

async fn greet() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html")
        .body(format!("{}",
            Home {
                title: "Example Domain"
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