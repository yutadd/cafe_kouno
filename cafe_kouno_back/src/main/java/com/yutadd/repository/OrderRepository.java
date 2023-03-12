package com.yutadd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yutadd.model.OrderModel;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, String>{
	List<OrderModel> findByOrderId(String orderId);
	List<OrderModel> findAllByValidTrue();
}
