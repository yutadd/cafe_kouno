package com.yutadd.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yutadd.model.OrderDetailModel;
import com.yutadd.model.OrderModel;
import com.yutadd.model.ProductModel;
import com.yutadd.model.request.ProductMap;
import com.yutadd.repository.OrderDetailRepository;
import com.yutadd.repository.OrderRepository;
import com.yutadd.repository.ProductRepository;
import com.yutadd.service.job.SendMail;

@Service
public class OrderService {
	/*@Autowired
	private JavaMailSenderImpl mailSender;*///独自のメールサーバを使う際には必要
	@Autowired
	public OrderRepository oRepo;
	@Autowired
	public ProductRepository pRepo;
	@Autowired
	public OrderDetailRepository odRepo;
	@Autowired
	public SendMail smServ;
	public  String doReserve(String name,String mail,List<ProductMap> products) {
		String reserveId=String.valueOf(new Random().nextInt());
		for (ProductMap p:products) {
			OrderDetailModel odm=new OrderDetailModel(String.valueOf(new Random().nextInt()),reserveId,p.getSize(),p.getProduct_id(),p.getAmount());
			odRepo.save(odm);
		}
		OrderModel om=new OrderModel(name,false,reserveId,new Timestamp(System.currentTimeMillis()),false,false,false);
		oRepo.save(om);
		try {
			smServ.sendMail(reserveId, mail,products);
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		return reserveId;
	}
	public boolean doActivation(String oid) {
		try {
			OrderModel order =oRepo.findById(oid).get();
			order.setValid(true);
			oRepo.save(order);
			return true;
		}catch(Exception e) {
			return false;
		}
	}
	public boolean isCancelable(String oid) {
		try {
		if(oRepo.findById(oid).get().isReady()) {
			return false;
		}
		}catch(Exception e) {
			System.out.println("no such record id like "+oid+" so can't tell can or not.");
			return false;
		}
		return true;
	}
	public boolean doCancel(String oid) {
		OrderModel order =oRepo.findById(oid).get();
		order.setCancelled(true);
		oRepo.save(order);
		return true;
	}
	public List<OrderModel> getOrders(){
		return oRepo.findAllByValidTrue();
	}
	public List<ProductModel> getProducts(){
		return pRepo.findAll();
	}
}
