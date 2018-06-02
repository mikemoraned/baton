package io.houseofmoran.baton.resources;

import com.codahale.metrics.annotation.Timed;
import io.houseofmoran.baton.model.Player;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/players")
@Produces(MediaType.APPLICATION_JSON)
public class PlayerResource {
    @Path("/playerA")
    @GET
    @Timed
    public Player sayHello() {
        return new Player("playerA");
    }
}


