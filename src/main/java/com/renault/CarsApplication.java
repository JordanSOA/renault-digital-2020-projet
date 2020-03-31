package com.renault;

import com.renault.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CarsApplication extends SpringBootServletInitializer {

    @Autowired
    private ApplicationService applicationService;

    public static void main(String[] args) {
        SpringApplication.run(CarsApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            applicationService.deleteAll();
            applicationService.insertData();
        };
    }

}
