package com.example.security;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.models.Utente;
import com.example.repositories.UtenteRepository;

@Configuration
public class OurUserInfoUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UtenteRepository utenteRepository;


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    Utente utente = utenteRepository.findByUsername(username); 

	    if (utente == null) {
	        throw new UsernameNotFoundException("Username doesnt exist");
	    }

	    return utente;
	}

}
