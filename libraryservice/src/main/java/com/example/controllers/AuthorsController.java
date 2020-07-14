package com.example.controllers;

import com.example.models.Author;
import com.example.models.Book;
import com.example.repositories.AuthorRepository;
import com.example.repositories.BookRepository;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorsController {
    private final AuthorRepository repository;
    BookRepository bookRepository;

    AuthorsController(AuthorRepository repository, BookRepository bookRepository) {
        this.repository = repository;
        this.bookRepository = bookRepository;
    }

    @GetMapping("/authors")
    public List<Author> getAuthors() {
        return repository.findAll();
    }

    @GetMapping("/authors/{authorId}")
    public Author getAuthor(@PathVariable Long authorId) {
        Author author = repository.findById(authorId).get();
        System.out.println(author);
        return author;
    }

    @PostMapping("/authors")
    public Author addAuthor(@RequestBody Author newAuthor) {
        return repository.save(newAuthor);
    }

    @PostMapping("/authors/{authorId}/books")
    public Book addBookForAuthor(@PathVariable Long authorId, @RequestBody Book newBook) {
        newBook.setAuthor(repository.findById(authorId).get());
        return bookRepository.save(newBook);
    }

    @DeleteMapping("/authors/{authorId}")
    void deleteAuthor(@PathVariable Long authorId) {
        repository.deleteById(authorId);
    }
}