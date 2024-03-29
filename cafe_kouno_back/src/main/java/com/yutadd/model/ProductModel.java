package com.yutadd.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;

@Entity
@Table(name="products")
@AllArgsConstructor
@Getter
@Setter
public class ProductModel {
	@Id
	@Column(name="product_id")
	private String productId;
	@Column(name="product_name")
	private String productName;
	@Column(name="price")
	private int price;
	@Column(name="pricem")
	private int priceM;
	@Column(name="pricel")
	private int priceL;
	@Column(name="text")
	private String text;
	@Column(name="drink")
	private boolean drink;
	@Column(name="category")
	private String category;
	@Tolerate
	public ProductModel() {}
}
