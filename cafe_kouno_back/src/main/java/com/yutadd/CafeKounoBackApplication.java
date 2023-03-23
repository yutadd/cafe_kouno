package com.yutadd;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CafeKounoBackApplication implements CommandLineRunner {
	public static String domain = "ws-hackathon2023-teams01.pencilsystems.site";
	public static int port = 80;

	public static void main(String[] args) {
		SpringApplication.run(CafeKounoBackApplication.class, args);
	}

	@Override
	public void run(String... args) {
		System.out.println(new BCryptPasswordEncoder().encode("P@ssw0rd"));
	}
}
