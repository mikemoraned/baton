package io.houseofmoran.baton.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Player implements IPlayerReference {
    private String id;
    private IGameReference[] gameReferences;

    @JsonCreator
    public Player() {

    }

    public Player(String id, IGameReference[] gameReferences) {
        this.id = id;
        this.gameReferences = gameReferences;
    }

    public String getId() {
        return id;
    }

    @JsonProperty
    public IGameReference[] getGames() {
        return gameReferences;
    }
}
