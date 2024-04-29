package com.example.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
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
@Table(name ="domande")
public class Domanda {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 5000)
	private String contenuto;
	
	private String imagine;
	
	private String opzione1;
	
	private String opzione2;
	
	private String opzione3;
	
	private String opzione4;
	
	@Transient
    private String rispostaData;
	
	private String risposta;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Esame esame;

	@Override
	public String toString() {
		return "Domanda [contenuto=" + contenuto + ", opzione1=" + opzione1 + ", opzione2=" + opzione2 + ", opzione3="
				+ opzione3 + ", opzione4=" + opzione4 + ", rispostaData=" + rispostaData + ", risposta=" + risposta
				+ ", esame=" + esame + "]";
	}
	
	

}
