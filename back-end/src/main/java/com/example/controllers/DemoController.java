package com.example.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/utente")
@CrossOrigin("*")
public class DemoController {

	
	@GetMapping("/demo")
	public ResponseEntity<String> demo (){
		return ResponseEntity.ok("Hello from secure url");
	}
	
	@GetMapping("/admin")
	public ResponseEntity<String> adminOnly (){
		return ResponseEntity.ok("Hello from secure url as a admin");
	}
	
	@GetMapping("/user")
	public ResponseEntity<String> userOnly (){
		return ResponseEntity.ok("Hello from secure url as a user");
	}
}
