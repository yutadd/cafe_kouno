package com.yutadd.service;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	/*
	 * @Autowired private JavaMailSenderImpl mailSender;
	 */// 独自のメールサーバを使う際には必要
	@Autowired
	public OrderRepository oRepo;
	@Autowired
	public ProductRepository pRepo;
	@Autowired
	public OrderDetailRepository odRepo;
	@Autowired
	public SendMail smServ;

	public String doReserve(String name, String mail, List<ProductMap> products) {
		String reserveId = String.valueOf(new Random().nextInt());
		for (ProductMap p : products) {
			OrderDetailModel odm = new OrderDetailModel(String.valueOf(new Random().nextInt()), reserveId, p.getSize(),
					p.getProduct_id(), p.getAmount());
			odRepo.save(odm);
		}
		OrderModel om = new OrderModel(name, false, reserveId, new Timestamp(System.currentTimeMillis()), false, false,
				false, false, mail);
		oRepo.save(om);
		try {
			smServ.sendMail(reserveId, mail, products);
		} catch (Exception e) {
			e.printStackTrace();
			return "エラーが発生しました。(メールの送信ができませんでした。)";
		}
		return "ご注文を承りました。";
	}

	public String doActivation(String oid) {
		try {
			OrderModel order = oRepo.findById(oid).get();
			if (!order.isValid()) {
				order.setValid(true);
				oRepo.save(order);
				return "ご注文のアクティベーションを完了しました";
			} else {
				return "このご注文はすでにアクティベーションされています。";
			}

		} catch (Exception e) {
			return "指定されたご注文が見つかりません。urlに間違いがないかご確認ください。問題が再発する場合、その旨を連絡していただけると助かります。";
		}
	}

	public boolean isCancelable(String oid) {
		try {
			if (oRepo.findById(oid).get().isReady()) {
				return false;
			}
		} catch (Exception e) {
			System.out.println("no such record id like " + oid + " so can't tell can or not.");
			return false;
		}
		return true;
	}

	public String doCancel(String oid) {
		try {
			OrderModel order = oRepo.findById(oid).get();
			if (!order.isReady()) {
				if (!order.isFilled()) {
					order.setCancelled(true);
					oRepo.save(order);
					return "ご注文をキャンセルいたしました。";
				} else {
					return "ご注文の品はすでにお渡しいたしました。";
				}
			} else {
				return "ご注文の品はすでに準備が整っているため、キャンセルいただけません。";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "指定されたご注文が見つかりません。urlに間違いがないかご確認ください。問題が再発する場合、その旨を連絡していただけると助かります。";
		}
	}

	/**
	 * 0:有効かつキャンセルされていないもの 1:すべて(削除されていないもの) 2:削除されたもの
	 */
	public ResponseEntity<List<OrderModel>> getOrders(int mode, int page) {
		Pageable pageable = PageRequest.of(page, 20, Sort.by("reserveDate").ascending());
		if (mode == 0) {
			return ResponseEntity.ok(oRepo.findAllByDeletedFalseAndCancelledFalseAndValidTrue(pageable));
		} else if (mode == 1) {
			return ResponseEntity.ok(oRepo.findAllByDeletedFalse(pageable));
		} else if (mode == 2) {
			return ResponseEntity.ok(oRepo.findAllByDeletedTrue(pageable));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<OrderModel>());
		}
	}

	public ResponseEntity<List<OrderDetailModel>> getOrderDetail(String id) {
		try {
			System.out.println(id);
			return ResponseEntity.ok(odRepo.findAllByOrderId(id));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<OrderDetailModel>());
		}
	}

	/**
	 * 0:キャンセルされたもの 1:filledされたもの 2:注文から30分間以上有効化されなかったもの
	 */
	public ResponseEntity<String> delOrders(int mode) {
		if (mode == 0) {
			List<OrderModel> targets = oRepo.findAllByCancelledTrue();
			for (OrderModel target : targets) {
				target.setDeleted(true);
				oRepo.save(target);
			}
			return ResponseEntity.ok("Delete success");
		} else if (mode == 1) {
			List<OrderModel> targets = oRepo.findAllByFilledTrue();
			for (OrderModel target : targets) {
				target.setDeleted(true);
				oRepo.save(target);
			}
			return ResponseEntity.ok("Delete success");
		} else if (mode == 2) {
			List<OrderModel> targets = oRepo.findByValidIsFalseAndReserveDateBefore(
					Timestamp.from(Instant.now().minus(Duration.ofMinutes(30))));
			for (OrderModel target : targets) {
				target.setDeleted(true);
				oRepo.save(target);
			}
			return ResponseEntity.ok("Delete success");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("requested mode was not found");
		}

	}

	public List<ProductModel> getProducts() {
		return pRepo.findAll();
	}

	public ResponseEntity<String> readyOrder(String[] targets) {
		try {
			for (String id : targets) {
				OrderModel om = oRepo.findById(id).get();
				if (om.isReady()) {
					om.setReady(false);
					oRepo.save(om);
				} else {
					om.setReady(true);
					oRepo.save(om);
				}
			}
			return ResponseEntity.ok("商品のreadyを変更しました");
		} catch (Exception e) {
			System.out.println("存在しないIDを参照");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("存在しないID");
		}

	}

	public ResponseEntity<String> fillOrder(String[] targets) {
		try {
			for (String id : targets) {
				OrderModel om = oRepo.findById(id).get();
				if (om.isFilled()) {
					om.setFilled(false);
					oRepo.save(om);
				} else {
					om.setFilled(true);
					oRepo.save(om);
				}
			}
			return ResponseEntity.ok("商品のfilledを変更しました");
		} catch (Exception e) {
			System.out.println("存在しないIDを参照");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("存在しないID");
		}

	}
	public ResponseEntity<String> deleteOrder(String[] targets) {
		try {
			for (String id : targets) {
				OrderModel om = oRepo.findById(id).get();
				if (om.isDeleted()) {
					om.setDeleted(false);
					oRepo.save(om);
				} else {
					om.setDeleted(true);
					oRepo.save(om);
				}
			}
			return ResponseEntity.ok("商品のdeletedを変更しました");
		} catch (Exception e) {
			System.out.println("存在しないIDを参照");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("存在しないID");
		}

	}
}
