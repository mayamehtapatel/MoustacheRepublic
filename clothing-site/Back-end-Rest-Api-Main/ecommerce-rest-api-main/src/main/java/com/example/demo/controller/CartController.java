package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.MiniCart;
import com.example.demo.service.CartService;



@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public MiniCart createCart(@RequestBody MiniCart cart) {
        return cartService.createCart(cart);
    }

    @GetMapping("/{id}")
    public MiniCart getCart(@PathVariable Long id) {
        return cartService.getCart(id);
    }

    @PutMapping("/{id}")
    public MiniCart updateCart(@PathVariable Long id, @RequestBody MiniCart cart) {
        return cartService.updateCart(id, cart);
    }

    @DeleteMapping("/{id}")
    public void deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
    }
}