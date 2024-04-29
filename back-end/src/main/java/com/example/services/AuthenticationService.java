package com.example.services;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.models.AuthenticationResponse;
import com.example.models.Role;
import com.example.models.Utente;
import com.example.repositories.UtenteRepository;
import com.example.security.JwtService;

@Service
public class AuthenticationService {

	private final UtenteRepository utenteRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	private final JwtService jwtService;
	
	
	private final AuthenticationManager authenticationManager;

	public AuthenticationService(UtenteRepository utenteRepository, PasswordEncoder passwordEncoder,
			JwtService jwtService, AuthenticationManager authenticationManager) {
	
		this.utenteRepository = utenteRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}
	
	/**
	 * con questo metodo creo un nuovo utente, in questo caso tutti gli utente 
	 * creati con il front-end sono per default 'User', per creare un 'ADMIN', dovremmo 
	 * cambiare un attimo qua solo o creando direttamente nel database
	 * @author Rodrigo
	 * @return
	 */
	
	public AuthenticationResponse register(Utente request) {
		Utente utente = new Utente();
		utente.setName(request.getName());
		utente.setSurname(request.getSurname());
		utente.setEmail(request.getEmail());
		utente.setPassword(passwordEncoder.encode(request.getPassword()));
		utente.setPhone(request.getPhone());
		utente.setProfilo(request.getProfilo());
		utente.setUsername(request.getUsername());
		
		utente.setRole(Role.USER);
		
		utente = utenteRepository.save(utente);
		
		String token = jwtService.generateToken(utente);
		
		return new AuthenticationResponse(token);
	}
	
	public AuthenticationResponse authenticate(Utente request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getUsername(),
						request.getPassword())
				);
		Utente utente = utenteRepository.findByUsername(request.getUsername());
		
		String token = jwtService.generateToken(utente);
		
		return new AuthenticationResponse(token);
	}
	
	
}
