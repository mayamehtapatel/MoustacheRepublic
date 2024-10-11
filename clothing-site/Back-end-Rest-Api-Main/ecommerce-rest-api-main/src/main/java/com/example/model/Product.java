package com.example.model;

import java.util.ArrayList;
import java.util.List;

import javax.swing.SizeSequence;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "product_items")
public class Product {
	@Id
	@Column(name="product_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(name="title")
    private String title;
	@Column(name="description")
    private String description;
	@Column(name="price")
    private double price;
	@Column(name="imageU")
    private String imageURL;
	
	private Long sizeId;
}