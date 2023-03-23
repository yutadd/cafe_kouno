package com.yutadd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yutadd.model.ProductModel;
import com.yutadd.model.request.OrderRequestParamModel;
import com.yutadd.service.ControlService;
import com.yutadd.service.OrderService;
import com.yutadd.service.SNSService;

import jakarta.servlet.http.HttpSession;


@RestController
@CrossOrigin(origins = "http://ws-hackathon2023-teams01.pencilsystems.site/", allowCredentials = "true",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PATCH,RequestMethod.OPTIONS,RequestMethod.DELETE})
@RequestMapping(value="/")
public class CafeController {
	@Autowired
	OrderService oServ;
	@Autowired
	SNSService sServ;
	RequestMethod[] methods=RequestMethod.values();
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
		boolean result=new BCryptPasswordEncoder().matches(password,System.getenv("CAFE_KOUNO_PASSWORD"));
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
	@PatchMapping(value="/update")
	public ResponseEntity<String> changeDrink(@RequestBody ProductModel product){
		if(session.getAttribute("login")!=null&&(boolean)session.getAttribute("login")) {
			return ResponseEntity.ok(cServ.change_drink(product));
		}else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ログインされていません。ログイン期限が切れている可能性があります、再度ログインしてください。");
		}
	}
	@PostMapping(value="/register")
	public ResponseEntity<String> registerDrink(@RequestBody ProductModel product){
		if(session.getAttribute("login")!=null&&(boolean)session.getAttribute("login")) {
			return ResponseEntity.ok(cServ.register_drink(product));
		}else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ログインされていません。ログイン期限が切れている可能性があります、再度ログインしてください。");
		}
	}
	@GetMapping(value="/product/{pid}")
	public ResponseEntity<String> getProduct(@PathVariable String pid){
		return cServ.getProduct(pid);
	}
	@DeleteMapping(value="/delete")
	public ResponseEntity<String> delProduct(@RequestParam String id){
		if(session.getAttribute("login")!=null&&(boolean)session.getAttribute("login")) {
			return  ResponseEntity.ok(cServ.delProduct(id));
		}else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ログインされていません。ログイン期限が切れている可能性があります、再度ログインしてください。");
		}
	}

}