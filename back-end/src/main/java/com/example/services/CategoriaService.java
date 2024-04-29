package com.example.services;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.Categoria;
import com.example.repositories.CategoriaRepository;

@Service
public class CategoriaService {

	@Autowired
	private CategoriaRepository categoriaRepository;
	
	public Categoria addCategoria(Categoria categoria) {
		return categoriaRepository.save(categoria);
	}
	
	public Categoria aggiornaCategoria(Categoria categoria) {
		return categoriaRepository.save(categoria);
	}
	
	public Set<Categoria> listaCategoria(){
		return new LinkedHashSet<>(categoriaRepository.findAll());
	}
	
	public Categoria getCategoria(Long categoriaId) {
		return categoriaRepository.findById(categoriaId).get();
	}
	
	public void deleteCategoria(Long categoriaId) {
		Categoria categoria = new Categoria();
		categoria.setId(categoriaId);
		categoriaRepository.delete(categoria);
	}
	
	
	
	
}
