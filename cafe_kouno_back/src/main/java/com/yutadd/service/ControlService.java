package com.yutadd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.yutadd.model.ProductModel;
import com.yutadd.repository.ProductRepository;

@Service
public class ControlService {
	@Autowired
	public ProductRepository pRepo;

	public String change_drink(ProductModel target) {
		try {
			ProductModel original = pRepo.findById(target.getProductId()).get();
			pRepo.save(target);
			return "商品情報を書き換えました。";
		} catch (Exception e) {
			e.printStackTrace();
			return "該当する商品は見つかりませんでした。指定したIDが存在するかもう一度ご確認ください。";
		}
	}

	public String register_drink(ProductModel target) {
		if (!pRepo.existsById(target.getProductId())) {
			pRepo.save(target);
		} else {
			return "すでに同じIDの商品が存在します。";
		}
		return "商品を登録しました";
	}

	public String delProduct(String target) {
		if (pRepo.existsById(target)) {
			pRepo.deleteById(target);
			return "商品を削除しました。";
		} else {
			return "存在しない商品IDです。";
		}
	}

	public ResponseEntity<String> getProduct(String pid) {
		try {
			ProductModel original = pRepo.findById(pid).get();
			return ResponseEntity.ok(new Gson().toJson(original));
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("bad_request");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("IDが見つかりません");
		}
	}
}
