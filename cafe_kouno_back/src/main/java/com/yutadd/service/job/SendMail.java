package com.yutadd.service.job;

import java.util.List;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import com.yutadd.CafeKounoBackApplication;
import com.yutadd.configration.MailConfig;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

public class SendMail {
	public static void sendMail(String orderNumber,String email_addr,List<String> product_names) throws
	MessagingException{
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

}
