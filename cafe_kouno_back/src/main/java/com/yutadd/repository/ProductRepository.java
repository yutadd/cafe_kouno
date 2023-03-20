package com.yutadd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yutadd.model.ProductModel;

public interface ProductRepository  extends JpaRepository<ProductModel, String>{

}
