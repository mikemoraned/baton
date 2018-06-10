package io.houseofmoran.baton.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface IReference {
    @JsonProperty
    String getId();
}
