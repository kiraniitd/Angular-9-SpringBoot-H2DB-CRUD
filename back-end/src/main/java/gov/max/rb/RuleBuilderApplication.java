package gov.max.rb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
@EnableAutoConfiguration
public class RuleBuilderApplication {

	public static void main(String[] args) {
		SpringApplication.run(RuleBuilderApplication.class, args);
	}

}

