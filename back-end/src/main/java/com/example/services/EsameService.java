package com.example.services;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.Categoria;
import com.example.models.Esame;
import com.example.repositories.EsameRepository;

@Service
public class EsameService {
	
	@Autowired
	private EsameRepository esameRepository;
	
	
	public Esame addEsame(Esame esame) {
		return esameRepository.save(esame);
	}
	
	public Esame aggiornaEsame(Esame esame) {
		return esameRepository.save(esame);
	}
	
	public Set<Esame> getAllEsami(){
		return new LinkedHashSet<>(esameRepository.findAll());
	}
	
	public Esame getOneEsame(Long esameId) {
		return esameRepository.findById(esameId).get();
	}
	
	public void deleteEsame(Long esameId) {
		Esame esame = new Esame();
		esame.setEsameId(esameId);
		esameRepository.delete(esame);
	}
	
	public List<Esame> listaEsameDiUnaCategoria(Categoria categoria){
		return esameRepository.findByCategoria(categoria);
	}
	
	public List<Esame> getEsamiAttivi(){
		return esameRepository.findByAttivo(true);
	}
	
	public List<Esame> getEsamiAttiviDiUnaCategoria(Categoria categoria){
		return esameRepository.findByCategoriaAndAttivo(categoria, true);
	}

}
