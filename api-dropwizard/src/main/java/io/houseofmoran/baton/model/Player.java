package io.houseofmoran.baton.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Player {
    private String id;

    public Player() {

    }

    public Player(String id) {
        this.id = id;
    }

    @JsonProperty
    public String getId() {
        return id;
    }
}
