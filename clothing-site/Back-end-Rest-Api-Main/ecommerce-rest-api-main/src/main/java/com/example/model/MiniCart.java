package com.example.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;




@Getter
@Setter
@Entity
@Table(name = "cart_items")
public class MiniCart {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private String size;
    private int quantity;
    
    private Long productId;

    
	
}
