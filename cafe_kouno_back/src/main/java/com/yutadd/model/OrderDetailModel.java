package com.yutadd.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;

@Entity
@Table(name="order_details")
@AllArgsConstructor
@Getter
@Setter
public class OrderDetailModel {
	@Id
	private String order_detail_id;
	private String order_id;
	private String product_id;
	private int amount;
	@Tolerate
	public OrderDetailModel() {}
}
