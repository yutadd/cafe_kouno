package com.yutadd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CafeKounoBackApplication {

	//アクティベーションを行うためのページ（フロントエンド）のアドレスとポート
public static String domain="localhost";
public static int port=80;

	public static void main(String[] args) {
		SpringApplication.run(CafeKounoBackApplication.class, args);
	}

}
