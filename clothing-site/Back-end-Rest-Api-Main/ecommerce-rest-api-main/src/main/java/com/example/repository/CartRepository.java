package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.MiniCart;
import com.example.model.Product;

public interface CartRepository extends JpaRepository<MiniCart, Long> {

	Optional<MiniCart> findByProductAndSize(Product product, String size);

	
}