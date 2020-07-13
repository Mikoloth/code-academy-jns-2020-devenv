package com.example.controllers;

import com.example.models.Author;
import com.example.repositories.AuthorRepository;

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

    AuthorsController(AuthorRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/authors")
    public List<Author> getAuthors() {
        return repository.findAll();
    }

    @PostMapping("/authors")
    public Author addAuthor(@RequestBody Author newAuthor) {
        return repository.save(newAuthor);
    }

    @DeleteMapping("/authors/{authorId}")
    void deleteAuthor(@PathVariable Long authorId) {
        repository.deleteById(authorId);
    }
}