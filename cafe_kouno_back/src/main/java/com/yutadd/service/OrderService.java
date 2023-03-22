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
			return "エラーが発生しました。(メールの送信ができませんでした。)";
		}
		return "ご注文を承りました。";
	}
	public String doActivation(String oid) {
		try {
			OrderModel order =oRepo.findById(oid).get();
			if(!order.isValid()) {
				order.setValid(true);
				oRepo.save(order);
				return "ご注文のアクティベーションを完了しました";
			}else {
				return "このご注文はすでにアクティベーションされています。";
			}

		}catch(Exception e) {
			return "指定されたご注文が見つかりません。urlに間違いがないかご確認ください。問題が再発する場合、その旨を連絡していただけると助かります。";
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
	public String doCancel(String oid) {
		try {
			OrderModel order =oRepo.findById(oid).get();
			if(!order.isReady()) {
				if(!order.isFilled()) {
				order.setCancelled(true);
				oRepo.save(order);
				return "ご注文をキャンセルいたしました。";
				}else {
					return "ご注文の品はすでにお渡しいたしました。";
				}
			}else {
				return "ご注文の品はすでに準備が整っているため、キャンセルいただけません。";
			}
		}catch(Exception e) {
			e.printStackTrace();
			return "指定されたご注文が見つかりません。urlに間違いがないかご確認ください。問題が再発する場合、その旨を連絡していただけると助かります。";
		}
	}
	public List<OrderModel> getOrders(){
		return oRepo.findAllByValidTrue();
	}
	public List<ProductModel> getProducts(){
		return pRepo.findAll();
	}
}
