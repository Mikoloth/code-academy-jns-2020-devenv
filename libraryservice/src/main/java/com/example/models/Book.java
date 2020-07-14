package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Book {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    private String title;
    private Integer publicationYear;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    Book() {
    }

    Book(String title, Integer publicationYear, Author author) {
        this.title = title;
        this.publicationYear = publicationYear;
        this.author = author;
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

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public String toString() {
        return "" + id + ": " + title + "(" + publicationYear + ") - " + author;
    }
}