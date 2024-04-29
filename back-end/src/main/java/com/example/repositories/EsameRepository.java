package com.example.repositories;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.example.models.Categoria;
import com.example.models.Esame;

@Repository
public interface EsameRepository extends ListCrudRepository<Esame, Long> {
	
	List<Esame> findByCategoria(Categoria categoria);
	
	List<Esame> findByAttivo(Boolean stato);
	
	List<Esame> findByCategoriaAndAttivo(Categoria categoria, Boolean stato);

}
