package com.yutadd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yutadd.model.OrderDetailModel;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailModel, String>{
	List<OrderDetailModel> findAllByOrderId(String id);
}
