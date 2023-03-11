package com.yutadd.model;

import java.sql.Timestamp;

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
	private String order_id;
	private Timestamp reserve_date;
	private boolean isfilled;
	@Tolerate
	public OrderModel() {}
}
