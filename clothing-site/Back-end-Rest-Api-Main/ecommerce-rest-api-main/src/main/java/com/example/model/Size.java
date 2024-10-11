package com.example.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;


public class Size {
	private static final List<String> sizes = new ArrayList<>();

    static {
        sizes.add("S");
        sizes.add("M");
        sizes.add("L");
        sizes.add("XL");
    }

//    private int id;
//    private String name;
//
//    // Constructor
//    public Size(int id, String name) {
//        this.id = id;
//        this.name = name;
//    }
    
    
}