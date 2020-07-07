package com.example.controllers;

import com.example.models.Book;
import com.example.repositories.BookRepository;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BooksController {
    private final BookRepository repository;

    BooksController(BookRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/books")
    public List<Book> getBooks() {
        return repository.findAll();
    }

    @PostMapping("/books")
    public Book addBook(@RequestBody Book newBook) {
        return repository.save(newBook);
    }

    @DeleteMapping("/books/{bookId}")
    void deleteBook(@PathVariable Long bookId) {
        repository.deleteById(bookId);
    }
}