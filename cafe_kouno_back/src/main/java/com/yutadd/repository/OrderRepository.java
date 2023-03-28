package com.yutadd.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yutadd.model.OrderModel;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, String>{
	List<OrderModel> findByOrderId(String orderId);
	List<OrderModel> findAllByDeletedFalseAndCancelledFalseAndValidTrue(Pageable pageable);
	List<OrderModel> findAllByDeletedFalse(Pageable pageable);
	List<OrderModel> findAllByDeletedTrue(Pageable pageable);
	List<OrderModel> findAllByCancelledTrue();
	List<OrderModel> findAllByFilledTrue();
	List<OrderModel> findByValidIsFalseAndReserveDateBefore(Timestamp time);
}
