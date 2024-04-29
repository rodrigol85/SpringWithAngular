package com.example.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Categoria;
import com.example.services.CategoriaService;



@RestController
@RequestMapping("/categoria")
@CrossOrigin("*")
public class CategoriaController {

	@Autowired
	private CategoriaService categoriaService;
	
	@PostMapping("/")
	public ResponseEntity<Categoria> saveCategoria(@RequestBody Categoria categoria){
		Categoria categoriaSaved = categoriaService.addCategoria(categoria);
		return ResponseEntity.ok(categoriaSaved);
	}
	
	@GetMapping("{categoriaId}")
	public Categoria listaCategoriaById(@PathVariable("categoriaId") Long categoriaId) {
		return categoriaService.getCategoria(categoriaId);
	}
	
	@GetMapping("/")
	public ResponseEntity<?> listaCategorie(){
		return ResponseEntity.ok(categoriaService.listaCategoria());
	}
	
	@PutMapping("/")
	public Categoria aggiornaCategoria(@RequestBody Categoria categoria) {
		return categoriaService.aggiornaCategoria(categoria);
	}
	
	@DeleteMapping("/{categoriaId}")
	public void deleteCategoria(@PathVariable("categoriaId") Long categoriaId) {
		categoriaService.deleteCategoria(categoriaId);
	}
	
	
	
	
}
