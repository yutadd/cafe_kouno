package com.yutadd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yutadd.model.request.OrderRequestParamModel;
import com.yutadd.service.OrderService;

@RestController
@RequestMapping(value="/")
public class CafeController {
	@Autowired
	OrderService oServ;
	@PostMapping(value="/order")
	public ResponseEntity<String> order(@RequestBody OrderRequestParamModel orm) {
		String oid=oServ.doReserve(orm.getName(),orm.getMail(),orm.getProducts());
		if(oid!=null) {
			return ResponseEntity.ok("sent activation email");
		}else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error occured");
		}
	}
	@PostMapping(value="/activation/{oid}")
	public HttpStatus activation(@PathVariable String oid) {
		if(oServ.doActivation(oid)) {
			return HttpStatus.OK;
		}
		return HttpStatus.BAD_REQUEST;
	}
}