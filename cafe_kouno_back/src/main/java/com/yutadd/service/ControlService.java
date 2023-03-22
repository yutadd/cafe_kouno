package com.yutadd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yutadd.model.ProductModel;
import com.yutadd.repository.ProductRepository;

@Service
public class ControlService {
	@Autowired
	public ProductRepository pRepo;
	public String change_drink(ProductModel target) {
		try {
			ProductModel original=pRepo.findById(target.getProductId()).get();
			pRepo.save(target);
			return "商品情報を書き換えました。";
		}catch(Exception e) {
			e.printStackTrace();
			return "該当する商品は見つかりませんでした。指定したIDが存在するかもう一度ご確認ください。";
		}
	}
}
