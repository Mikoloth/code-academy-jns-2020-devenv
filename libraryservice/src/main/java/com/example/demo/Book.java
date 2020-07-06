package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Book {
    private @Id @GeneratedValue Long id;
    private String title;
    private Integer publicationYear;

    Book() {
    }

    Book(String title, Integer publicationYear) {
        this.title = title;
        this.publicationYear = publicationYear;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Integer getPublicationYear() {
        return publicationYear;
    }

    public String toString() {
        return "" + id + ": " + title + "(" + publicationYear + ")";
    }
}