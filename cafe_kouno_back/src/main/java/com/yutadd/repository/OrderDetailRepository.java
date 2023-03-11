package com.yutadd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yutadd.model.OrderDetailModel;

import lombok.experimental.Tolerate;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailModel, String>{

}
