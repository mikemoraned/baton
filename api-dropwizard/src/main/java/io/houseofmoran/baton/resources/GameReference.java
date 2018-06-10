package io.houseofmoran.baton.resources;

import com.fasterxml.jackson.annotation.JsonCreator;
import io.houseofmoran.baton.model.IGameReference;

public class GameReference implements IGameReference {
    private String id;

    @JsonCreator
    public GameReference() {

    }

    public GameReference(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
