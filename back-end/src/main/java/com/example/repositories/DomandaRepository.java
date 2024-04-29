package com.example.repositories;

import java.util.Set;

import org.springframework.data.repository.ListCrudRepository;

import com.example.models.Domanda;
import com.example.models.Esame;

public interface DomandaRepository extends ListCrudRepository<Domanda, Long> {
	
	Set<Domanda> findByEsame(Esame esame);

}
