package com.yutadd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CafeKounoBackApplication {

	//アクティベーションを行うためのページ（将来的にフロントエンド）のアドレスとポート
public static String domain="yutadd.com";
public static int port=3000;

	public static void main(String[] args) {
		SpringApplication.run(CafeKounoBackApplication.class, args);
	}

}
