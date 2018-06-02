package io.houseofmoran.baton;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.houseofmoran.baton.health.DefaultHealthCheck;
import io.houseofmoran.baton.resources.PlayerResource;

public class BatonApplication extends Application<BatonConfiguration> {

    public static void main(String[] args) throws Exception {
        new BatonApplication().run(args);
    }

    @Override
    public String getName() {
        return "baton";
    }

    public void initialize(Bootstrap<BatonConfiguration> bootstrap) {

    }

    @Override
    public void run(BatonConfiguration configuration,
                    Environment environment) {
        environment.jersey().register(new PlayerResource());
        environment.healthChecks().register("default", new DefaultHealthCheck());
    }
}