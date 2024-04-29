package com.example.controllers;

import java.util.List;


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
import com.example.models.Esame;
import com.example.services.EsameService;

@RestController
@RequestMapping("/esame")
@CrossOrigin("*")
public class EsameController {
	
	@Autowired
	private EsameService esameService;
	
	@PostMapping("/")
	public ResponseEntity<Esame> saveEsame(@RequestBody Esame esame){
		return ResponseEntity.ok(esameService.addEsame(esame));
	}
	
	@PutMapping("/")
	public ResponseEntity<Esame> aggiornaEsame(@RequestBody Esame esame){
		return ResponseEntity.ok(esameService.aggiornaEsame(esame));
	}
	
	@GetMapping("/")
	public ResponseEntity<?> listaEsami(){
		return ResponseEntity.ok(esameService.getAllEsami());
	}
	
	@GetMapping("/{esameId}")
	public Esame listaEsame(@PathVariable("esameId") Long esameId){
		return esameService.getOneEsame(esameId);
	}
	
	@DeleteMapping("/{esameId}")
	public void deleteEsame(@PathVariable("esameId") Long esameId){
		esameService.deleteEsame(esameId);
	}
	
	@GetMapping("/categoria/{categoriaId}")
	public List<Esame> listaEsameDiUnaCategoria(@PathVariable("categoriaId") Long categoriaId){
		Categoria categoria = new Categoria();
		categoria.setId(categoriaId);
		return esameService.listaEsameDiUnaCategoria(categoria);
	}
	
	@GetMapping("/attivo")
	public List<Esame> listaEsamiAttivi(){
		return esameService.getEsamiAttivi();
	}
	
	@GetMapping("/categoria/attivo/{categoriaId}")
	public List<Esame> listaEsamiAttiviDiUnaCategoria(@PathVariable("categoriaId") Long categoriaId){
		Categoria categoria = new Categoria();
		categoria.setId(categoriaId);
		return esameService.getEsamiAttiviDiUnaCategoria(categoria);
	}

	

}
