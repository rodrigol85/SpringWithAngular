package com.example.repositories;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.example.models.Categoria;

@Repository
public interface CategoriaRepository extends ListCrudRepository<Categoria, Long> {

}
