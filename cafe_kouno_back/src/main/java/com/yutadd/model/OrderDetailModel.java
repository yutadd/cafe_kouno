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
@Table(name="order_details")
@AllArgsConstructor
@Getter
@Setter
public class OrderDetailModel {
	@Id
	@Column(name="order_detail_id")
	private String orderDetailId;
	@Column(name="order_id")
	private String orderId;
	@Column(name="product_id")
	private String productId;
	private int amount;
	@Tolerate
	public OrderDetailModel() {}
}
