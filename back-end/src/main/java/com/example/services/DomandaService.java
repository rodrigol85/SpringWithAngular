package com.example.services;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.Domanda;
import com.example.models.Esame;
import com.example.repositories.DomandaRepository;

@Service
public class DomandaService {

	@Autowired
	private DomandaRepository domandaRepository;
	
	
	public Domanda addDomanda(Domanda domanda) {
		return domandaRepository.save(domanda);
	}
	
	public Domanda aggiornaDomanda(Domanda domanda) {
		return domandaRepository.save(domanda);
	}
	
	public Set<Domanda> getAllDomande(){
		return new LinkedHashSet<>(domandaRepository.findAll());
	}
	
	public Domanda getDomanda(Long domandaId) {
		return domandaRepository.findById(domandaId).get();
	}
	
	public Set<Domanda> getDomandaDiEsame(Esame esame){
		return domandaRepository.findByEsame(esame);
	}
	
	public void deleteDomanda(Long domandaId) {
		Domanda domanda = new Domanda();
		domanda.setId(domandaId);
		domandaRepository.delete(domanda);
	}
	
	public Domanda listaDomanda(Long domandaId) {
		return this.domandaRepository.findById(domandaId).orElseThrow();
	}
	
}
