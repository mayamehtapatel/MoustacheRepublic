package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.model.MiniCart;
import com.example.service.CartService;

@RestController
@RequestMapping("/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public MiniCart createCart() {
        return cartService.createCart();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MiniCart> getCartById(@PathVariable Long id) {
        return cartService.getCartById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    
    @PostMapping("/{cartId}/products/{productId}")
    public MiniCart addProductToCart(@PathVariable Long cartId, @PathVariable Long productId, @PathVariable int Quantity) {
        return cartService.addProductToCart(cartId, productId, Quantity);
    }

    @DeleteMapping("/{cartId}/products/{productId}")
    public MiniCart removeProductFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
        return cartService.removeProductFromCart(cartId, productId);
    }
    
}
