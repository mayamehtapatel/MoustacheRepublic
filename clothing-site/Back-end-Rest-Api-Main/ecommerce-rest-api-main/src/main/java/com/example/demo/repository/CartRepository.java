package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.MiniCart;

public interface CartRepository extends JpaRepository<MiniCart, Long> {
}