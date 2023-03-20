package com.yutadd.service.job;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.yutadd.CafeKounoBackApplication;
import com.yutadd.configration.MailConfig;
import com.yutadd.model.ProductModel;
import com.yutadd.model.request.ProductMap;
import com.yutadd.repository.ProductRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
@Service
public class SendMail {
	@Autowired
	public ProductRepository pRepo;
	public void sendMail(String orderNumber,String email_addr,List<ProductMap> product_names) throws
	MessagingException{
		//TODO:注文した商品の詳細をメールに含ませるようにする。
		JavaMailSender mailSender=MailConfig.getJavaMailSender();
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		String subject = "【カフェ向野】注文確認メール";
		String text = "以下の注文を承りました。\n"
				+ "注文を確定させるためには、次のページを開いてください\n"
				+ "http://"+CafeKounoBackApplication.domain+":"+CafeKounoBackApplication.port+"/activation/"+orderNumber+"\n"
				+"※もしこのメールに身に覚えのない場合、リンクをクリックせず、このメールを破棄してください。"
				+"\n注文内容はこちらになります";
		int sum=0;
		for(ProductMap pm:product_names) {
			ProductModel product=pRepo.findById(pm.getProduct_id()).get();
			int price=-1;
			switch(pm.getSize()) {
			case "S":
				price=product.getPrice()*pm.getAmount();
				break;
			case "M":
				price=product.getPriceM()*pm.getAmount();
				break;
			case "L":
				price=product.getPriceL()*pm.getAmount();
				break;
			}
			text+="\n"+product.getProductName()+" "+pm.getSize()+" x "+pm.getAmount()+" 小計 ￥"+price;
			sum+=price;
		}
		text+="\n合計 ￥"+sum;
		text+="\n注文をキャンセルするにはこのリンクをクリックしてください";
		text+="\n※ご注文のされた商品の準備が整った後のキャンセルは致しかねますのでご了承ください。";
		text+="\n"+"http://"+CafeKounoBackApplication.domain+":"+CafeKounoBackApplication.port+"/cancel/"+orderNumber+"\n";
		helper.setTo(email_addr);
		helper.setSubject(subject);
		helper.setText(text);
		mailSender.send(message);
	}

}
