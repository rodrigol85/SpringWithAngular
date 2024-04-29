package com.example.controllers;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Utente;
import com.example.services.UtenteServiceImp;


@RestController
@RequestMapping("/utente")
@CrossOrigin("*")
public class UtenteController {


	@Autowired(required=false)
	private UtenteServiceImp utenteService;
	

	
	@GetMapping("/{id}")
	public Utente getUtente(@PathVariable("id") Long utenteId) {
		return utenteService.getUtente(utenteId);
	}

	@GetMapping("/username/{username}")
	public Utente obtenerUsuarioActual(@PathVariable("username") String username) {
		return utenteService.getUtenteByUsername(username);
	}
	

	
	
	@DeleteMapping("/{utenteId}")
	public void deleteUtente(@PathVariable("utenteId") Long utenteId) {
		utenteService.deleteUtente(utenteId);
	}
	
}
