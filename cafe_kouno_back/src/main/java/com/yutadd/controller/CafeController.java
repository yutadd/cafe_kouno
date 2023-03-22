package com.yutadd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yutadd.model.ProductModel;
import com.yutadd.model.request.OrderRequestParamModel;
import com.yutadd.service.ControlService;
import com.yutadd.service.OrderService;
import com.yutadd.service.SNSService;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(value="/")
public class CafeController {
	@Autowired
	OrderService oServ;
	@Autowired
	SNSService sServ;
	@Autowired
	ControlService cServ;
	@Autowired
	private HttpSession session;
	@PostMapping(value="/order")
	public ResponseEntity<String> order(@RequestBody OrderRequestParamModel orm) {
		return ResponseEntity.ok(oServ.doReserve(orm.getName(),orm.getMail(),orm.getProducts()));
	}
	@PostMapping(value="/activation/{oid}")
	public ResponseEntity<String> activation(@PathVariable String oid) {
		return ResponseEntity.ok(oServ.doActivation(oid));
	}
	@PostMapping(value="/cancel/{oid}")
	public ResponseEntity<String> cencel(@PathVariable String oid) {
		return ResponseEntity.ok(oServ.doCancel(oid));
	}
	@GetMapping(value="/cancelable/{oid}")
	public ResponseEntity<String> cancelable(@PathVariable String oid){
		return ResponseEntity.ok(oServ.isCancelable(oid)?"true":"false");
	}
	@GetMapping(value="/orders")
	public ResponseEntity<List> orderList(){
		return ResponseEntity.ok(oServ.getOrders());
	}
	@GetMapping(value="/products")
	public ResponseEntity<List> productList(){
		return ResponseEntity.ok(oServ.getProducts());
	}
	@GetMapping(value="/igPosts")
	public ResponseEntity<List<String>> getIgPosts(){
		return ResponseEntity.ok(sServ.getPosts(1));
	}
	@GetMapping(value="/igImages")
	public ResponseEntity<List<String>> getIgImages(){
		return ResponseEntity.ok(sServ.getPosts(0));
	}
	@PostMapping(value="/login")
	public ResponseEntity<String> login(@RequestParam String password){
		System.out.println(session.getId());
		boolean result=new BCryptPasswordEncoder().matches(password,"$2a$10$P6UxHTDKh7WEayGZz0n9BO/r2nmWX9On6asKE7WIBbYN8jU9krSdy");
		session.setAttribute("login", result);

		if(result) {
			return ResponseEntity.ok("ログイン完了しました！");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ログインに失敗しました");
	}
	@GetMapping(value="/login")
	public ResponseEntity<String> getLogin(){
		System.out.println(session.getId());
		return ResponseEntity.ok((session.getAttribute("login")!=null&&(boolean)session.getAttribute("login"))?"true":"false");
	}
	@PatchMapping(value="/register")
	public ResponseEntity<String> change_drink(@RequestBody ProductModel product){
		if((boolean)session.getAttribute("login")) {
		return ResponseEntity.ok(cServ.change_drink(product));
		}else {
			return ResponseEntity.ok("ログインされていません。ログイン期限が切れている可能性があります、再度ログインしてください。");
		}
	}
}