package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.MiniCart;
import com.example.model.Product;
import com.example.repository.CartRepository;
import com.example.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public MiniCart createCart() {
        return cartRepository.save(new MiniCart());
    }

    public Optional<MiniCart> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    public List<MiniCart> getCartItems() {
        return cartRepository.findAll();
    }

    public MiniCart addProductToCart(Long cartId, Long productId, int quantity) {
        Optional<MiniCart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            MiniCart cart = optionalCart.get();
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            MiniCart cartItem = new MiniCart();
            cartItem.setProductId(productId);
            cartItem.setQuantity(quantity);
           
            return cartRepository.save(cart);
        } else {
            throw new RuntimeException("Cart not found");
        }
    }
//    public MiniCart addToCart(Long productId, String size) {
//        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
//        MiniCart cartItem = cartRepository.findByProductAndSize(product, size).orElse(new MiniCart());
////        cartItem.setProduct(product);
////        cartItem.setSize(size);
////        cartItem.setQuantity(cartItem.getQuantity() + 1);
//        return cartRepository.save(cartItem);
//    }

    public MiniCart removeProductFromCart(Long cartId, Long productId) {
        MiniCart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        
        return cartRepository.save(cart);
    }
}
