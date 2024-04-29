package com.example.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.AuthenticationResponse;
import com.example.models.Utente;
import com.example.security.OurUserInfoUserDetailsService;
import com.example.services.AuthenticationService;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class AuthotenticationController {

	private final AuthenticationService authenticationService;

	@Autowired
	private OurUserInfoUserDetailsService authSer;

	public AuthotenticationController(AuthenticationService authenticationService) {
		super();
		this.authenticationService = authenticationService;
	}

	@PostMapping("/create")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody Utente request) {
		return ResponseEntity.ok(authenticationService.register(request));
	}

	@PostMapping("/generate-token")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody Utente request) {

		return ResponseEntity.ok(authenticationService.authenticate(request));

	}

	@GetMapping("/attuale-utente")
	public Utente getUtenteAttuale(Principal principal) {

		return (Utente) this.authSer.loadUserByUsername(principal.getName());
	}

}
