package io.houseofmoran.baton.health;

import com.codahale.metrics.health.HealthCheck;

public class DefaultHealthCheck extends HealthCheck {
    @Override
    protected Result check() {
        return Result.healthy();
    }
}
