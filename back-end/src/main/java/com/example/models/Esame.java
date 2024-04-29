package com.example.models;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "esami")
public class Esame {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long esameId;
	
	private String titolo;
	
	private String descrizione;
	
	private String puntiMax;
	
	private String numeDomande;
	
	private boolean attivo = false;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Categoria categoria;
	
	@OneToMany(mappedBy = "esame", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Domanda> domande = new HashSet<>();

	@Override
	public String toString() {
		return "Esame [esameId=" + esameId + ", titolo=" + titolo + ", descrizione=" + descrizione + ", puntiMax="
				+ puntiMax + ", numeDomande=" + numeDomande + ", attivo=" + attivo + ", categoria=" + categoria
				+ ", domande=" + domande + "]";
	}

	
	

}
