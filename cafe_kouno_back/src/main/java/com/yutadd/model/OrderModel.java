package com.yutadd.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.Tolerate;

@Entity
@Table(name="orders")
@AllArgsConstructor
@Getter
@Setter
public class OrderModel {
	private String name;
	private boolean valid;
	@Id
	@Column(name="order_id")
	private String orderId;
	@Column(name="reserve_date")
	private Timestamp reserveDate;
	private boolean filled;
	private boolean cancelled;
	private boolean ready;
	@Tolerate
	public OrderModel() {}
}
