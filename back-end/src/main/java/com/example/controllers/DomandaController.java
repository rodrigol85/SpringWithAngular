package com.example.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

import com.example.models.Domanda;
import com.example.models.Esame;
import com.example.services.DomandaService;
import com.example.services.EsameService;

@RestController
@RequestMapping("/domanda")
@CrossOrigin("*")
public class DomandaController {
	
	@Autowired
	private DomandaService domandaService;
	
	@Autowired
	private EsameService esameService;
	
	@PostMapping("/")
	public ResponseEntity<Domanda> saveDomanda(@RequestBody Domanda domanda){
		return ResponseEntity.ok(domandaService.addDomanda(domanda));
	}
	
	@PutMapping("/")
	public ResponseEntity<Domanda> aggiornaDomanda(@RequestBody Domanda domanda){
		return ResponseEntity.ok(domandaService.aggiornaDomanda(domanda));
		
	}
	
	@GetMapping("/esame/{esameId}")
	public ResponseEntity<?> listaDomandeDellEsame(@PathVariable("esameId") Long esameId){
		Esame esame = esameService.getOneEsame(esameId);
		Set<Domanda> domande = esame.getDomande();
		
		List esami = new ArrayList<>(domande);
		if(esami.size() > Integer.parseInt(esame.getNumeDomande())) {
			esami = esami.subList(0, Integer.parseInt(esame.getNumeDomande() + 1 ));
		}
		
		Collections.shuffle(esami);
		return ResponseEntity.ok(esami);
	}
	
	@GetMapping("/{domandaId}")
	public Domanda listaDomandaById(@PathVariable("domandaId") Long domandaId) {
		return domandaService.getDomanda(domandaId);
	}
	
	@DeleteMapping("/{domandaId}")
	public void deleteDomanda(@PathVariable("domandaId") Long domandaId) {
		domandaService.deleteDomanda(domandaId);
	}
	
	@GetMapping("/esame/tutte/{esameId}")
	public ResponseEntity<?> listaDomandeDellEsameComeAdministratore(@PathVariable("esameId") Long esameId){
		Esame esame = new Esame();
		esame.setEsameId(esameId);
		Set<Domanda> domande = domandaService.getDomandaDiEsame(esame);
		return ResponseEntity.ok(domande);
	}
	
	@PostMapping("/valutare-esame")
	public ResponseEntity<?> valutareEsame(@RequestBody List<Domanda> domande){
		double puntiMax = 0;
		Integer risposteGiuste = 0;
		Integer tentativi = 0;
		
		for(Domanda d : domande) {
			Domanda domanda = this.domandaService.listaDomanda(d.getId());
			if(domanda.getRisposta().equals(d.getRispostaData())) {
				risposteGiuste ++;
				double punti = Double.parseDouble(domande.get(0).getEsame().getPuntiMax())/domande.size();
				puntiMax += punti;
			}
			
			if(d.getRispostaData() != null) {
				tentativi ++;
			}
		}
		
		Map<String, Object> risposte = new HashMap<>();
		risposte.put("puntiMax", puntiMax);
		risposte.put("risposteGiuste", risposteGiuste);
		risposte.put("tentativi", tentativi);
		
		return ResponseEntity.ok(risposte);
		
	}

}
