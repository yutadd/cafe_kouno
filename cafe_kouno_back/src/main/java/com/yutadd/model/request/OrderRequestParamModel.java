package com.yutadd.model.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequestParamModel {
	private String name;
	private String mail;
	private List<ProductMap> products;
}
