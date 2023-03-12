package com.yutadd.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.yutadd.CafeKounoBackApplication;
import com.yutadd.configration.MailConfig;
import com.yutadd.model.OrderDetailModel;
import com.yutadd.model.OrderModel;
import com.yutadd.model.request.ProductMap;
import com.yutadd.repository.OrderDetailRepository;
import com.yutadd.repository.OrderRepository;

import jakarta.mail.internet.MimeMessage;

@Service
public class OrderService {
	/*@Autowired
	private JavaMailSenderImpl mailSender;*///独自のメールサーバを使う際には必要
	@Autowired
	public OrderRepository oRepo;
	@Autowired
	public OrderDetailRepository odRepo;
	public  String doReserve(String name,String mail,List<ProductMap> products) {
		String reserveId=String.valueOf(new Random().nextInt());
		for (ProductMap p:products) {
			OrderDetailModel odm=new OrderDetailModel(String.valueOf(new Random().nextInt()),reserveId,p.getProduct_id(),p.getAmount());
			odRepo.save(odm);
		}
		OrderModel om=new OrderModel(name,false,reserveId,new Timestamp(System.currentTimeMillis()),false);
		oRepo.save(om);
		//メール通知を運営者に送信
		//activation用認証メール送信
		try {
			sendActivationgMail(reserveId, mail);
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		return reserveId;
	}
	private void sendActivationgMail(String orderNumber,String email_addr) throws Exception{
		//TODO:注文した商品の詳細をメールに含ませるようにする。
		JavaMailSender mailSender=MailConfig.getJavaMailSender();
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		String subject = "注文確認メール";
		String text = "以下の注文を受け取りました。\n"
				+ "注文を確定させるためには、次のページを開いてください\n"
				+ "http://"+CafeKounoBackApplication.domain+":"+CafeKounoBackApplication.port+"/activation/"+orderNumber;

		helper.setTo(email_addr);
		helper.setSubject(subject);
		helper.setText(text);
		mailSender.send(message);
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
}
