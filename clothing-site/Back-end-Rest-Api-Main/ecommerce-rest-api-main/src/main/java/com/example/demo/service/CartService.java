package com.example.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.MiniCart;
import com.example.demo.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public MiniCart createCart(MiniCart cart) {
        return cartRepository.save(cart);
    }

    public MiniCart getCart(Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    public MiniCart updateCart(Long id, MiniCart cart) {
        cart.setId(id);
        return cartRepository.save(cart);
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }
}