package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.Utente;
import com.example.repositories.UtenteRepository;

@Service
public class UtenteServiceImp {

	@Autowired
	private UtenteRepository utenteRepository;
	
	public Utente getUtente(Long utenteId) {
		return utenteRepository.findById(utenteId).orElseThrow();
	}
	
	public Utente getUtenteByUsername(String username) {
		return utenteRepository.findByUsername(username);
	}
	
	
	public void deleteUtente(Long utenteId) {
		utenteRepository.findById(utenteId);
	}
	
	
}

	
	
	
	
