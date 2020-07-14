package com.example.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Author {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    private String name;

    @JsonManagedReference
    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER)
    private Set<Book> books;

    Author() {
    }

    Author(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public String toString() {
        return "" + id + ": " + name;
    }
}